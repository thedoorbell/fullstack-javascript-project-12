import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import filter from 'leo-profanity'

const MessagesList = ({ channels, messages, messagesEndRef }) => {
  const { activeChannelId } = useSelector(state => state.ui)
  const { t } = useTranslation()

  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            #
            {channels?.find(c => c.id === activeChannelId)?.name}
          </b>
        </p>
        <span className="text-muted">
          {t('messages', { count: messages?.length })}
        </span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5">
        {messages?.map(message => (
          <div className="text-break mb-2" key={message.id}>
            <b>{message.username}</b>
            :
            {` ${filter.clean(message.body)}`}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </>
  )
}

export default MessagesList
