import { Button, Col, Nav } from 'react-bootstrap'
import { PlusSquare } from 'react-bootstrap-icons'
import { useTranslation } from 'react-i18next'
import ChannelItem from './ChannelItem'

const ChannelsList = ({ channels, showModal }) => {
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
          <ChannelItem key={channel.id} channel={channel} showModal={showModal} />
        ))}
      </Nav>
    </Col>
  )
}

export default ChannelsList
