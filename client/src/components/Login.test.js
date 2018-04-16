import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import Login from './Login'
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
import { Redirect  } from 'react-router-dom'

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });


describe('<Login />', () => {

  it('should redirect if token is not undefined ', () => {
    localStorage.token = 'wkwkww'
    const wrapper = shallow(<Login />)
    expect(wrapper.contains(
     <Redirect to="/" />
      )).toBe(true)
  })

  it('should render login form if token is undefined ', () => {
    delete localStorage.token
    const wrapper = shallow(<Login />)
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
    const wrapper = shallow(<Login />)
    expect(wrapper.state().email).toBe('')
    expect(wrapper.state().password).toBe('')
    expect(wrapper.state().error.status).toBe(false)
    expect(wrapper.state().error.message).toBe('')
  })

  it('should change state when type in input tag', () => {

    const wrapper = shallow(<Login  />)
    const email = wrapper.find('input').first().simulate('change', { target: { name: 'email', value: 'email' } })
    expect(wrapper.state().email).toBe('email')
    const password = wrapper.find('input').last().simulate('change', { target: { name: 'password', value: 'password' } })
    expect(wrapper.state().password).toBe('password')
  })

  it('validate form should return true if email and password is not null', () => {
    const wrapper = shallow(<Login  />)
    const email = wrapper.find('input').first().simulate('change', { target: { name: 'email', value: 'email' } })
    expect(wrapper.state().email).toBe('email')
    const password = wrapper.find('input').last().simulate('change', { target: { name: 'password', value: 'password' } })
    expect(wrapper.state().password).toBe('password')
    expect(wrapper.update().instance().validateForm()).toEqual(true)
  })

  it('validate form should return false if email or password is null', () => {
    const wrapper = shallow(<Login  />)
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
