import React from 'react'
import { shallow, mount, render, configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json'
import {UserList} from './UserList'

import renderer from 'react-test-renderer'

configure({ adapter: new Adapter() })

describe('<UserList />', function() {
  it('should render as many list items as there are users', function() {
    let user = null
    let users = [
      {_id: "1", username: "user1"},
      {_id: "2", username: "user2"},
      {_id: "3", username: "user3"}
    ]

    let demoUserList = <UserList currentUser={user} users={users}/>

    expect(mount(demoUserList).find('li').length).toBe(users.length)
  })

  it('should not render any <li> with .like class', function() {

    let users = [
      {_id: "1", username: "user1"},
      {_id: "2", username: "user2"},
      {_id: "3", username: "user3"}
    ]

    let demoUserList = <UserList currentUser={null} users={users}/>

    expect(shallow(demoUserList).find('li.liked').length).toBe(0)
  })
})
