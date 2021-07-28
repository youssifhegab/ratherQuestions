import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, FormGroup, Button, Input } from 'reactstrap'
import { setAuthedUser } from '../actions/autheduser'
import { Redirect } from 'react-router-dom'

class Login extends Component {
  state = {
    user : this.props.authedUser ? this.props.authedUser : '',
    userAlreadyLog : false,
    toHome : false
  }
  handleSelectProfile = (e) => {
    const user = e.target.value
    this.setState(() => ({
      user
    }))
  }
  handleSubmit = (e) => {
    const user = this.state.user
    const { dispatch } = this.props
    dispatch(setAuthedUser(user))
    this.setState(() => ({
      userAlreadyLog : true,
      toHome : true,
    }))
  }
  render () {
    if (this.state.toHome === true) {
      return <Redirect to='/dashboard'/>
    }
    return (
      <div className='center'>
        <h3>Choose your profile : </h3>
        <Form >
          <FormGroup>
            <Input type="select" value = {this.state.user} onChange={this.handleSelectProfile}>
            <option value="" >Select your profile</option> 
              {Object.keys(this.props.users).map((user) => (
                <option key = {this.props.users[user].id} value = {this.props.users[user].id}>
                  {this.props.users[user].id}
                </option>
              ))}
            </Input>
          </FormGroup>
            <Button
              className='btn'
              disabled={this.state.user === ''}
              onClick={this.handleSubmit}>
                Log in
            </Button>
        </Form>
      </div>
    )
  }
}



const mapStateToProps =  ({users, authedUser})=> {
  return {
    users,
    authedUser : authedUser 
    ? authedUser
    : null,
  }
}

export default connect(mapStateToProps)(Login)