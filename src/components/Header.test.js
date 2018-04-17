import React from 'react'
import { shallow, mount, render, configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json'
import {Header} from './Header'


import renderer from 'react-test-renderer'


configure({ adapter: new Adapter() })

describe('<Header />', function() {
  it('should display Welcome guest in the header', function() {
    let user = null
    let users = {items:[]}
    let demoHeader = <Header currentUser={user} users={users}/>
    expect(shallow(demoHeader).contains(<h3>Welcome guest</h3>)).toBe(true)
  })

  it('should display Welcome demo user', function() {
    let user = {_id: "demo", username: "demo user" }
    let users = {items:[user]}
    let demoHeader = <Header currentUser={user} users={users}/>
    expect(shallow(demoHeader).contains(<h3>Welcome demo user</h3>)).toBe(true)
  })
})
