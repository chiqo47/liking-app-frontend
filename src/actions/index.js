import {checkFetchStatus} from '../helpers'

export const usersLoaded = (items) => ({
  type: 'USERS_LOADED',
  items
})

export const requestUsers = () => ({
    type: 'REQUEST_USERS'
})

export const recieveUsers = (users) => ({
    type: 'RECIEVE_USERS',
    items: users,
    receivedAt: Date.now()
})


export const openLoginWindow = () => ({
  type: 'OPEN_LOGIN_WINDOW'
})
export const openSignupWindow = () => ({
  type: 'OPEN_SIGNUP_WINDOW'
})
export const closeLoginWindow = () => ({
  type: 'CLOSE_LOGIN_WINDOW'
})
export const closeSignupWindow = () => ({
  type: 'CLOSE_SIGNUP_WINDOW'
})

export const logout = () => {
  localStorage.removeItem('jwt')
  return {
    type: 'LOGOUT'
  }
}

export const loginSuccess = ({user, jwt}) => ({
  type: 'LOGIN_SUCCESS',
  user,
  jwt
})

export const signupSuccess = (user) => ({
  type: 'SIGNUP_SUCCESS',
  user
})

export const likeUnlikeSuccess = (user) => ({
  type: 'LIKE_UNLIKE_SUCCESS',
  user
})

export const authCheckSuccess = ({user}) => ({
  type: 'AUTH_CHECK_SUCCESS',
  user
})

export const loginFailure = (code) => ({
  type: 'LOGIN_FAILURE',
})

export function login(username, password) {

  return function (dispatch) {
    //dispatch(requestLogin())
    var payload = JSON.stringify({username, password})

    return fetch(`http://localhost:3000/login`, {
      method: "post",
      body: payload,
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(checkFetchStatus)
    .then(response => response.json())
    .then((loginResponse) =>{
      localStorage.setItem('jwt', loginResponse.jwt)
      dispatch(loginSuccess(loginResponse))
    })
    .catch(code =>
      dispatch(loginFailure(code)))
  }
}

export function signup(username, password) {

  return function (dispatch) {
    var payload = JSON.stringify({username, password})

    return fetch(`http://localhost:3000/signup`, {
      method: "post",
      body: payload,
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(checkFetchStatus)
    .then(response => response.json())
    .then((signupResponse) =>{
      dispatch(signupSuccess(signupResponse))
      dispatch(fetchUsers())
    })
    .catch(code => {
      // dispatch(signupFailure(code))
    })
  }
}

export function fetchUsers() {
  return function (dispatch) {
    dispatch(requestUsers())

    return fetch(`http://localhost:3000/most-liked`)
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(users => dispatch(recieveUsers(users)))
      .catch(e => {})
  }
}

export function likeUser(_id) {

  return function (dispatch) {

    let jwt = localStorage.getItem('jwt')


    return fetch(`http://localhost:3000/user/${_id}/like`, {
      method: "post",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': jwt,
      }
    })
      .then(checkFetchStatus)
      .then(response => response.json())
      .then((data) =>{
        console.log(data)
        dispatch(likeUnlikeSuccess(data))
      })
      .catch(e => {})

  }
}

export function unlikeUser(_id) {

  return function (dispatch) {

    let jwt = localStorage.getItem('jwt')

    return fetch(`http://localhost:3000/user/${_id}/unlike`, {
      method: "post",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': jwt,
      }
    })
      .then(checkFetchStatus)
      .then(response => response.json())
      .then((data) =>{
        console.log(data)
        dispatch(likeUnlikeSuccess(data))
      })
      .catch(e => {})

  }
}

export function authCheck () {
  return function (dispatch) {
    let jwt = window.localStorage && window.localStorage.getItem('jwt')

    if (jwt){
      fetch('http://localhost:3000/me', {
         method: 'get',
         headers: new Headers({
           'Authorization': jwt,
         })

       })
         .then(checkFetchStatus)
         .then(response => response.json())
         .then(user => {
           console.log(user)
           dispatch(authCheckSuccess({user}))
         })
         .catch(e => {
           dispatch(logout())
         })
    }
  }
}
