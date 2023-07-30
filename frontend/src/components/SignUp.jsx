import { useFormik } from "formik";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import * as Yup from "yup";
import signUpImg from "../assets/signUp.jpg";
import { useAuthContext } from "../context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import leoProfanity from 'leo-profanity';

const SignUp = () => {
  const { t } = useTranslation();
  const { logIn } = useAuthContext();
  const navigate = useNavigate();
  const [signUpFail, setSignUpFail] = useState(false);
  const inputRef = useRef();
  const badWords = leoProfanity.list();

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .trim()
        .required("signup.required")
        .min(3, "signup.usernameConstraints")
        .max(20, "signup.usernameConstraints")
        .notOneOf(badWords, "signup.badName"),
      password: Yup.string()
        .trim()
        .required("signup.required")
        .min(6, "signup.passMin"),
      confirmPassword: Yup.string()
        .trim()
        .required("signup.required")
        .oneOf([Yup.ref("password"), null], "signup.mustMatch"),
    }),
    onSubmit: async ({ username, password}) => {
      try {
        const { data } = await axios.post("/api/v1/signup", {
          username,
          password,
        });
        logIn(data);
        navigate("/", { replace: true });
      } catch (error) {
        if (!error.isAxiosError) {
          toast.error(t('errors.unknown'));
          return;
      } 
        if (error.response.status === 409) {
          setSignUpFail(true);
          inputRef.current.select();
        } else {
          toast.error(t('errors.network'));
        }
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img
                  className="rounded-circle"
                  src={signUpImg}
                  alt="signup.header"
                />
              </div>
              <Form onSubmit={formik.handleSubmit} className="w-50">
                <h1 className="text-center mb-4">{t('signup.header')}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    id="username"
                    name="username"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    placeholder={t('signup.username')}
                    isInvalid={
                      (formik.errors.username && formik.touched.username) ||
                      signUpFail
                    }
                    ref={inputRef}
                    required
                    autoFocus
                  />
                  <Form.Label htmlFor="username">{t('signup.username')}</Form.Label>
                  <Form.Control.Feedback
                    type="invalid"
                    tooltip
                    placement="right"
                  >
                    {t(formik.errors.username)}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="password"
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    isInvalid={
                      (formik.errors.password && formik.touched.password) ||
                      signUpFail
                    }
                    placeholder={t('signup.password')}
                    required
                  />
                  <Form.Label htmlFor="password">{t('signup.password')}</Form.Label>
                  <Form.Control.Feedback
                    type="invalid"
                    tooltip
                    placement="right"
                  >
                    {t(formik.errors.password)}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    isInvalid={
                      (formik.errors.confirmPassword &&
                        formik.touched.repeatPassword) ||
                      signUpFail
                    }
                    placeholder={t('signup.confirm')}
                    required
                  />
                  <Form.Label htmlFor="confirmPassword">
                  {t('signup.confirm')}
                  </Form.Label>
                  <Form.Control.Feedback
                    type="invalid"
                    tooltip
                    placement="right"
                  >
                    {signUpFail ? t('signup.alreadyExists') : t(formik.errors.confirmPassword)}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button
                  disabled={formik.isSubmitting}
                  type="submit"
                  variant="outline-primary"
                  className="w-100"
                >
                  {t('signup.submit')}
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
