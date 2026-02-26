import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'

import { useGetChannelsQuery, useRenameChannelMutation } from '../../services/channelsApi'
import { getChannelsSchema } from '../../utilities/validationSchemas'
import ChannelFormModal from './ChannelFormModal'

const RenameChannelModal = ({ modalInfo, onHide }) => {
  const { id, name } = modalInfo.item
  const { data: channels } = useGetChannelsQuery()
  const [renameChannel] = useRenameChannelMutation()
  const { t } = useTranslation()
  const inputRef = useRef()
  const validationSchema = getChannelsSchema(channels, t)

  useEffect(() => {
    inputRef.current.select()
  }, [])

  const formik = useFormik({
    initialValues: { name },
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const { name } = values
        await renameChannel({ id, name }).unwrap()
        toast.success(t('channelRenamed'))
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
      title={t('renameChannel')}
      inputRef={inputRef}
      formik={formik}
      onHide={onHide}
    />
  )
}

export default RenameChannelModal
