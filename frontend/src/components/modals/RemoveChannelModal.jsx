import { Modal, Button } from 'react-bootstrap'
import { useRemoveChannelMutation } from '../../services/channelsApi'

const RemoveChannelModal = (props) => {
  const { onHide, modalInfo } = props
  const { item: id } = modalInfo
  const [removeChannel, { isLoading }] = useRemoveChannelMutation()

  const onRemove = async () => {
    try {
      await removeChannel(id)
      onHide()
    }
    catch (error) {
      console.log(error)
    }
  }
  
  return (
    <Modal centered show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button variant='secondary' className="me-2" onClick={onHide}>Отменить</Button>
          <Button variant='danger' onClick={onRemove} disabled={isLoading}>Отправить</Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default RemoveChannelModal