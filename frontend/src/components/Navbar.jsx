import { Container, Navbar, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { useTranslation } from 'react-i18next'
import routes from '../routes.js'
import useAuth from '../hooks/useAuth.js'

const NavbarComponent = () => {
  const { token } = useSelector(state => state.auth)
  const { logoutAndRedirect } = useAuth()
  const { t } = useTranslation()

  return (
    <Navbar bg="light" variant="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to={routes.mainPath()}>Hexlet Chat</Navbar.Brand>
        {token
          && <Button variant="primary" onClick={() => logoutAndRedirect()}>{t('logout')}</Button>}
      </Container>
    </Navbar>
  )
}

export default NavbarComponent
