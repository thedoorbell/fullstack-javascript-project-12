import * as yup from 'yup'

export const getChannelsSchema = (channels, t) => yup.object({
  name: yup.string()
    .required(t('errors.required'))
    .min(3, t('errors.minmax'))
    .max(20, t('errors.minmax'))
    .notOneOf(channels.map(channel => channel.name), t('errors.notOneOf'))
})

export const getSingupSchema = (t) => yup.object({
  username: yup.string()
    .required(t('errors.required'))
    .min(3, t('errors.minmax'))
    .max(20, t('errors.minmax')),
  password: yup.string()
    .required(t('errors.required'))
    .min(6, t('errors.min', { min: 6 })),
  confirmPassword: yup.string()
    .required('')
    .oneOf([yup.ref('password'), ''], t('errors.oneOf'))
})