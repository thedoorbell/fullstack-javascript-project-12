import { Container, Spinner } from 'react-bootstrap'

const SpinnerComponent = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center h-100">
      <Spinner animation="border" variant="primary" />
    </Container>
  )
}

export default SpinnerComponent