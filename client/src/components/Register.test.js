import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import Register from './Register'
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


describe('<Register />', () => {

  it('should redirect if token is not undefined ', () => {
    localStorage.token = 'wkwkww'
    const wrapper = shallow(<Register />)
    expect(wrapper.contains(
     <Redirect to="/" />
      )).toBe(true)
  })

  it('should render register form if token is undefined ', () => {
    delete localStorage.token
    const wrapper = shallow(<Register />)
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
      <button className="btn btn-default" type="button"  > Register </button>
]
  )).toBe(true)
})

  it('should have initial state', () => {
    const wrapper = shallow(<Register />)
    expect(wrapper.state().email).toBe('')
    expect(wrapper.state().password).toBe('')
    expect(wrapper.state().name).toBe('')
    expect(wrapper.state().error.status).toBe(false)
    expect(wrapper.state().error.message).toBe('')
  })

  it('should change state when type in input tag', () => {

    const wrapper = shallow(<Register  />)
    wrapper.find('input').first().simulate('change', { target: { name: 'email', value: 'email' } })
    expect(wrapper.state().email).toBe('email')

    wrapper.find('input').at(1).simulate('change', { target: { name: 'name', value: 'name' } })
    expect(wrapper.state().name).toBe('name')
    wrapper.find('input').last().simulate('change', { target: { name: 'password', value: 'password' } })
    expect(wrapper.state().password).toBe('password')
  })

  it('validate form should return true if email, name and password is not null', () => {
    const wrapper = shallow(<Register  />)
    wrapper.find('input').first().simulate('change', { target: { name: 'email', value: 'email' } })
    expect(wrapper.state().email).toBe('email')
    wrapper.find('input').at(1).simulate('change', { target: { name: 'name', value: 'name' } })
    expect(wrapper.state().name).toBe('name')
    wrapper.find('input').last().simulate('change', { target: { name: 'password', value: 'password' } })
    expect(wrapper.state().password).toBe('password')
    expect(wrapper.update().instance().validateForm()).toEqual(true)
  })

  it('validate form should return false if email or password or name is null', () => {
    const wrapper = shallow(<Register  />)
    // email null
    wrapper.find('input').at(1).simulate('change', { target: { name: 'name', value: 'name' } })
    expect(wrapper.state().name).toBe('name')
    wrapper.find('input').last().simulate('change', { target: { name: 'password', value: 'password' } })
    expect(wrapper.state().password).toBe('password')
    expect(wrapper.update().instance().validateForm()).toEqual(false)

    // password null
    wrapper.find('input').first().simulate('change', { target: { name: 'email', value: 'email' } })
    expect(wrapper.state().email).toBe('email')
    wrapper.find('input').at(1).simulate('change', { target: { name: 'name', value: 'name' } })
    expect(wrapper.state().name).toBe('name')
    wrapper.find('input').last().simulate('change', { target: { name: 'password', value: '' } })
    expect(wrapper.state().password).toBe('')
    expect(wrapper.update().instance().validateForm()).toEqual(false)

    // name null
    wrapper.find('input').first().simulate('change', { target: { name: 'email', value: 'email' } })
    expect(wrapper.state().email).toBe('email')
    wrapper.find('input').at(1).simulate('change', { target: { name: 'name', value: '' } })
    expect(wrapper.state().name).toBe('')
    wrapper.find('input').last().simulate('change', { target: { name: 'password', value: 'password' } })
    expect(wrapper.state().password).toBe('password')
    expect(wrapper.update().instance().validateForm()).toEqual(false)
    
  })

})
