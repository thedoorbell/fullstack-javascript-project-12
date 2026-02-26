import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'

import { setActiveChannelId } from '../../slices/uiSlice'
import { useGetChannelsQuery, useAddNewChannelMutation } from '../../services/channelsApi'
import { getChannelsSchema } from '../../utilities/validationSchemas'
import ChannelFormModal from './ChannelFormModal'

const AddChannelModal = ({ onHide }) => {
  const { data: channels } = useGetChannelsQuery()
  const [addNewChannel] = useAddNewChannelMutation()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const inputRef = useRef()
  const validationSchema = getChannelsSchema(channels, t)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const createdChannel = await addNewChannel(values).unwrap()
        toast.success(t('channelAdded'))
        dispatch(setActiveChannelId(createdChannel.id))
        onHide()
      }
      catch (error) {
        toast.error(t('errors.networkError'))
        console.log(error)
      }
    },
  })

  return (
    <ChannelFormModal
      title={t('addChannel')}
      inputRef={inputRef}
      formik={formik}
      onHide={onHide}
    />
  )
}

export default AddChannelModal
