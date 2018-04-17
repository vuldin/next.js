export default props => (
  <div className={`time ${props.isServer ? 'server' : 'client'}`}>
    {new Date(props.time).toString()}
  </div>
)
