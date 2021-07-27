import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table } from 'reactstrap'

class LeaderBoard extends Component {
  render() {
    return (
      <Table>
        <thead>
          <tr>
            <th className = 'score-center-titre'>Users</th>
            <th className = 'score-center-titre'>Question Ask</th>
            <th className = 'score-center-titre'>Question Answer</th>
            <th className = 'score-center-titre'>Total Score</th>
          </tr>
        </thead>
        <tbody>
        {this.props.listUser.map((user) => {
          const { id, name, avatarURL, answers, questions } = this.props.users[user]
          const numberOfResponse = Object.keys(answers).length
          const numberOfQuestionAsk = questions.length
          return (
            <tr key={id} className='leader-row'>
              <td>
                <div className = 'row'>        
                  <img
                    src={require(`../utils/avatars/${avatarURL}`)}
                    alt={`Avatar of ${id}`}
                    className='avatar'
                  />
                  <p>{name}</p>
                </div>  
              </td>
                <td className = 'score-center'>{numberOfQuestionAsk}</td>
                <td className = 'score-center'>{numberOfResponse}</td>
                <td className = 'score-center'>{numberOfResponse + numberOfQuestionAsk}</td>
            </tr>
          )})}
        </tbody>
      </Table>
    )
  }
}

function mapStateToProps ({users}) {
  
  return {
    users,
    listUser: Object.keys(users)
      .sort((a, b) => ((users[b].questions.length + Object.keys(users[b].answers).length) 
      - (users[a].questions.length + Object.keys(users[a].answers).length)))
  }
}

export default connect(mapStateToProps)(LeaderBoard)