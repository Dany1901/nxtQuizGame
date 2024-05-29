import {Link, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Header />
      <div className="home-container">
        <div className="home-content">
          <img
            src="https://assets.ccbp.in/frontend/react-js/quiz-game-start-the-quiz-img.png"
            className="home-desktop-img"
            alt="start quiz game"
          />
          <h1 className="heading">
            How Many Of These Questions Do You Actually Know?
          </h1>
          <p className="description">
            Test yourself with these easy quiz questions and answers
          </p>
          <Link to="/q">
            <button type="button" className="quiz-button">
              Start Quiz
            </button>
          </Link>
          <div className="bottom-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/quiz-game-error-img.png"
              className="warning-desktop-img"
              alt="warning icon"
            />
            <p className="warning-content">
              All the progress will be lost, if you reload during the quiz
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
