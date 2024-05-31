import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Header from '../Header'
import './index.css'

class Results extends Component {
  /*    renderUnattemptedList = () => {
    const {location} = this.props
    const {cA, wA, total, uAL} = location.state
    const attempted = cA - 1 + (wA - 1)
    const unattempted = total - attempted
    const percentage = ((cA - 1) / total) * 100
    console.log(percentage)
    return (
      <div>
        {uAL.map(each => (
          <h1>{each.question_text}</h1>
        ))}
      </div>
    )
  }    */

  renderReportPage = () => {
    const {location} = this.props
    const {cA, wA, total, uAL, Attemp} = location.state
    const wrongAns = total - cA + 1
    const unattempted = total - (wrongAns + cA)
    const percentage = ((cA - 1) / total) * 100
    const unattemptedNotEqualToZero = unattempted !== 0
    return (
      <div className="result-container">
        <div className="first-result-container">
          <div className="score-container">
            <h1>
              <span className="score">{cA - 1}</span> / {total}
            </h1>
          </div>
          <div>
            <div className="r-container">
              <img
                className="img"
                src="https://res.cloudinary.com/dedvz7flb/image/upload/v1713844635/Check_1_-_16px_nhidf6.png"
                alt="correct"
              />
              <p>{cA - 1} Correct answers</p>
            </div>
            <div className="r-container">
              <img
                className="img"
                src="https://res.cloudinary.com/dedvz7flb/image/upload/v1713844706/Close_-_16px_cbmpaw.png"
                alt="wrong"
              />
              <p>{total - cA + 1} Wrong Answers</p>
            </div>
            <div className="r-container">
              <img
                className="img"
                src="https://res.cloudinary.com/dedvz7flb/image/upload/v1713844803/Status_Curcle_16px_i4zn2c.png"
                alt="unattempted"
              />
              <p>{unattempted - 1} Unattempted</p>
            </div>
          </div>
        </div>
        <h1 className="score">{unattempted - 1} unattempted questions</h1>
      </div>
    )
  }

  onRedirect = () => {
    const {history} = this.props
    const {location} = this.props
    const {cA, wA, total, uAL, Attemp} = location.state
    const unattempted = total - Attemp
    const percentage = ((cA - 1) / total) * 100
    history.push('/report', {
      correct: cA,
      wrong: wA,
      attempt: Attemp,
      unattempt: unattempted - 1,
      tot: total,
      percent: percentage,
      uL: uAL,
      at: Attemp,
    })
  }

  renderPercentagePage = () => {
    const {location} = this.props
    const {cA, wA, total, Attemp} = location.state
    const attempted = cA - 1 + (wA - 1)
    const wrongggg = total - cA
    const unattempted = total - attempted
    const percentage = ((cA - 1) / total) * 100
    return (
      <div>
        <Header />
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/quiz-game-lose-img.png"
            alt="lose"
          />
          <h1>You lose!</h1>
          <h1>{percentage}% Correctly Answered</h1>
          <p>
            You attempted {cA - 1} out of {total} questions as correct
          </p>
          <button type="button" onClick={this.onRedirect}>
            Report
          </button>
        </div>
      </div>
    )
  }

  renderCongratulationsPage = () => {
    const {location} = this.props
    const {cA, Attemp, total} = location.state
    const wrongggg = total - Attemp
    const unattempted = total - Attemp
    const percentage = ((cA - 1) / total) * 100
    return (
      <div>
        <Header />
        <div className="trophy-container">
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/quiz-game-congrats-trophy-img.png"
              alt="won"
            />
            <h1>Congrats</h1>
            <p>{percentage}% Correctly Answered</p>
            <p>Quiz completed successfully.</p>
            <p>
              You attempted {cA - 1} out of {total} questions as correct
            </p>
            <button
              type="button"
              className="report-btn"
              onClick={this.onRedirect}
            >
              Report
            </button>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {location} = this.props
    const {cA, Attemp, total} = location.state
    const unattempted = total - Attemp
    const percentage = ((cA - 1) / total) * 100
    if (percentage < 60 && unattempted !== 0) {
      return this.renderPercentagePage()
    }
    if (percentage >= 60) {
      return this.renderCongratulationsPage()
    }
    return this.renderReportPage()
  }
}
export default withRouter(Results)
