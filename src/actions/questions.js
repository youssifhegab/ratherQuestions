import { saveQuestion} from '../utils/api'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_RESPONSE = 'ADD_RESPONSE'
export const ADD_QUESTION = 'ADD_QUESTION'

export const receiveQuestions = (questions)=> {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

export const addResponse = ({authedUser, qid, answer})=> {
  return {
    type: ADD_RESPONSE,
    authedUser,
    qid,
    answer,
  }
}

export const addQuestion = (question)=> {
  return {
    type: ADD_QUESTION,
    question,
  }
}

// Add New Question Async Action Creator Function (uses the Thunk middleware)
export function handleAddNewQuestion(optionOneText, optionTwoText, author) {
	return (dispatch) => {
		

		return saveQuestion({ optionOneText, optionTwoText, author})
				.then((question) => dispatch(addQuestion(question)))
				
	}
}