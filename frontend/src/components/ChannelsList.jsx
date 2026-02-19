import { Button, Col, Nav, ButtonGroup, Dropdown } from 'react-bootstrap'
import { PlusSquare } from 'react-bootstrap-icons'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import filter from 'leo-profanity'
import { setActiveChannelId } from '../slices/uiSlice'

const ChannelsList = ({ channels, showModal }) => {
  const { activeChannelId } = useSelector(state => state.ui)
  const dispatch = useDispatch()
  const { t } = useTranslation()

  return (
    <Col xs={4} md={2} className="border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 mb-2 ps-4 pe-2 p-4 justify-content-between">
        <div className="d-flex align-items-center">
          <h6 className="mb-0 fw-bold">{t('channels')}</h6>
        </div>
        <Button variant="link" size="sm" className="p-0" onClick={() => showModal('adding')}>
          <PlusSquare size={20} />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <Nav
        id="channels-box"
        variant="pills"
        as="ul"
        fill
        className="flex-column px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channels?.map(channel => (
          <Nav.Item as="li" key={channel.id} className="w-100">
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
        ))}
      </Nav>
    </Col>
  )
}

export default ChannelsList
