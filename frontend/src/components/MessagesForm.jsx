import { Button, Form, InputGroup } from 'react-bootstrap'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ArrowRightSquare } from 'react-bootstrap-icons'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import { useAddNewMessageMutation } from '../services/messagesApi'

const MessagesForm = ({ inputRef }) => {
  const { username } = useSelector(state => state.auth)
  const { activeChannelId } = useSelector(state => state.ui)
  const [addNewMessage] = useAddNewMessageMutation()
  const { t } = useTranslation()

  const formik = useFormik({
    initialValues: {
      body: '',
      channelId: '',
      username,
    },
    onSubmit: async (values) => {
      try {
        values.channelId = activeChannelId
        await addNewMessage(values)
        values.body = ''
      }
      catch (error) {
        formik.setSubmitting(false)
        toast.error(t('errors.networkError'))
        console.log(error)
      }
    }
  })

  useEffect(() => {
    if (!formik.isSubmitting && inputRef.current) {
      inputRef.current.focus()
    }
  }, [inputRef, activeChannelId, formik.isSubmitting])
  
  return (
    <div className="mt-auto px-5 py-3">
      <Form
        noValidate
        className="py-1 border rounded-2"
        onSubmit={formik.handleSubmit}
      >
        <InputGroup className="has-validation">
          <Form.Control
            name="body"
            aria-label={t('newMessage')}
            placeholder={t('writeYourMessage')}
            className="border-0 p-0 ps-2"
            value={formik.values.body}
            onChange={formik.handleChange}
            ref={inputRef}
            disabled={formik.isSubmitting}
          />
          <Button
            variant=""
            type="submit"
            className="btn-group-vertical border-0"
            disabled={formik.values.body === '' || formik.isSubmitting}
          >
            <ArrowRightSquare size={20} />
            <span className="visually-hidden">{t('send')}</span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  )
}

export default MessagesForm