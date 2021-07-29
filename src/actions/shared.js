import { getInitialData, saveQuestionAnswer} from '../utils/api'
import { receiveUsers, addResponseUser } from './users'
import { receiveQuestions, addResponse, handleAddNewQuestion } from './questions'
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


export function handleAddQuestion(optionOneText, optionTwoText, author) {
	return (dispatch) => {

		dispatch(showLoading())

		return dispatch(handleAddNewQuestion(optionOneText, optionTwoText, author))
			.then((question) => {
					// dispatch(addQuestion(author, question.question.id))
					dispatch(hideLoading())
				}
			)
	}
}