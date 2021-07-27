import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'
import { Link, withRouter } from 'react-router-dom'

class Question extends Component {
  render() {
    const { question, users, answer } = this.props
    const { author, timestamp, id } = question
    const { name, avatarURL } = users[author]
    return (
      <Link to={`/question/${id}`} className='question'>
        <img
          src={require(`../utils/avatars/${avatarURL}`)}
          alt={`Avatar of ${author}`}
          className='avatar'
        />
        <div className='question-info'>
          <div>
            <span>{`${name} asks :`}</span>
            <div>{formatDate(timestamp)}</div>
            {answer !== null ? <p>{`You prefers: ${answer}`}</p> : <p>Click to answer</p>}
          </div>
        </div>
      </Link>
    )
  }
}

function mapStateToProps ({authedUser, users, questions}, { qid }) {
  const question = questions[qid]

  return {
    question,
    users,
    answer : users[authedUser].answers[qid]
    ? question[users[authedUser].answers[qid]].text
    : null,
  }
}

export default withRouter(connect(mapStateToProps)(Question))
