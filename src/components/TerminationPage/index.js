import {withRouter} from 'react-router-dom'
import './index.css'

const TerminationPage = props => {
  const {history} = props
  const onRedirect = () => {
    history.push('/q')
  }

  const onRedirectToHomePage = () => {
    history.replace('/')
  }

  return (
    <div className="termination-container">
      <div>
        <h1>Time Completed</h1>
        <div>
          <button
            type="button"
            className="termination-btn"
            onClick={onRedirect}
          >
            Retry
          </button>
          <button
            type="button"
            className="termination-btn"
            onClick={onRedirectToHomePage}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
export default withRouter(TerminationPage)
