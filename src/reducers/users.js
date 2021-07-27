import { RECEIVE_USERS, SAVE_USER_RESPONSE, SAVE_USER_QUESTION } from '../actions/users'

export default function users (state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS : 
      return {
        ...state,
        ...action.users,
      }
    case SAVE_USER_RESPONSE :
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: {
            ...state[action.authedUser].answers,
            [action.qid]: action.answer
          }
        }
      }
    case SAVE_USER_QUESTION :
      return {
        ...state,
        [action.author]: {
          ...state[action.author],
          questions: state[action.author].questions.concat([action.id])
        }
      }
    default : 
      return state
  }
}