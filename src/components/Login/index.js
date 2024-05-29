import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
    showPassword: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    history.push('/')
    Cookies.set('jwt_token', jwtToken, {expires: 30})
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, showSubmitError: true})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showSubmitError, errorMsg, showPassword} =
      this.state
    const inputType = showPassword ? 'text' : 'password'
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-form-container">
        <form className="form-container" onSubmit={this.submitForm}>
          <img
            src="https://res.cloudinary.com/dh7w7qllo/image/upload/v1715953746/Frame_8787_bkyokc.jpg"
            className="login-website-logo"
            alt="login website logo"
          />
          <div className="login-container">
            <div className="input-container">
              <label className="input-label" htmlFor="username">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                value={username}
                className="username-input-field"
                onChange={this.onChangeUsername}
                placeholder="Username"
              />
            </div>
            <div className="input-container">
              <label className="input-label" htmlFor="password">
                PASSWORD
              </label>
              <input
                type={inputType}
                id="password"
                value={password}
                className="password-input-field"
                onChange={this.onChangePassword}
                placeholder="Password"
              />
            </div>
            <div className="show-passwords">
              <input
                type="checkbox"
                className="check-box"
                id="check"
                onChange={this.onShowPassword}
              />
              <label htmlFor="check" className="label-password">
                Show Password
              </label>
            </div>
            <div className="button-container">
              <button type="submit" className="login-button">
                Login
              </button>
              {showSubmitError && <p className="error-message">*{errorMsg}</p>}
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default Login
