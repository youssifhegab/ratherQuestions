export const SET_AUTHED_ID = 'SET_AUTHED_ID'
export const RESET_AUTHED_ID = 'RESET_AUTHED_ID'


export const setAuthedUser =  (id)=> {
  return {
    type: SET_AUTHED_ID,
    id,
  }
}

export const reSetAuthedUser = (id)=> {
  return {
    type: RESET_AUTHED_ID,
    id,
  }
}