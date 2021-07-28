import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { reSetAuthedUser } from '../actions/autheduser'

class Nav extends Component {
  logoutUser = () => {
    const { dispatch } = this.props;

    dispatch(reSetAuthedUser());
  }
  render () {
    return (
      <nav className='nav' style={{ backgroundColor: 'silver'}}>
        <ul>
          <li>
            <NavLink to='/dashboard' exact activeClassName='active' >
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
            
            <span onClick={this.logoutUser}>{this.props.authedUser === null ? '' : 'Log Out'}</span>
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
