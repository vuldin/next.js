import { initStore } from '../store'

export default props => {
  const isServer = !!props.req
  console.log(isServer ? 'server' : 'client')
  const state = initStore()
  state.setOrigin(props.pathname)
  return { isServer, state }
}
