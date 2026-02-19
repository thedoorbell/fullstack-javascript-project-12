import { Modal, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useRemoveChannelMutation } from '../../services/channelsApi'

const RemoveChannelModal = ({ modalInfo, onHide }) => {
  const { item: id } = modalInfo
  const [removeChannel, { isLoading }] = useRemoveChannelMutation()
  const { t } = useTranslation()

  const onRemove = async () => {
    try {
      await removeChannel(id).unwrap()
      toast.success(t('channelRemoved'))
      onHide()
    }
    catch (error) {
      toast.error(t('errors.networkError'))
      console.log(error)
    }
  }

  return (
    <Modal centered show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('youSure')}</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={onHide}>{t('cancel')}</Button>
          <Button variant="danger" onClick={onRemove} disabled={isLoading}>{t('send')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default RemoveChannelModal
