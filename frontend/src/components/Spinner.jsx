import { Spinner } from 'react-bootstrap'

const SpinnerComponent = () => {
  return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <Spinner animation="border" variant="primary" />
      </div>
    )
}

export default SpinnerComponent