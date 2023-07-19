import { useFormik } from 'formik';
import {
    Button, Form, Col, Container, Card, Row, FloatingLabel,
} from 'react-bootstrap';
import imagePath from '../assets/login.jpeg';
import { useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../context/index.js';

const Login = () => {
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
                const { data } = await axios.post('/api/v1/login', values);
                localStorage.setItem('user', JSON.stringify(data));
                logIn(data);
                navigate('/', { replace: true });
            } catch (error) {
                formik.setSubmitting(false);
                if (error.isAxiosError && error.response.status === 401) {
                    setAuthFail(true);
                    inputRef.current.select();
                    return;
                }
                throw error;
            }
        },
    });
    return (
    <Container className='container-fluid h-100'>
        <Row className='justify-content-center align-content-center h-100'>
            <Col className='col-12 col-md-8 col-xxl-6'>
                <Card className='shadow-sm'>
                    <Card.Body className='row p-5'>
                        <Col className='col-12 col-md-6 d-flex align-items-center justify-content-center'>
                            <Card.Img className='rounded-circle' alt='Войти' src={imagePath} />
                        </Col>
                        <Form onSubmit={formik.handleSubmit} className='col-12 col-md-6 mt-3 mt-mb-0'>
                            <h1 className='text-center mb-4'>
                                Войти
                            </h1>
                            <Form.Group className='form-floating mb-3'>
                                <FloatingLabel label='Ваш ник'>
                                <Form.Control
                                    type='text'
                                    onChange={formik.handleChange}
                                    value={formik.values.username}
                                    disabled={formik.isSubmitting}
                                    isInvalid={authFail}
                                    placeholder='username'
                                    name='username'
                                    autoComplete='username'
                                    required
                                    ref={inputRef}
                                />
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group className='form-floating mb-3'>
                                <FloatingLabel label='Ваш пароль'>
                                <Form.Control
                                    type='password'
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                    disabled={formik.isSubmitting}
                                    isInvalid={authFail}
                                    placeholder='password'
                                    name='password'
                                    autoComplete='current-password'
                                    required
                                />
                                <Form.Control.Feedback type='invalid'>Неверное имя пользователя или пароль</Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>
                            <Button type='submit' disabled={formik.isSubmitting} className='w-100 mb-3' variant='outline-primary'>Войти</Button>
                        </Form>
                    </Card.Body>
                    <Card.Footer className='p-4'>
                        <div className='text-center'>
                            <span>Нет аккаунта?</span>
                            <Link to='/signup'> Регистрация</Link>
                        </div>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    </Container>
);
};

export default Login;