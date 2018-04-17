// import users from './users'

const initialState = {
  loggedIn: false,

  loginWindowOpen: false,
  loginWindowError: null,
  signupWindowOpen: false,
  signupWindowError: null
}

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case 'OPEN_LOGIN_WINDOW':
      return {
        ...state,
        loginWindowOpen: true
        // user: action.user
      }
    case 'CLOSE_LOGIN_WINDOW':
      return {
        ...state,
        loginWindowOpen: false
        // user: action.user
      }
    case 'OPEN_SIGNUP_WINDOW':
      return {
        ...state,
        signupWindowOpen: true
      }
    case 'CLOSE_SIGNUP_WINDOW':
      return {
        ...state,
        signupWindowOpen: false
      }

    case 'LOGIN_SUCCESS':
    case 'AUTH_CHECK_SUCCESS':
      return {
        loggedIn: true,
        user: action.user
      }
    case 'SIGNUP_SUCCESS':
      return {
        loggedIn: false,
        loginWindowOpen: true
      }
    case 'LOGIN_FAILURE':
      return {
        loggedIn: false,
        loginWindowOpen: true,
      }
    case 'LOGOUT':
      return {}
    default:
      return state
  }
}
