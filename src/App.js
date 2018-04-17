import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducers'
import { fetchUsers, authCheck } from './actions'

import UserList from './components/UserList'
import Header from './components/Header'
import LoginWindow from './components/LoginWindow'
import SignupWindow from './components/SignupWindow'


const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware // lets us dispatch() functions
  )
)

window.store = store

class App extends Component {

  render() {

    let {loginWindowOpen} = store.getState().auth
    console.log(loginWindowOpen)
    return (
      <Provider store={store}>
        <div className="app">
          <Header/>
          <UserList/>

          <LoginWindow />
          <SignupWindow />

        </div>
      </Provider>
    )
  }
}

store
  .dispatch(authCheck())

store
  .dispatch(fetchUsers())
  // .then(() => console.log(store.getState()))

export default App
