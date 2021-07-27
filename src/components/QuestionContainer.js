import React from 'react'
import Question from './Question'

const QuestionsContainer = (props) => {
  return (
    <div className="column">
      <h4 className = 'center'>{props.title}</h4> 
    <ul className='home-list'>
      {props.listQuestion.map((qid) => (
        <li key = {qid}>
          <Question qid = {qid}/>
        </li>
      ))}
    </ul>
  </div>
  )
}


export default QuestionsContainer