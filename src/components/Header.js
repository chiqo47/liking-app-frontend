import React from 'react'
import { connect } from 'react-redux'
import {openLoginWindow, openSignupWindow, logout} from '../actions'

const LoginButton = ({onClick}) => <button onClick={onClick} >Login</button>
const LogoutButton = ({onClick}) => <button onClick={onClick} >Logout</button>
const SignupButton = ({onClick}) => <button onClick={onClick} >Sign up</button>

const Like = () => <span role="img">&#128077;</span>

const renderLikes = (user) => {
  return user.likedBy ?
    user.likedBy.map(uId => <Like key={uId} />)
  : null
}

export class Header extends React.Component {

  openLoginWindow = ()  => {
    this.props.dispatch(openLoginWindow())
  }
  openSignupWindow = ()  => {
    this.props.dispatch(openSignupWindow())
  }
  logout = ()  => {
    this.props.dispatch(logout())
  }

  render() {
    let {currentUser, users} = this.props

    if (currentUser && currentUser._id){

      let foundUser = users.items.find(u => u._id === currentUser._id)
      if (foundUser){

        let likes = renderLikes(foundUser)

        return <div>
          <h3>{"Welcome " + currentUser.username}</h3>
          <h4>{`You have ${foundUser.likeCount}`} like/s {likes}</h4>
          <LogoutButton onClick={this.logout} />
        </div>
      }
    }

    return <div>
      <h3>{"Welcome guest"}</h3>
      <SignupButton onClick={this.openSignupWindow} />
      <LoginButton onClick={this.openLoginWindow} />
      {this.props.loginWindowOpen && "asdf"}
    </div>
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.auth.user,
    users: state.users
  }
}

export default connect(mapStateToProps)(Header)
