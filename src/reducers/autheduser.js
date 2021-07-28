import { SET_AUTHED_ID, RESET_AUTHED_ID } from '../actions/autheduser'

export default function authedUser (state = null, action) {
  switch(action.type) {
    case SET_AUTHED_ID : 
      return action.id
    case RESET_AUTHED_ID :
      return null;
    default : 
      return state
  }
}