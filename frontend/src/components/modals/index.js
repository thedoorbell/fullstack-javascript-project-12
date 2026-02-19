import Add from './AddChannelModal'
import Remove from './RemoveChannelModal'
import Rename from './RenameChannelModal'

const modals = {
  adding: Add,
  removing: Remove,
  renaming: Rename,
}

export default modalName => modals[modalName]
