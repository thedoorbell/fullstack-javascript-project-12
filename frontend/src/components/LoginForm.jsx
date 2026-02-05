import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

const LoginForm = () => {
  const loginSchema = Yup.object().shape({
      username: Yup.string()
        .min(5, 'Минимум 5 букв')
        .required('Обязательное поле'),
      password: Yup.string()
        .min(6, 'Минимум 6 букв')
        .matches(/[a-zA-Z]/, 'Пароль должен содержать только латинские буквы')
        .required('Обязательное поле'),
    })
      
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={loginSchema}
      onSubmit={(values) => {
        console.log(values)
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <h1 className="text-center mb-4">Войти</h1>
          <div className="form-floating mb-3">
            <label htmlFor="username">Ваш ник</label>
            <Field
              type="text"
              name="username"
              placeholder="Ваш ник"
              className="form-control"
            />
            {errors.username && touched.username ? (
              <div>{errors.username}</div>
            ) : null}
          </div>
          <div className="form-floating mb-4">
            <label htmlFor="password">Пароль</label>
            <Field
              type="password"
              name="password"
              placeholder="Пароль"
              className="form-control"
            />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
          </div>
          <button type="w-100 mb-3 btn btn-outline-primary">
             Войти
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm