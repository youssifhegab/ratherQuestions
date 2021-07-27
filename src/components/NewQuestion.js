import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import { formatQuestion } from '../utils/_DATA'
import { handleAddQuestion } from '../actions/shared'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    toHome: false,
  }
  handleOptionOne = (e) => {
    const optionOne = e.target.value
    this.setState(() => ({
      optionOne
    }))
  }
  handleOptionTwo = (e) => {
    const optionTwo = e.target.value
    this.setState(() => ({
      optionTwo
    }))
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const { optionOne, optionTwo } = this.state
    const { dispatch, authedUser } = this.props
    const question = formatQuestion({ optionOneText : optionOne, optionTwoText : optionTwo, author : authedUser})
    dispatch(handleAddQuestion(question))
    this.setState(() => ({
      toHome : true,
    }))
  }
  render() {
    const { optionOne, optionTwo, toHome } = this.state
    const questionLeftOne = 280 - optionOne.length
    const questionLeftTwo = 280 - optionTwo.length

    if (toHome === true) {
      return <Redirect to='/dashboard'/>
    }

    return (
      <div className='center'>
        <h3>Ask a new question</h3>
        <form className='new-question'>
          <div className='row'>
            <div className='column'>
              <textarea
                placeholder="Would you rather ?"
                value={optionOne}
                onChange={this.handleOptionOne}
                className='textarea'
                maxLength={280}
              />
              {questionLeftOne <= 100 && (
              <div className='question-length'>
                {questionLeftOne}
              </div>
              )}
            </div>
            <div className='column'>
              <textarea
                placeholder="Or ?"
                value={optionTwo}
                onChange={this.handleOptionTwo}
                className='textarea'
                maxLength={280}
              />
              {questionLeftTwo <= 100 && (
              <div className='question-length'>
                {questionLeftTwo}
              </div>
              )}
            </div>
          </div>
          <Button
            className='btn'
            disabled={optionOne === '' || optionTwo === ''}
            onClick={this.handleSubmit}>
              Submit
          </Button>
        </form>
      </div>
    )
  }
}

function mapStateToProps ({authedUser}) {

  return {
    authedUser,
  }
}


export default connect(mapStateToProps)(NewQuestion)