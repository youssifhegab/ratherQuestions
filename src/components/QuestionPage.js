import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { formatDate } from '../utils/helpers'
import { handleResponse } from '../actions/shared'


class QuestionPage extends Component {
  state = {
    selectedOption: '',
    showResult: this.props.alreadyAnswer,
  }
  optionSelected = (e) => {
    this.setState({
      selectedOption: e.target.id
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const { dispatch, question, authedUser } = this.props
    const answer = this.state.selectedOption

    this.setState({
      showResult: true,
      selectedOption: '',
    })
    dispatch(handleResponse({
      authedUser,
      qid : question.id,
      answer,
    }))
  }
  render () {
    const { question, user, alreadyAnswer, alreadyAnswerChoice} = this.props
    
    if (question === null) {
      return (<p className = 'center'>Error 404 : This Question doesn't exist ! Why not created it ?</p>)
    }
    const { author, timestamp } = question
    const { name, avatarURL } = user
    const totalAnswer = question.optionOne.votes.length + question.optionTwo.votes.length
    const ratioAnswer = 100 * question.optionOne.votes.length / totalAnswer
    
    return (
      <div>
        <h2 className='center'> Would You Rather ? </h2>
        <div className='question'>
          <img
            src={avatarURL}
            alt={`Avatar of ${author}`}
            className='avatar'
          />
          <div>
            <div className='question-info'>
                <span>{`${name} asks :`}</span>
                <div>{formatDate(timestamp)}</div>
            </div>
            <div className='question-choice'>
            <FormGroup>
              <FormGroup check>
                <Label check onChange={this.optionSelected} >
                  <Input type="radio" id="optionOne" name="answer" disabled = {alreadyAnswer}/>
                    {question.optionOne.text}
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check onChange={this.optionSelected} >
                  <Input type="radio" id="optionTwo" name="answer" disabled = {alreadyAnswer}/>
                    {question.optionTwo.text}
                </Label>
              </FormGroup>
            </FormGroup>
            <Button className='btn' disabled = {this.state.selectedOption === '' } onClick={this.handleSubmit}>
              Submit
            </Button>
            </div>
          </div>
        </div>
        {this.state.showResult === true
          ?
          <div className='center'> 
            <h4> Other's Response </h4>
            <div className='answer'>
              <div className='row'>
                <div className = 'column'>
                  <div className='score'>{`${ratioAnswer}%`}</div>
                  <div>{`${question.optionOne.text}`}</div>
                  {alreadyAnswerChoice === 'optionOne' &&  <p className = 'choice' >your choice</p>}
                </div>
                <div className = 'column'>
                  <div className='score'>{`${100 - ratioAnswer}%`}</div>
                  <div>{`${question.optionTwo.text}`}</div>
                  {alreadyAnswerChoice === 'optionTwo' && <p className = 'choice' >Your choice</p>}
                </div>
              </div>
              <div>{`Total Answer : ${totalAnswer}`}</div>
            </div>
          </div>
          : null
          }
      </div>
    )
  }
}

function mapStateToProps ({authedUser, users, questions}, props) {
  const { id } = props.match.params
  const alreadyAnswer = Object.keys(users[authedUser].answers).includes(id)
  let alreadyAnswerChoice = null

  if (alreadyAnswer && questions[id].optionOne.votes.includes(authedUser)) {
    alreadyAnswerChoice = 'optionOne'
  }
  else if (alreadyAnswer && questions[id].optionTwo.votes.includes(authedUser)){
    alreadyAnswerChoice = 'optionTwo'
  }

  return {
    question: questions[id]
    ? questions[id]
    : null,
    user : questions[id]
    ? users[questions[id].author]
    : null,
    authedUser,
    alreadyAnswer : alreadyAnswer,
    alreadyAnswerChoice : alreadyAnswerChoice
  }
}

export default connect(mapStateToProps)(QuestionPage)