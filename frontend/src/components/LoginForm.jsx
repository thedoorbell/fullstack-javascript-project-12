import { useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'

import { setCredentials } from '../slices/authSlice.js'
import { useLogInMutation } from '../services/authApi.js'

const LoginForm = () => {
  const loginSchema = Yup.object().shape({
      username: Yup.string()
        .required('Обязательное поле'),
      password: Yup.string()
        .required('Обязательное поле'),
  })
  
  const [logIn, { isLoading, isError }] = useLogInMutation()
  const inputRef = useRef()
  const dispatch = useDispatch()
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
      try {
        const data = await logIn(values).unwrap()
        dispatch(setCredentials(data))
        navigate('/', { replace: true })
      }
      catch (error) {
        formik.setSubmitting(false)
        if (error.status === 401) {
          inputRef.current.select()
          return
        }
        throw error
      }
    },
  })

  return (
    <Row className="justify-content-center align-content-center h-100">
      <Col xs={12} sm={8} md={6} lg={4} xxl={3}>
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
                    isInvalid={isError}
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
                    isInvalid={isError}
                    required
                  />
                  <Form.Label htmlFor="password">Пароль</Form.Label>
                  <Form.Control.Feedback
                    type="invalid"
                    tooltip
                  >Неверные имя пользователя или пароль
                  </Form.Control.Feedback>
                </Form.Group>
                <Button
                  type="submit"
                  variant="outline-primary"
                  className="w-100 mb-3"
                  disabled={isLoading}
                >Войти
                </Button>
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