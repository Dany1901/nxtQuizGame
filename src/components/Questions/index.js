import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import OptionsPage from '../OptionsPage'
import Results from '../Results'
import './index.css'

const apiConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
  initial: 'INITIAL',
}

class Questions extends Component {
  state = {
    questionsList: [],
    activeId: 0,
    apiStatus: apiConstants.initial,
    attempted: 0,
    unattempted: 0,
    correctAns: 1,
    wrongAns: 0,
    isCorrect: false,
    isButtonClicked: false,
    nxtBtnClicked: false,
    unattemptedQuestionsList: [],
    activeIndex: 0,
    buttonClickedddd: false,
    time: 30,
    setTimer: 30,
    isTrue: false,
  }

  componentDidMount() {
    this.getQuestions()
    this.timerId = setInterval(this.statusChange, 1000)
  }

  isCorrectClicked = isT => {
    this.setState(prevState => ({correctAns: prevState.correctAns + 1}))
    const {correctAns} = this.state
    clearInterval(this.timerId)
    this.setState({isTrue: false})
  }

  isWrongClicked = isW => {
    this.setState(prevState => ({wrongAns: prevState.wrongAns + 1}))
    const {wrongAns} = this.state
    clearInterval(this.timerId)
    this.setState({isTrue: false})
  }

  statusChange = () => {
    const {time} = this.state
    if (time !== 0) {
      this.setState(prevState => ({time: prevState.time - 1}))
    } else {
      clearInterval(this.timerId)
      this.setState({isTrue: true})
      this.onClickNextQuestion()
    }
  }

  getQuestions = async () => {
    this.setState({apiStatus: apiConstants.loading})
    const url = 'https://apis.ccbp.in/assess/questions'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedQuestions = data.questions.map(eachQuestion => ({
        questionText: eachQuestion.question_text,
        id: eachQuestion.id,
        optionType: eachQuestion.options_type,
        options: eachQuestion.options,
      }))
      this.setState({
        questionsList: updatedQuestions,
        apiStatus: apiConstants.success,
      })
      const {questionsList} = this.state
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  getUnAttemptedList = () => {
    const {
      nxtBtnClicked,
      isButtonClicked,
      questionsList,
      activeId,
      unattemptedQuestionsList,
    } = this.state

    if (isButtonClicked === false) {
      console.log(questionsList[activeId])
      console.log(unattemptedQuestionsList, 'clicked')
      this.setState(prevState => ({
        unattemptedQuestionsList: [
          ...prevState.unattemptedQuestionsList,
          questionsList[activeId],
        ],
      }))
    }
  }

  getButtonStatus = status => {
    this.setState({isButtonClicked: true})
    clearInterval(this.timerId)
    this.setState({isTrue: false})
  }

  timerSet = () => {
    this.setState({
      isTrue: false,
      time: 30,
    })
    this.timerId = setInterval(this.statusChange, 1000)
  }

  onStartTimer = () => {
    this.timeInterval = setInterval(this.statusChange, 1000)
    this.setState({isTrue: true})
  }

  onResetTimer = () => {
    clearInterval(this.timeInterval)
    this.setState({isTrue: false, time: 30})
  }

  onClickNextQuestion = () => {
    const {
      activeId,
      nxtBtnClicked,
      isButtonClicked,
      buttonClickedddd,
      attempted,
    } = this.state
    const {time} = this.state
    const {questionsList} = this.state
    if (time !== 0) {
      this.setState(prevState => ({time: prevState.time - 1}))
    } else {
      clearInterval(this.timerId)
      this.setState({isTrue: true})
    }

    if (nxtBtnClicked === true && isButtonClicked === true) {
      this.setState(prevState => ({
        attempted: prevState.attempted + 1,
      }))
    }
    this.setState({isButtonClicked: false})
    console.log(attempted)
    if (activeId < questionsList.length - 1) {
      console.log('next button clicked')
      const isNextBtnClicked = true
      this.setState(
        prevState => ({
          activeId: prevState.activeId + 1,
          nxtBtnClicked: isNextBtnClicked,
        }),
        this.getUnAttemptedList(),
      )
    }
    this.onResetTimer()
    this.onStartTimer()
  }

  getIsCorrect = isC => {
    this.setState(prevState => ({attempted: prevState.attempted + 1}))
    const {attempted} = this.state
    this.setState({isCorrect: isC})
  }

  handleReloadClick = () => {
    window.location.reload()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-assess-failure-img.png"
          alt="failure view"
        />
        <h1>Something went wrong</h1>
        <p>Our servers are busy please try again</p>
        <button
          type="button"
          onClick={this.handleReloadClick}
          className="retry-btn"
        >
          Retry
        </button>
      </div>
    </div>
  )

  getTheData = ans => {
    this.setState({selectedData: ans})
  }

  getButtonStatus = status => {
    this.setState({isButtonClicked: true, nxtBtnClicked: true})
    // console.log(status)
  }

  getCount = () => {
    const {nxtBtnClicked, isButtonClicked} = this.state
    if (nxtBtnClicked && isButtonClicked === true) {
      this.setState(prevState => ({
        attempted: prevState.attempted + 1,
      }))
    }
  }

  onRedirectToResultsPage = async () => {
    const {history} = this.props
    const {
      correctAns,
      wrongAns,
      questionsList,
      unattemptedQuestionsList,
      attempted,
    } = this.state
    await this.getUnAttemptedList()
    history.push('/game-results', {
      cA: correctAns,
      wA: wrongAns,
      total: questionsList.length,
      uAL: unattemptedQuestionsList,
      Attemp: attempted,
    })
  }

  renderSuccessView = () => {
    const {
      questionsList,
      activeId,
      isCorrect,
      selectedData,
      nxtBtnClicked,
      attempted,
      correctAns,
      unattemptedQuestionsList,
      time,
    } = this.state
    console.log(unattemptedQuestionsList)
    const requiredList = questionsList[activeId]
    return (
      <div className="container">
        <Header />
        <div className="question-count-container">
          <div className="para">
            <p className="question-page">Question</p>
            <p className="paragraph">
              {activeId + 1}/{questionsList.length}
            </p>
          </div>
          <p>{time}</p>
        </div>
        {requiredList !== undefined && (
          <div>
            <p className="question-text">{requiredList.questionText}</p>
            <ul style={{listStyleType: 'upper-alpha'}} className="ul-container">
              {requiredList.options.map(eachOption => (
                <OptionsPage
                  key={eachOption.id}
                  optionDetails={eachOption}
                  isCorrectss={eachOption.is_correct}
                  getIsCorrect={this.getIsCorrect}
                  getButtonStatus={this.getButtonStatus}
                  isCorrectClicked={this.isCorrectClicked}
                  isWrongClicked={this.isWrongClicked}
                  questionsList={questionsList}
                />
              ))}
            </ul>
          </div>
        )}
        <div className="nxt-btn-container">
          {questionsList.length === activeId + 1 ? (
            <button
              type="button"
              onClick={this.onRedirectToResultsPage}
              className="next-qtn-btn"
            >
              Submit Assessment
            </button>
          ) : (
            <button
              type="button"
              onClick={this.onClickNextQuestion}
              className="next-qtn-btn"
            >
              Next Question
            </button>
          )}
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="Oval" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {
      apiStatus,
      unattemptedQuestionsList,
      nxtBtnClicked,
      isButtonClicked,
      attempted,
    } = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderSuccessView()
      case apiConstants.failure:
        return this.renderFailureView()
      case apiConstants.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}
export default Questions
