import { useEffect, useRef, useMemo } from 'react'
import { useFormik } from 'formik'
import { Modal, Form, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import * as yup from 'yup'

import { useGetChannelsQuery, useRenameChannelMutation } from '../../services/channelsApi'

const RenameChannelModal = (props) => {
  const { data: channels } = useGetChannelsQuery()
  const channelsNames = channels.map(channel => channel.name)
  const { onHide, modalInfo } = props
  const { id, name } = modalInfo.item
  const [renameChannel] = useRenameChannelMutation()
  const { t } = useTranslation()

  const validationSchema = useMemo(() => 
    yup.object({
      name: yup
        .string()
        .required(t('errors.required'))
        .min(3, t('errors.min', { min: 3 }))
        .max(20, t('errors.max', { max: 20 }))
        .notOneOf(channelsNames, t('errors.notOneOf'))
    }), [channelsNames, t])

  const formik = useFormik({
    initialValues: { name },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const name = values.name
        await renameChannel({ id, name }).unwrap()
        toast.success(t('channelRenamed'))
        onHide()
      }
      catch (error) {
        formik.setSubmitting(false)
        toast.error(t('networkError'))
        console.log(error)
      }
    },
    validateOnBlur: false,
    validateOnChange: false
  })

  const inputRef = useRef()
  useEffect(() => {
    inputRef.current.select()
  }, [])

  return (
    <Modal centered show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('renameChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className='mb-2'
              name="name"
              id="name"
              isInvalid={formik.submitCount > 0 && formik.errors.name}
            />
            <Form.Label visuallyHidden htmlFor='name'>{t('channelName')}</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button variant='secondary' className="me-2" onClick={onHide}>{t('cancel')}</Button>
              <Button type="submit" variant='primary' disabled={formik.isSubmitting}>{t('send')}</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default RenameChannelModal