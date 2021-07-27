import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionsContainer from './QuestionsContainer'

class Dashboard extends Component {
  render() {
    const {remaningQuestions, answeredQuestions } = this.props
    return (
      <div>
        <h2 className='center'> Would You Rather ? </h2>
        <div className='row'> 
          <QuestionsContainer 
            listQuestion = {remaningQuestions}
            title = {'Remaining Question'}
          />
          <QuestionsContainer 
            listQuestion = {answeredQuestions}
            title = {'Answered Question'}
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps ({authedUser, users, questions}) {
  const user = users[authedUser] 
  const answeredQuestions = Object.keys(user.answers)

  return {
    remaningQuestions: Object.keys(questions).filter(qid => !answeredQuestions.includes(qid))
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    answeredQuestions : answeredQuestions
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    user
  }
}

export default connect(mapStateToProps)(Dashboard)