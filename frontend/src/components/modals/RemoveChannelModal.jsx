import { Modal, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useGetChannelsQuery, useRemoveChannelMutation } from '../../services/channelsApi'
import { setActiveChannelId } from '../../slices/uiSlice'

const RemoveChannelModal = (props) => {
  const { onHide, modalInfo } = props
  const { item: id } = modalInfo
  const dispatch = useDispatch()
  const [removeChannel, { isLoading }] = useRemoveChannelMutation()
  const { data: channels } = useGetChannelsQuery()
  const { activeChannelId } = useSelector(state => state.ui)

  const onRemove = async () => {
    try {
      const response = await removeChannel(id).unwrap()
      const { id: deletedId } = response
      onHide()
      if (deletedId === activeChannelId) {
        dispatch(setActiveChannelId(channels[0].id))
      }
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