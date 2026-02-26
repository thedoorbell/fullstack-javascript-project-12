import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials, logOut } from '../slices/authSlice.js'
import routes from '../routes.js'

const useAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const loginAndRedirect = (data) => {
    dispatch(setCredentials(data))
    navigate(routes.mainPath(), { replace: true })
  }

  const logoutAndRedirect = () => {
    dispatch(logOut())
    navigate(routes.loginPath())
  }

  return { loginAndRedirect, logoutAndRedirect }
}

export default useAuth
