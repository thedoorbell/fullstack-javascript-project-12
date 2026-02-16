import { Button, Col, Form, Row, Container, Nav, InputGroup, ButtonGroup, Dropdown } from 'react-bootstrap'
import { PlusSquare, ArrowRightSquare } from 'react-bootstrap-icons'
import { useRef, useEffect, useContext, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useFormik } from 'formik'

import { SocketContext } from '../contexts/SocketContext'
import { useGetChannelsQuery, channelsApi } from '../services/channelsApi'
import { useGetMessagesQuery, useAddNewMessageMutation, messagesApi } from '../services/messagesApi'
import { setActiveChannelId } from '../slices/uiSlice.js'
import SpinnerComponent from '../components/Spinner'
import getModal from '../components/modals/index.js'

const renderModal = ({ modalInfo, hideModal }) => {
  if (!modalInfo.type) {
    return null
  }

  const Modal = getModal(modalInfo.type)
  return <Modal modalInfo={modalInfo} onHide={hideModal} />
}

const ChatPage = () => {
  const inputRef = useRef()
  const messagesEndRef = useRef()
  const dispatch = useDispatch()
  const socket = useContext(SocketContext)

  const [modalInfo, setModalInfo] = useState({ type: null, item: null })
  const hideModal = () => setModalInfo({ type: null, item: null })
  const showModal = (type, item = null) => setModalInfo({ type, item })

  const { data: channels, isLoading } = useGetChannelsQuery()
  const { data: messages } = useGetMessagesQuery()
  const [addNewMessage] = useAddNewMessageMutation()

  const { activeChannelId } = useSelector(state => state.ui)
  const { username } = useSelector(state => state.auth)

  const filteredMessages = messages?.filter(message => message.channelId === activeChannelId)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView()
  };

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
        inputRef.current.focus()
      }
      catch (error) {
        formik.setSubmitting(false)
        console.log(error)
      }
    }
  })

  useEffect(() => {
    socket.on('newMessage', (payload) => {
      dispatch(
        messagesApi.util.updateQueryData('getMessages', undefined, (draftMessages) => {
          draftMessages.push(payload)
        })
      )
    })
    socket.on('newChannel', (payload) => {
      dispatch(
        channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
          draftChannels.push(payload)
        })
      )
    })
    socket.on('removeChannel', (payload) => {
      dispatch(
        channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
          return draftChannels.filter(channel => channel.id !== payload.id)
        })
      )

      if (payload.id === activeChannelId) {
        dispatch(setActiveChannelId(channels[0].id))
      }
    })
    socket.on('renameChannel', (payload) => {
      dispatch(
        channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
          const channel = draftChannels.find(c => c.id === payload.id)
          channel.name = payload.name
        })
      )
    })

    return () => {
      socket.off('newMessage')
      socket.off('newChannel')
      socket.off('removeChannel')
    }
  }, [dispatch, socket, channels, activeChannelId])

  useEffect(() => {
    if (channels?.length > 0 && !activeChannelId) {
      dispatch(setActiveChannelId(channels[0].id))
    }
  }, [channels, dispatch, activeChannelId])

  useEffect(() => {
    if (!formik.isSubmitting && inputRef.current) {
      inputRef.current.focus()
    }
  }, [activeChannelId, formik.isSubmitting])

  useEffect(() => {
    scrollToBottom()
  }, [messages, activeChannelId])

  if (isLoading) {
    return <SpinnerComponent />
  }
  
  return (
    <Container className='h-100 my-4 overflow-hidden rounded shadow'>
      <Row className='h-100 bg-white flex-md-row'>
        <Col xs={4} md={2} className='border-end px-0 bg-light flex-column h-100 d-flex'>
          <div className="d-flex mt-1 mb-2 ps-4 pe-2 p-4 justify-content-between">
            <div className="d-flex align-items-center">
              <h6 className="mb-0 fw-bold">Каналы</h6>
            </div>
            <Button variant="link" size="sm" className="p-0" onClick={() => showModal('adding')}>
              <PlusSquare size={20} />
            </Button>
          </div>
          <Nav
            id='channels-box'
            variant='pills'
            as='ul'
            fill
            className='flex-column px-2 mb-3 overflow-auto h-100 d-block'
          >
            {channels?.map(channel => (
              <Nav.Item
                as='li'
                key={channel.id}
                className="w-100"
              > {channel.removable === false
                ?
                  <Button
                    className='w-100 rounded-0 text-start'
                    variant={activeChannelId === channel.id ? 'secondary' : ''}
                    onClick={() => dispatch(setActiveChannelId(channel.id))}
                  >
                    <span className="me-1">#</span>
                    {channel.name}
                  </Button>
                :
                  <Dropdown as={ButtonGroup} className="d-flex">
                    <Button
                      className="w-100 rounded-0 text-start text-truncate"
                      variant={activeChannelId === channel.id ? 'secondary' : ''}
                      onClick={() => dispatch(setActiveChannelId(channel.id))}
                    >
                      <span className="me-1">#</span>
                      {channel.name}
                    </Button>
                    <Dropdown.Toggle 
                      split
                      variant={activeChannelId === channel.id ? 'secondary' : ''}
                      className='flex-grow-0'
                    >
                      <span className="visually-hidden">Управление каналом</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => showModal('removing', channel.id)}>Удалить</Dropdown.Item>
                      <Dropdown.Item onClick={() => showModal('renaming', channel)}>Переименовать</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                }
              </Nav.Item>
            ))}
          </Nav>
        </Col>
        <Col className='p-0 h-100'>
          <div className='d-flex flex-column h-100'>
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0"><b># {channels?.find(c => c.id === activeChannelId)?.name}</b></p>
              <span className="text-muted">
                {filteredMessages ? filteredMessages.length : 0} сообщений
              </span>
            </div>
            <div id="messages-box" className="chat-messages overflow-auto px-5">
              {filteredMessages?.map(message => (
                <div className="text-break mb-2" key={message.id}>
                    <b>{message.username}</b>: {message.body}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="mt-auto px-5 py-3">
              <Form
                noValidate
                className="py-1 border rounded-2"
                onSubmit={formik.handleSubmit}
              >
                <InputGroup className="has-validation">
                  <Form.Control
                    name="body"
                    aria-label="Новое сообщение"
                    placeholder="Введите сообщение..."
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
                    <span className="visually-hidden">Отправить</span>
                  </Button>
                </InputGroup>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
      {renderModal({ modalInfo, hideModal })}
    </Container>
  )
}

export default ChatPage