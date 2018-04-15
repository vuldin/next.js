import { initStore } from '../store'

export default props => {
  const isServer = !!props.req
  const state = initStore()
  state.setOrigin(props.pathname)
  return { isServer, state }
}
