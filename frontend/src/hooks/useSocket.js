import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useContext, useRef } from 'react'
import { SocketContext } from '../contexts/SocketContext'
import { useGetChannelsQuery, channelsApi } from '../services/channelsApi'
import { messagesApi } from '../services/messagesApi'
import { setActiveChannelId } from '../slices/uiSlice.js'


const useSocket = () => {
  const socket = useContext(SocketContext)
  const { data: channels } = useGetChannelsQuery()
  const { activeChannelId } = useSelector(state => state.ui)
  const dispatch = useDispatch()
  const channelsRef = useRef(channels)
  const activeChannelIdRef = useRef(activeChannelId)

  useEffect(() => {
    channelsRef.current = channels
  }, [channels])

  useEffect(() => {
    activeChannelIdRef.current = activeChannelId
  }, [activeChannelId])

  useEffect(() => {
      const handleNewMessage = (payload) => {
        dispatch(
          messagesApi.util.updateQueryData('getMessages', undefined, (draftMessages) => {
            draftMessages.push(payload)
          })
        )
      }
      const handleNewChannel = (payload) => {
        dispatch(
          channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
            draftChannels.push(payload)
          })
        )
      }
      const handleRemoveChannel = (payload) => {
        dispatch(
          channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
            return draftChannels.filter(channel => channel.id !== payload.id)
          })
        )
        if (payload.id === activeChannelIdRef.current) {
          dispatch(setActiveChannelId(channelsRef.current[0].id))
        }
      }
      const handleRenameChannel = (payload) => {
        dispatch(
          channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
            const channel = draftChannels.find(c => c.id === payload.id)
            channel.name = payload.name
          })
        )
      }
      
      socket.on('newMessage', handleNewMessage)
      socket.on('newChannel', handleNewChannel)
      socket.on('removeChannel', handleRemoveChannel)
      socket.on('renameChannel', handleRenameChannel)
  
      return () => {
        socket.off('newMessage')
        socket.off('newChannel')
        socket.off('removeChannel')
        socket.off('renameChannel')
      }
    }, [dispatch, socket])
}

export default useSocket