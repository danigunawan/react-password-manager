import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import { 
  Button, 
  Grid, 
  Col, 
  Row, 
  FormControl, 
  FormGroup, 
  ControlLabel,
	Breadcrumb
} from 'react-bootstrap';
import Alert from './AlertPanel'
import axios from '../axios'
import CreatePassword from './CreatePassword'
import { Link, Redirect } from 'react-router-dom'
import isUrl from 'is-url'
import passwordValidator from 'password-validator'
import PasswordValidList from './PasswordValidList'

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });


describe('<CreatePassword />', () => {

  it('should redirect if token is  undefined ', () => {
    delete localStorage.token
    const wrapper = shallow(<CreatePassword />)
    expect(wrapper.contains(
      <Redirect to="/login" />
      )).toBe(true)
  })

  it('should render create password form if token is not undefined ', () => {
    localStorage.token = 'faketoken'
    const wrapper = shallow(<CreatePassword />)
    expect(wrapper.containsMatchingElement(
    [ 
      <input 
        type="text"
        name="url"
        placeholder="Enter URL"
      />,
      <input 
        type="password"
        name="password"
        placeholder="Enter Password"
      />,
      <input 
        type="text"
        name="username"
        placeholder="Enter Username"
      />,
      <button className="btn btn-default" type="button"> Save Password </button>,
      <PasswordValidList />
]
  )).toBe(true)
})

  it('should have initial state', () => {
    const wrapper = shallow(<CreatePassword />)
    expect(wrapper.state().username).toBe('')
    expect(wrapper.state().password).toBe('')
    expect(wrapper.state().url).toBe('')
    expect(wrapper.state().error.status).toBe(false)
    expect(wrapper.state().error.message).toBe('')
  })

  it('should change state when type in input tag', () => {

    const wrapper = shallow(<CreatePassword  />)
     wrapper.find('input').first().simulate('change', { target: { name: 'url', value: 'url' } })
    expect(wrapper.state().url).toBe('url')
     wrapper.find('input').at(1).simulate('change', { target: { name: 'username', value: 'username' } })
    expect(wrapper.state().username).toBe('username')
    wrapper.find('input').last().simulate('change', { target: { name: 'password', value: 'password' } })
    expect(wrapper.state().password).toBe('password')
  })

  it('should validate url string', () => {
    const wrapper = shallow(<CreatePassword  />)
    expect(wrapper.instance().validateURL('http://localhost')).toBe(true)
    expect(wrapper.instance().validateURL('localhost')).toBe(false)
    expect(wrapper.update().state().error.status).toBe(true)
    expect(wrapper.update().state().error.message).toEqual('URL is not valid')
  })

  it('should validate password string', () => {
    const wrapper = shallow(<CreatePassword  />)
    wrapper.instance().validatePassword('raha')
    expect(wrapper.update().state().passwordPass).toBe(false)
    wrapper.instance().validatePassword('rahasia')
    expect(wrapper.update().state().passwordPass).toBe(false)
    wrapper.instance().validatePassword('Rahasia')
    expect(wrapper.update().state().passwordPass).toBe(false)
    wrapper.instance().validatePassword('rahasia1')
    expect(wrapper.update().state().passwordPass).toBe(false)
    wrapper.instance().validatePassword('!Rahasia2')
    expect(wrapper.update().state().passwordPass).toBe(true)
  })

  it('should validate form to be true', () => {
    const wrapper = shallow(<CreatePassword  />)
     wrapper.find('input').first().simulate('change', { target: { name: 'url', value: 'http://localhost' } })
    expect(wrapper.state().url).toBe('http://localhost')
     wrapper.find('input').at(1).simulate('change', { target: { name: 'username', value: 'username' } })
    expect(wrapper.state().username).toBe('username')
    wrapper.find('input').last().simulate('change', { target: { name: 'password', value: '!Rahasia2' } })
    expect(wrapper.state().password).toBe('!Rahasia2')
    wrapper.update().instance().validatePassword('!Rahasia2')
    expect(wrapper.update().instance().validateForm()).toBe(true)
  })

  it('should validate form to Username is Required', () => {
    const wrapper = shallow(<CreatePassword  />)
     wrapper.find('input').first().simulate('change', { target: { name: 'url', value: 'http://localhost' } })
    expect(wrapper.state().url).toBe('http://localhost')
    wrapper.find('input').last().simulate('change', { target: { name: 'password', value: '!Rahasia2' } })
    expect(wrapper.state().password).toBe('!Rahasia2')
    wrapper.update().instance().validatePassword('!Rahasia2')
    expect(wrapper.update().instance().validateForm()).toBe(false)
    expect(wrapper.update().state().error.status).toBe(true)
    expect(wrapper.update().state().error.message).toEqual('Username is required')
  })

  it('should validate form to Password is Required', () => {
    const wrapper = shallow(<CreatePassword  />)
     wrapper.find('input').first().simulate('change', { target: { name: 'url', value: 'http://localhost' } })
    expect(wrapper.state().url).toBe('http://localhost')
     wrapper.find('input').at(1).simulate('change', { target: { name: 'username', value: 'username' } })
    expect(wrapper.state().username).toBe('username')
    expect(wrapper.update().instance().validateForm()).toBe(false)
    expect(wrapper.update().state().error.status).toBe(true)
    expect(wrapper.update().state().error.message).toEqual('Password is required')
  })

  it('should validate form to URL is Required', () => {
    const wrapper = shallow(<CreatePassword  />)
     wrapper.find('input').at(1).simulate('change', { target: { name: 'username', value: 'username' } })
    expect(wrapper.state().username).toBe('username')
    wrapper.find('input').last().simulate('change', { target: { name: 'password', value: '!Rahasia2' } })
    expect(wrapper.state().password).toBe('!Rahasia2')
    wrapper.update().instance().validatePassword('!Rahasia2')
    expect(wrapper.update().instance().validateForm()).toBe(false)
    expect(wrapper.update().state().error.status).toBe(true)
    expect(wrapper.update().state().error.message).toEqual('URL is required')
  })

  it('should validate password is streng or not Strength', () => {
    const wrapper = shallow(<CreatePassword  />)
     wrapper.find('input').first().simulate('change', { target: { name: 'url', value: 'http://localhost' } })
    expect(wrapper.state().url).toBe('http://localhost')
     wrapper.find('input').at(1).simulate('change', { target: { name: 'username', value: 'username' } })
    expect(wrapper.state().username).toBe('username')
    wrapper.find('input').last().simulate('change', { target: { name: 'password', value: '!Rahasia2' } })
    expect(wrapper.state().password).toBe('!Rahasia2')
    wrapper.update().instance().validatePassword('!Rahasia2')
    expect(wrapper.update().instance().validateForm()).toBe(true)

    wrapper.find('input').last().simulate('change', { target: { name: 'password', value: 'rahasia' } })
    expect(wrapper.state().password).toBe('rahasia')
    wrapper.update().instance().validatePassword('rahasia')
    expect(wrapper.update().instance().validateForm()).toBe(false)
    expect(wrapper.update().state().error.message).toEqual('Password Not Strength')
    
  })
  
  

})
