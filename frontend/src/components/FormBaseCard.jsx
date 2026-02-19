import { Card, Col, Row, Container } from 'react-bootstrap'

const FormBaseCard = ({ children }) => {
  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} sm={8} md={6} lg={4} xxl={3}>
          <Card className="shadow-sm">
            {children}
          </Card>
        </Col>
      </Row>
  </Container>
  )
}

export default FormBaseCard