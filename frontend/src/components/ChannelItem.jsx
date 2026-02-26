import { Button, Nav, ButtonGroup, Dropdown } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import filter from 'leo-profanity'
import { setActiveChannelId } from '../slices/uiSlice'

const ChannelItem = ({ channel, showModal }) => {
  const { activeChannelId } = useSelector(state => state.ui)
  const dispatch = useDispatch()
  const { t } = useTranslation()

  return (
    <Nav.Item as="li" className="w-100">
      {channel.removable === false
        ? (
            <Button
              className="w-100 rounded-0 text-start"
              variant={activeChannelId === channel.id ? 'secondary' : ''}
              onClick={() => dispatch(setActiveChannelId(channel.id))}
            >
              <span className="me-1">#</span>
              {filter.clean(channel.name)}
            </Button>
          )
        : (
            <Dropdown as={ButtonGroup} className="d-flex">
              <Button
                className="w-100 rounded-0 text-start text-truncate"
                variant={activeChannelId === channel.id ? 'secondary' : ''}
                onClick={() => dispatch(setActiveChannelId(channel.id))}
              >
                <span className="me-1">#</span>
                {filter.clean(channel.name)}
              </Button>
              <Dropdown.Toggle
                split
                variant={activeChannelId === channel.id ? 'secondary' : ''}
                className="flex-grow-0"
              >
                <span className="visually-hidden">{t('editChannel')}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => showModal('removing', channel.id)}>
                  {t('remove')}
                </Dropdown.Item>
                <Dropdown.Item onClick={() => showModal('renaming', channel)}>
                  {t('rename')}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
    </Nav.Item>
  )
}

export default ChannelItem
