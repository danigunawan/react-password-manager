import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import Alert from './AlertPanel'
import PasswordTable from './PasswordTable'
import { Link, Redirect } from 'react-router-dom'
import { RingLoader } from 'react-spinners'
import PasswordSearch from './PasswordSearch'


import {PasswordList, mapStateToProps} from './PasswordList'

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });


describe('<PasswordList />', () => {

  
  it('should contain <PasswordTable/> , <PasswordSearch/>, <Alert /> ', () => {
      const password = {
        passwords: [{
        _id: 'asdasdasd',
        username: 'haidar',
        password: 'hallo',
        url: 'facebook',
        show: false
        }],
        loading: false,
        error: { status: false, message: '' },
        isSearch: false,
        searchPassword: []
      }
    const wrapper = shallow(<PasswordList password={password} fetchPassword={() => {}}  />)
    expect(wrapper.containsAllMatchingElements([
      <PasswordTable />, <PasswordSearch />, <Alert />
    ]))
  })
  it('should render <RingLoader /> if loading is true ', () => {
      const password = {
        passwords: [{
        _id: 'asdasdasd',
        username: 'haidar',
        password: 'hallo',
        url: 'facebook',
        show: false
        }],
        loading: true,
        error: { status: false, message: '' },
        isSearch: false,
        searchPassword: []
      }
    const wrapper = shallow(<PasswordList password={password} fetchPassword={() => {}}  />)
    expect(wrapper.containsAllMatchingElements([
      <RingLoader/>
    ]))
  })

  it('should change value of passwords props if searchPassword is not null ', () => {
      const password = {
        passwords: [{
        _id: 'asdasdasd',
        username: 'haidar',
        password: 'hallo',
        url: 'facebook',
        show: false
        }],
        loading: true,
        error: { status: false, message: '' },
        isSearch: true,
        searchPassword: [{
        _id: 'asdasdasd',
        username: 'afif',
        password: 'hallo',
        url: 'facebook',
        show: false
        }],

      }
    const wrapper = shallow(<PasswordList password={password} fetchPassword={() => {}}  />)
    expect(wrapper.instance().props.password.isSearch).toBe(true)

  })
  it('should have password property on mapStateToProps', () => {

    const state = { password: true }
    const result = mapStateToProps(state)
    expect(result).toHaveProperty('password', true)

  })

})
