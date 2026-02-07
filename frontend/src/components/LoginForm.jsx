import { useEffect, useRef, useState } from 'react'
import { useFormik } from 'formik'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import axios from 'axios'

import { setCredentials } from '../slices/authSlice.js'
import api from '../routes.js'

const LoginForm = () => {
  const loginSchema = Yup.object().shape({
      username: Yup.string()
        .required('Обязательное поле'),
      password: Yup.string()
        .required('Обязательное поле'),
  })
  
  const [authFailed, setAuthFailed] = useState(false)
  const dispatch = useDispatch()
  const inputRef = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setAuthFailed(false)

      try {
        const response = await axios.post(api.loginPath(), values)
        dispatch(setCredentials(response.data))
        navigate('/', { replace: true })
      }
      catch (error) {
        formik.setSubmitting(false)
        if (error.isAxiosError && error.response.status === 401) {
          setAuthFailed(true)
          inputRef.current.select()
          return
        }
        throw error
      }
    },
  })

  return (
    <Row className="justify-content-center align-content-center h-100">
      <Col className='col-12' sm={8} md={6} lg={4} xxl={3}>
        <Card className="shadow-sm">
          <Card.Body className="row p-5">
            <h1 className="text-center mb-4">Войти</h1>
            <Form className='col-12 mt-3 mt-md-0' onSubmit={formik.handleSubmit}>
              <fieldset>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    placeholder="Ваш ник"
                    name="username"
                    id="username"
                    autoComplete="username"
                    isInvalid={authFailed}
                    required
                    ref={inputRef}
                  />
                  <Form.Label htmlFor="username">Ваш ник</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    placeholder="Пароль"
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    isInvalid={authFailed}
                    required
                  />
                  <Form.Label htmlFor="password">Пароль</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>Неверные имя пользователя или пароль</Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" variant="outline-primary" className="w-100 mb-3">Войти</Button>
              </fieldset>
            </Form>
          </Card.Body>
          <Card.Footer className='p-4'>
            <div className="text-center">
              <span>Нет аккаунта? </span>
              <a href="/signup">Регистрация</a>
            </div>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  )
}

export default LoginForm