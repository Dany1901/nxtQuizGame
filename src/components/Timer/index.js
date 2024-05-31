import React from 'react'
import {withRouter} from 'react-router-dom'

class CountdownTimer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      time: 60, // Initial time in seconds
    }
  }

  componentDidMount() {
    this.timerID = setInterval(() => {
      this.setState(
        ({time}) => ({
          time: time - 1, // Decrement time by 1 second
        }),
        () => {
          const {time} = this.state
          const {history} = this.props
          if (time === 0) {
            clearInterval(this.timerID) // Clear the interval
            history.push('/t') // Redirect to the desired route
          }
        },
      )
    }, 1000) // Update every second
  }

  componentWillUnmount() {
    clearInterval(this.timerID) // Clear the interval when the component is unmounted
  }

  render() {
    const {time} = this.state
    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    return (
      <div>
        <p className="time-heading">Time Left</p>
        <p>
          {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </p>
      </div>
    )
  }
}

export default withRouter(CountdownTimer)
