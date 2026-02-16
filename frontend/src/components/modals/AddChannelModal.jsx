import { useEffect, useRef, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import { Modal, Form, Button } from 'react-bootstrap'
import * as yup from 'yup'

import { setActiveChannelId } from '../../slices/uiSlice'
import { useGetChannelsQuery, useAddNewChannelMutation } from '../../services/channelsApi'

const AddChannelModal = (props) => {
  const { data: channels } = useGetChannelsQuery()
  const channelsNames = channels.map(channel => channel.name)
  const { onHide } = props
  const [addNewChannel, { isLoading }] = useAddNewChannelMutation()
  const dispatch = useDispatch()

  const validationSchema = useMemo(() => 
    yup.object({
      name: yup
        .string()
        .required('Обязательное поле')
        .min(3, 'От 3 до 20 символов')
        .max(20, 'От 3 до 20 символов')
        .notOneOf(channelsNames, 'Должно быть уникальным')
    }), [channelsNames])

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const createdChannel = await addNewChannel(values).unwrap()
        onHide()
        dispatch(setActiveChannelId(createdChannel.id))
      }
      catch (error) {
        formik.setSubmitting(false)
        console.log(error)
      }
    },
    validateOnBlur: false,
    validateOnChange: false
  })

  const inputRef = useRef()
  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return (
    <Modal centered show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
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
            <Form.Label visuallyHidden htmlFor='name'>Имя канала</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button variant='secondary' className="me-2" onClick={onHide}>Отменить</Button>
              <Button type="submit" variant='primary' disabled={isLoading}>Отправить</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default AddChannelModal