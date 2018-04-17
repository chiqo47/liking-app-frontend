
// const initialUsers = [
//   {"_id":"5ad46c2822977d47e3468d87","username":"mike","likeCount":0},
//   {"_id":"5ad46c2822977d47e3468d88","username":"joe","likeCount":0},
//   {"_id":"5ad46c2822977d47e3468d89","username":"jack","likeCount":0},
//   {"_id":"5ad46c2822977d47e3468d8a","username":"bob","likeCount":0}
// ]

const initialState = {
  isFetching: false,
  items: []
}

const users = (state = initialState, action) => {
  switch (action.type) {
    case 'RECIEVE_USERS':
      return Object.assign({}, state, {
        isFetching: false,
        items: action.items,
        lastUpdated: action.receivedAt
      })
    case 'LIKE_UNLIKE_SUCCESS': {

      let newItems = state.items.map(user =>
        (user._id === action.user._id)
          ? {...action.user, likeCount: action.user.likedBy.length}
          : user
        )
        // .sort((prevUser, nextUser) =>
        //   prevUser.likeCount < nextUser.likeCount)

      return Object.assign({}, state, {
        isFetching: false,
        items: newItems,
        lastUpdated: action.receivedAt
      })
    }
    default:
      return state
  }
}

export default users
