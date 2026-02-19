import { Col, Row, Container } from 'react-bootstrap'
import { useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useGetChannelsQuery } from '../services/channelsApi'
import { useGetMessagesQuery } from '../services/messagesApi'
import { setActiveChannelId, setModalInfo } from '../slices/uiSlice.js'
import SpinnerComponent from '../components/Spinner'
import getModal from '../components/modals/index.js'
import ChannelsList from '../components/ChannelsList'
import MessagesList from '../components/MessagesList'
import MessagesForm from '../components/MessagesForm'
import useSocket from '../hooks/useSocket.js'

const renderModal = ({ modalInfo, hideModal }) => {
  if (!modalInfo.type) {
    return null
  }
  const Modal = getModal(modalInfo.type)
  return <Modal modalInfo={modalInfo} onHide={hideModal} />
}

const ChatPage = () => {
  useSocket()
  const { data: channels, isLoading } = useGetChannelsQuery()
  const { data: messages } = useGetMessagesQuery()
  const { activeChannelId, modalInfo } = useSelector(state => state.ui)
  const inputRef = useRef()
  const messagesEndRef = useRef()
  const dispatch = useDispatch()

  const hideModal = () => dispatch(setModalInfo({ type: null, item: null }))
  const showModal = (type, item = null) => dispatch(setModalInfo({ type, item }))
  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView()
  const filteredMessages = messages?.filter(m => m.channelId === activeChannelId)

  useEffect(() => {
    if (channels?.length > 0 && !activeChannelId) {
      dispatch(setActiveChannelId(channels[0].id))
    }
  }, [channels, dispatch, activeChannelId])

  useEffect(() => {
    scrollToBottom()
  }, [messages, activeChannelId])

  if (isLoading) {
    return <SpinnerComponent />
  }

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <ChannelsList channels={channels} showModal={showModal} />
        <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100">
            <MessagesList
              channels={channels}
              messages={filteredMessages}
              messagesEndRef={messagesEndRef}
            />
            <MessagesForm inputRef={inputRef} />
          </div>
        </Col>
      </Row>
      {renderModal({ modalInfo, hideModal })}
    </Container>
  )
}

export default ChatPage
