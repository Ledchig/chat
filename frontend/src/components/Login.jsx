import { useFormik } from 'formik';
import {
  Button, Form, Col, Container, Card, Row, FloatingLabel,
} from 'react-bootstrap';
import React, { useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useAuthContext } from '../hooks/index';
import imagePath from '../assets/login.jpeg';
import routes from '../routes';

const Login = () => {
  const { t } = useTranslation();
  const [authFail, setAuthFail] = useState(false);
  const navigate = useNavigate();
  const { logIn } = useAuthContext();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFail(false);
      try {
        const { data } = await axios.post(routes.loginPath(), values);
        logIn(data);
        navigate('/', { replace: true });
      } catch (error) {
        formik.setSubmitting(false);
        if (!error.isAxiosError) {
          toast.error(t('errors.unknown'));
          return;
        }
        if (error.response.status === 401) {
          setAuthFail(true);
          inputRef.current.select();
        } else {
          toast.error(t('errors.network'));
        }
      }
    },
  });
  return (
    <Container className="container-fluid h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <Card.Img className="rounded-circle" alt={t('login.header')} src={imagePath} />
              </Col>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">
                  {t('login.header')}
                </h1>
                <Form.Group className="form-floating mb-3">
                  <FloatingLabel controlId="username" label={t('login.username')}>
                    <Form.Control
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      disabled={formik.isSubmitting}
                      isInvalid={authFail}
                      placeholder="username"
                      name="username"
                      autoComplete="username"
                      required
                      ref={inputRef}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <FloatingLabel controlId="password" label={t('login.password')}>
                    <Form.Control
                      type="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      disabled={formik.isSubmitting}
                      isInvalid={authFail}
                      placeholder="password"
                      name="password"
                      autoComplete="current-password"
                      required
                    />
                    {authFail && <Form.Control.Feedback type="invalid">{t('login.authFailed')}</Form.Control.Feedback>}
                  </FloatingLabel>
                </Form.Group>
                <Button type="submit" disabled={formik.isSubmitting} className="w-100 mb-3" variant="outline-primary">Войти</Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('login.newToChat')}</span>
                <Link to="/signup">
                  {' '}
                  {t('login.signup')}
                </Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
