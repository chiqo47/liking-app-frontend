import React from 'react'
import { connect } from 'react-redux'
import {likeUser, unlikeUser, openLoginWindow} from '../actions'
import classNames from 'classnames'

export class UserList extends React.Component {

  onClick = (userId, currenUserLike) => {

    if (!this.props.currentUser)
      this.props.dispatch(openLoginWindow())
    else{

      if (currenUserLike)
        this.props.dispatch(unlikeUser(userId))
      else
        this.props.dispatch(likeUser(userId))
    }
  }

  render() {
    return (
      <div>
        <h3>Users</h3>

        <ul>
          {this.props.users.map(user => {
              let numOfLikes = (user.likedBy && user.likedBy.length) || 0

              let currenUserLike = user.likedBy && this.props.currentUser &&
                user.likedBy.includes(this.props.currentUser['_id'])

              let classes = classNames({
                liked: currenUserLike
              })

              let userId = user['_id']

              return <li className={classes}
                key={userId}
                onClick={() => this.onClick(userId, currenUserLike)}
                >
                  {user.username} {`(Total likes: ${numOfLikes})`}
              </li>
            }
          )}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    users: state.users.items,
    currentUser: state.auth.user
  }
}

export default connect(mapStateToProps)(UserList)
