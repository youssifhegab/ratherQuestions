import { getInitialData, saveQuestionAnswer, saveQuestion } from '../utils/api'
import { receiveUsers, addResponseUser, saveUserQuestion } from './users'
import { receiveQuestions, addResponse, addQuestion } from './questions'
import { showLoading, hideLoading } from 'react-redux-loading'


export const handleInitialData = ()=> {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({users, questions}) => {
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        dispatch(hideLoading())
      })
  }
}

export const handleResponse = (info)=> {
  return (dispatch) => {

    dispatch(addResponse(info))
    dispatch(addResponseUser(info))

    return saveQuestionAnswer(info)
      .catch((e) => {
        console.warn('Error in addResponse:', e)
        dispatch(addResponse(info))
        dispatch(addResponseUser(info))
        alert('The was an error replying, please try again.')
      })
  }
}


export const handleAddQuestion = (question)=> {
  return (dispatch) => {

    dispatch(addQuestion(question))
    dispatch(saveUserQuestion(question))

    return saveQuestion(question)
      .catch((e) => {
        console.warn('Error in addQuestion:', e)
        dispatch(addQuestion(question))
        dispatch(saveUserQuestion(question))
        alert('The was an error uploading the question, please try again.')
      })
  }
}