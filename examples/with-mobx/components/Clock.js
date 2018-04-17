export default props => (
  <div className={props.light ? 'time light' : 'time dark'}>
    {new Date(props.lastUpdate).toString()}
  </div>
)

const format = t =>
  `${pad(t.getUTCHours())}:${pad(t.getUTCMinutes())}:${pad(t.getUTCSeconds())}`

const pad = n => (n < 10 ? `0${n}` : n)
