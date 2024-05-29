import {Route, Switch, Redirect, BrowserRouter} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import Questions from './components/Questions'
import NotFound from './components/NotFound'
import Timer from './components/Timer'
import TerminationPage from './components/TerminationPage'
import Results from './components/Results'
import ReportPage from './components/ReportPage'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Home} />
      <Route exact path="/q" component={Questions} />
      <Route exact path="/timer" component={Timer} />
      <Route exact path="/t" component={TerminationPage} />
      <Route exact path="/r" component={Results} />
      <Route exact path="/report" component={ReportPage} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </BrowserRouter>
)

export default App
