import { Button, Card, Col, Form, Row, Container, Nav, InputGroup } from 'react-bootstrap'
import { PlusSquare, ArrowRightSquare } from 'react-bootstrap-icons'
import { useRef, useEffect, act } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useFormik } from 'formik'

import { useGetChannelsQuery } from '../services/channelsApi'
import { useGetMessagesQuery } from '../services/messagesApi'
import { addChannels, channelsSelectors, setActiveChannel } from '../slices/channelsSlice'
import { addMessages, messagesSelectors } from '../slices/messagesSlice'

const ChatPage = () => {
  const { data: loadedChannels } = useGetChannelsQuery()
  const { data: loadedMessages } = useGetMessagesQuery()
  const inputRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
      inputRef.current.focus()
    })
  useEffect(() => {
    if (loadedChannels && loadedMessages) {
      try {
        dispatch(addChannels(loadedChannels))
        dispatch(addMessages(loadedMessages))
      }
      catch (error) {
        console.error(error)
      }
    }
  }, [dispatch, loadedChannels, loadedMessages])

  const channels = useSelector(channelsSelectors.selectAll)
  const messages = useSelector(messagesSelectors.selectAll)

  useEffect(() => {
    if (channels.length > 0) {
      dispatch(setActiveChannel(channels[0]))
    }
  }, [channels, dispatch])

  const { activeChannel } = useSelector(state => state.channels)

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async (values) => {
      console.log(values)
    }
  })
  
  return (
    <Container className='h-100 my-4 overflow-hidden rounded shadow'>
      <Row className='h-100 bg-white flex-md-row'>
        <Col xs={4} md={2} className='border-end px-0 bg-light flex-column h-100 d-flex'>
          <div className="d-flex mt-1 mb-2 ps-4 pe-2 p-4 justify-content-between">
            <div className="d-flex align-items-center">
              <h6 className="mb-0 fw-bold">Каналы</h6>
            </div>
            <Button variant="link" size="sm" className="p-0">
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
              >
                <Button
                  className='w-100 rounded-0 text-start'
                  variant={activeChannel.name === channel.name ? 'secondary' : ''}
                  onClick={() => dispatch(setActiveChannel(channel))}
                >
                  <span className="me-1">#</span>
                  {channel.name}
                </Button>
              </Nav.Item>
            ))}
          </Nav>
        </Col>
        <Col className='p-0 h-100'>
          <div className='d-flex flex-column h-100'>
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0"><b># {activeChannel.name}</b></p>
              <span className="text-muted">{messages ? messages.length : 0} сообщений</span>
            </div>
            <div id="messages-box" className="chat-messages overflow-auto px-5">
              {messages?.map(message => (
                <div className="text-break mb-2" key={message.id}>
                    <b>{message.username}</b>: {message.text}
                </div>
              ))}
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
                  >
                  </Form.Control>
                  <Button
                    variant=""
                    type="submit"
                    className="btn-group-vertical border-0"
                    disabled={formik.values.body === ''}
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
    </Container>
  )
}

export default ChatPage