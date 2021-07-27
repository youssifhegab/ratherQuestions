import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class Nav extends Component {
  render () {
    return (
      <nav className='nav'>
        <ul>
          <li>
            <NavLink to='/dashboard' exact activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/add' activeClassName='active'>
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to='/leaderboard' activeClassName='active'>
              LeaderBoard
            </NavLink>
          </li>
          <li>
              {this.props.authedUser}
          </li>
          <li>
            <NavLink to='/' exact activeClassName='active'>
            {this.props.authedUser === null ? 'Log In' : 'Log Out'}
            </NavLink>
          </li>
        </ul>
      </nav>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser : authedUser
    ? authedUser
    : null 
  }
}

export default connect(mapStateToProps)(Nav)
