import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from './actions/shared'
import LoadingBar from 'react-redux-loading'
import Dashboard from '../src/components/Dashboard'
import QuestionPage from '../src/components/QuestionPage'
import NewQuestion from '../src/components/NewQuestion'
import LeaderBoard from '../src/components/LeaderBoard'
import Login from '../src/components/Login'
import Nav from '../src/components/Nav'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar style={{ backgroundColor: 'red' }} />
          <div className='container'>
            <Nav />
            {this.props.loading === true
              ? <Login />
              : <div>
                <Route path='/' exact component={Login} />
                <Route path='/dashboard' exact component={Dashboard} />
                <Route path='/question/:id' component={QuestionPage} />
                <Route path='/add' component={NewQuestion} />
                <Route path='/leaderboard' component={LeaderBoard} />
                </div>}
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)
