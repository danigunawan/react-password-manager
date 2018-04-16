import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import {ShowPassword} from './ShowPassword'
import { 
  Button, 
  Grid, 
  Col, 
  Row, 
  FormControl, 
  FormGroup, 
  ControlLabel
} from 'react-bootstrap';
import Alert from './AlertPanel'

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });


describe('<ShowPassword />', () => {

  it('should render login form if token is undefined ', () => {
    delete localStorage.token
    const wrapper = shallow(<ShowPassword />)
    expect(wrapper.containsMatchingElement(
    [ 
      <input 
        type="text"
        name="email"
        placeholder="Enter Username"
      />,
      <input 
        type="password"
        name="password"
        placeholder="Enter Password"
      />,
      <button className="btn btn-default" type="button"  > Login </button>
]
  )).toBe(true)
})

  it('should have initial state', () => {
    const wrapper = shallow(<ShowPassword />)
    expect(wrapper.state().email).toBe('')
    expect(wrapper.state().password).toBe('')
    expect(wrapper.state().error.status).toBe(false)
    expect(wrapper.state().error.message).toBe('')
  })

  it('should change state when type in input tag', () => {

    const wrapper = shallow(<ShowPassword  />)
    const email = wrapper.find('input').first().simulate('change', { target: { name: 'email', value: 'email' } })
    expect(wrapper.state().email).toBe('email')
    const password = wrapper.find('input').last().simulate('change', { target: { name: 'password', value: 'password' } })
    expect(wrapper.state().password).toBe('password')
  })

  it('validate form should return true if email and password is not null', () => {
    const wrapper = shallow(<ShowPassword  />)
    const email = wrapper.find('input').first().simulate('change', { target: { name: 'email', value: 'email' } })
    expect(wrapper.state().email).toBe('email')
    const password = wrapper.find('input').last().simulate('change', { target: { name: 'password', value: 'password' } })
    expect(wrapper.state().password).toBe('password')
    expect(wrapper.update().instance().validateForm()).toEqual(true)
  })

  it('validate form should return false if email or password is null', () => {
    const wrapper = shallow(<ShowPassword  />)
    const password = wrapper.find('input').last().simulate('change', { target: { name: 'password', value: 'password' } })
    expect(wrapper.state().password).toBe('password')
    expect(wrapper.update().instance().validateForm()).toEqual(false)

    const email = wrapper.find('input').first().simulate('change', { target: { name: 'email', value: 'email' } })
    expect(wrapper.state().email).toBe('email')
    wrapper.find('input').last().simulate('change', { target: { name: 'password', value: '' } })
    expect(wrapper.state().password).toBe('')
    expect(wrapper.update().instance().validateForm()).toEqual(false)
    
  })

})
