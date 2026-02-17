import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const NotFoundPage = () => {
  const { t } = useTranslation()
  
  return (
    <div>
      <h1>{t('notFound')}</h1>
      <p>{t('sorry')}</p>
      <Link to="/">{t('goToMainPage')}</Link>
    </div>
  )
}

export default NotFoundPage