export const AUTHED_ID = 'AUTHED_ID'
export const UNSET_AUTHED_ID = 'UNSET_AUTHED_ID'


export const AuthedUser =  (id)=> {
  return {
    type: AUTHED_ID,
    id,
  }
}

export const unSetAuthedUser = (id)=> {
  return {
    type: UNSET_AUTHED_ID,
    id,
  }
}