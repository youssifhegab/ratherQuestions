import { AUTHED_ID, UNSET_AUTHED_ID } from '../actions/autheduser'

export default function authedUser (state = null, action) {
  switch(action.type) {
    case AUTHED_ID : 
      return action.id
    case UNSET_AUTHED_ID :
      return null;
    default : 
      return state
  }
}