import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import ChatPage from './pages/ChatPage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import SignupPage from './pages/SignupPage'
import NavbarComponent from './components/Navbar.jsx'
import SpinnerComponent from './components/Spinner.jsx'
import { authInit } from './slices/authSlice.js'
import routes from './routes.js'

const PrivateRoute = ({ children }) => {
  const { token } = useSelector(state => state.auth)
  const location = useLocation()

  return token ? children : <Navigate to={routes.loginPath()} state={{ from: location }} />
}

const PublicRoute = ({ children }) => {
  const { token } = useSelector(state => state.auth)

  return token ? <Navigate to={routes.mainPath()} /> : children
}

function App() {
  const dispatch = useDispatch()
  const { loading } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(authInit())
  }, [dispatch])

  if (loading) {
    return <SpinnerComponent />
  }

  return (
    <div className="d-flex flex-column h-100">
      <BrowserRouter>
        <NavbarComponent />
        <Routes>
          <Route
            path={routes.mainPath()}
            element={
              (
                <PrivateRoute>
                  <ChatPage />
                </PrivateRoute>
              )
            }
          />
          <Route
            path={routes.loginPath()}
            element={
              (
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              )
            }
          />
          <Route
            path={routes.signUpPath()}
            element={
              (
                <PublicRoute>
                  <SignupPage />
                </PublicRoute>
              )
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  )
}

export default App
