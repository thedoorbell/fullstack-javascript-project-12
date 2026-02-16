import { useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'

import { setCredentials } from '../slices/authSlice.js'
import { useSignUpMutation } from '../services/authApi.js'

const validationSchema = yup.object({
  username: yup
    .string()
    .required('Обязательное поле')
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов'),
  password: yup
    .string()
    .required('Обязательное поле')
    .min(6, 'Не менее 6 символов'),
  confirmPassword: yup
    .string()
    .required('')
    .oneOf([yup.ref('password'), ''], 'Пароли должны совпадать')
})

const SignupPage = () => {
  const [signUp] = useSignUpMutation()
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
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const { username, password } = values
        const data = await signUp({ username, password }).unwrap()
        dispatch(setCredentials(data))
        navigate('/', { replace: true })
      }
      catch (error) {
        formik.setSubmitting(false)
        if (error.status === 409) {
          inputRef.current.select()
          formik.errors.username = 'Такой пользователь уже существует'
          return
        }
        throw error
      }
    },
  })  
  
  return (
    <div className="container-fluid h-100">
      <Row className="justify-content-center align-content-center h-100">
      <Col xs={12} sm={8} md={6} lg={4} xxl={3}>
        <Card className="shadow-sm">
          <Card.Body className="row p-5">
            <h1 className="text-center mb-4">Регистрация</h1>
            <Form className='col-12 mt-3 mt-md-0' onSubmit={formik.handleSubmit}>
              <fieldset>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    placeholder="Имя пользователя"
                    name="username"
                    id="username"
                    autoComplete="username"
                    isInvalid={formik.touched.username && formik.errors.username}
                    required
                    ref={inputRef}
                  />
                  <Form.Label htmlFor="username">Имя пользователя</Form.Label>
                  <Form.Control.Feedback
                    placement='right'
                    type="invalid"
                    tooltip
                  >
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="password"
                    aria-describedby="passwordHelpBlock"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    placeholder="Пароль"
                    name="password"
                    id="password"
                    autoComplete="new-password"
                    isInvalid={formik.touched.password && formik.errors.password}
                    required
                  />
                  <Form.Label htmlFor="password">Пароль</Form.Label>
                  <Form.Control.Feedback
                    type="invalid"
                    tooltip
                  >
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    placeholder="Подтвердите пароль"
                    name="confirmPassword"
                    id="confirmPassword"
                    autoComplete="new-password"
                    isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    required
                  />
                  <Form.Label htmlFor="confirmPassword">Подтвердите пароль</Form.Label>
                  <Form.Control.Feedback
                    type="invalid"
                    tooltip
                  >
                    {formik.errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button
                  type="submit"
                  variant="outline-primary"
                  className="w-100 mb-3"
                  disabled={formik.isSubmitting}
                >
                  Зарегистрироваться
                </Button>
              </fieldset>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    </div>
  )
}

export default SignupPage