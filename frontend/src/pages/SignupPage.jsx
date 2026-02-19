import { useEffect, useRef } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'

import { setCredentials } from '../slices/authSlice.js'
import { useSignUpMutation } from '../services/authApi.js'
import { getSingupSchema } from '../utilities/validationSchemas.js'
import FormBaseCard from '../components/FormBaseCard.jsx'

const SignupPage = () => {
  const [signUp] = useSignUpMutation()
  const inputRef = useRef()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const validationSchema = getSingupSchema(t)

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
        inputRef.current.select()
        console.log(error)
        if (error.status === 409) {
          formik.errors.username = t('errors.userExists')
          return
        }
        toast.error(t('errors.networkError'))
      }
    },
  })

  return (
    <FormBaseCard>
      <Card.Body className="row p-5">
        <h1 className="text-center mb-4">{t('signupForm')}</h1>
        <Form className="col-12 mt-3 mt-md-0" onSubmit={formik.handleSubmit}>
          <fieldset>
            <Form.Group className="form-floating mb-3">
              <Form.Control
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                placeholder={t('username')}
                name="username"
                id="username"
                autoComplete="username"
                isInvalid={formik.touched.username && formik.errors.username}
                required
                ref={inputRef}
              />
              <Form.Label htmlFor="username">{t('username')}</Form.Label>
              <Form.Control.Feedback placement="right" type="invalid"tooltip>
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
                placeholder={t('password')}
                name="password"
                id="password"
                autoComplete="new-password"
                isInvalid={formik.touched.password && formik.errors.password}
                required
              />
              <Form.Label htmlFor="password">{t('password')}</Form.Label>
              <Form.Control.Feedback type="invalid" tooltip>
                {formik.errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="form-floating mb-4">
              <Form.Control
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                placeholder={t('confirmPassword')}
                name="confirmPassword"
                id="confirmPassword"
                autoComplete="new-password"
                isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}
                required
              />
              <Form.Label htmlFor="confirmPassword">{t('confirmPassword')}</Form.Label>
              <Form.Control.Feedback type="invalid" tooltip>
                {formik.errors.confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              type="submit"
              variant="outline-primary"
              className="w-100 mb-3"
              disabled={formik.isSubmitting}
            >
              {t('signup')}
            </Button>
          </fieldset>
        </Form>
      </Card.Body>
    </FormBaseCard>
  )
}

export default SignupPage
