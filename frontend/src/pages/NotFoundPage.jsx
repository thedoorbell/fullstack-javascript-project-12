import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import notFoundImg from '../assets/notfound.svg'
import routes from '../routes'

const NotFoundPage = () => {
  const { t } = useTranslation()

  return (
    <div className="text-center">
      <img alt={t('notFound')} className="img-fluid h-25" src={notFoundImg}></img>
      <h1 className="text-muted">{t('notFound')}</h1>
      <p className="text-muted">{t('sorry')}</p>
      <Link to={routes.mainPath()}>{t('goToMainPage')}</Link>
    </div>
  )
}

export default NotFoundPage
