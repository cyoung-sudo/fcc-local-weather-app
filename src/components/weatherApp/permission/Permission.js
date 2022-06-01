import './Permission.css';

export default function Permission(props) {
  return (
    <div id="permission">
      <div className="title">Local Weather App</div>
      <div className="content">
        <div>Do you allow us to access your location?</div>
        <div>No data will be stored</div>
        <button onClick={() => props.accessLocation()}>Allow Access</button>
      </div>
    </div>
  )
}