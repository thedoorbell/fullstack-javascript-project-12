import { Modal, Form, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const ChannelFormModal = ({ title, inputRef, formik, onHide }) => {
  const { t } = useTranslation()

  return (
    <Modal centered show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="mb-2"
              name="name"
              id="name"
              isInvalid={formik.submitCount > 0 && formik.errors.name}
            />
            <Form.Label visuallyHidden htmlFor="name">{t('channelName')}</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button
                variant="secondary"
                className="me-2"
                onClick={onHide}
              >
                {t('cancel')}
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={formik.isSubmitting}
              >
                {t('send')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default ChannelFormModal
