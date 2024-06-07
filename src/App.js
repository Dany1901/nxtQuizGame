import {Route, Switch, Redirect, BrowserRouter} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import Questions from './components/Questions'
import NotFound from './components/NotFound'
import Timer from './components/Timer'
import TerminationPage from './components/TerminationPage'
import Results from './components/Results'
import ReportPage from './components/ReportPage'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/q" component={Questions} />
      <ProtectedRoute exact path="/timer" component={Timer} />
      <ProtectedRoute exact path="/t" component={TerminationPage} />
      <ProtectedRoute exact path="/game-results" component={Results} />
      <ProtectedRoute exact path="/game-report" component={ReportPage} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </BrowserRouter>
)

export default App
