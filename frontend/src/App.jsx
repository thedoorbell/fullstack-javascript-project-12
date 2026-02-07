import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'
import { Button, Container, Navbar } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'

import ChatPage from './pages/ChatPage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import SignupPage from './pages/SignupPage'
import { logOut, authInit } from './slices/authSlice.js'

const PrivateRoute = ({ children }) => {
  const loggedIn = useSelector(state => state.auth.loggedIn)
  const location = useLocation()

  return (
    loggedIn === true ? children : <Navigate to="/login" state={{ from: location }} />
  )
}

function App() {
  const dispatch = useDispatch()
  const loggedIn = useSelector(state => state.auth.loggedIn)

  useEffect(() => {
    dispatch(authInit())
  }, [dispatch])
  
  return (
    <div className='d-flex flex-column h-100'>
      <BrowserRouter>
        <Navbar bg="light" variant="light" expand="lg" className="shadow-sm">
          <Container>
            <Navbar.Brand as={Link} to="/">Messenger</Navbar.Brand>
            {loggedIn === true && <Button variant="primary" onClick={() => dispatch(logOut())}>Выйти</Button>}
          </Container>
        </Navbar>
        <Routes>
          <Route
            path="/"
            element={(
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
            )}
          />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
