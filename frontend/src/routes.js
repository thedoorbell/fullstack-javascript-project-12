const apiPath = '/api/v1'
const mainPagePath = '/'
const loginPagePath = '/login'
const signUpPagePath = '/signup'
const channelsPath = '/channels'
const messagesPath = '/messages'

export default {
  mainPath: () => mainPagePath,
  loginPath: () => loginPagePath,
  signUpPath: () => signUpPagePath,
  apiPath: () => apiPath,
  channelsPath: () => channelsPath,
  messagesPath: () => messagesPath,
}
