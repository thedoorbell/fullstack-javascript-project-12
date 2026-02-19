import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'
import { Button, Container, Navbar } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { ToastContainer } from 'react-toastify'

import ChatPage from './pages/ChatPage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import SignupPage from './pages/SignupPage'
import SpinnerComponent from './components/Spinner.jsx'
import { logOut, authInit } from './slices/authSlice.js'

const PrivateRoute = ({ children }) => {
  const { loggedIn, loading } = useSelector(state => state.auth)
  const location = useLocation()

  if (loading) {
    return <SpinnerComponent />
  }

  return loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
}

const PublicRoute = ({ children }) => {
  const { loggedIn, loading } = useSelector(state => state.auth)

  if (loading) {
    return <SpinnerComponent />
  }

  return loggedIn ? <Navigate to="/" /> : children
}

function App() {
  const dispatch = useDispatch()
  const { loggedIn, loading } = useSelector(state => state.auth)
  const { t } = useTranslation()

  useEffect(() => {
    dispatch(authInit())
  }, [dispatch])

  if (loading) {
    return <SpinnerComponent />
  }

  return (
    <div className="d-flex flex-column h-100">
      <BrowserRouter>
        <Navbar bg="light" variant="light" expand="lg" className="shadow-sm">
          <Container>
            <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
            {loggedIn
              && <Button variant="primary" onClick={() => dispatch(logOut())}>{t('logout')}</Button>}
          </Container>
        </Navbar>
        <Routes>
          <Route
            path="/"
            element={
              (
                <PrivateRoute>
                  <ChatPage />
                </PrivateRoute>
              )
            }
          />
          <Route
            path="login"
            element={
              (
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              )
            }
          />
          <Route
            path="signup"
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
