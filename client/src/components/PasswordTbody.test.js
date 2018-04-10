import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import PasswordTbody from './PasswordTbody.jsx'
import PasswordItem from './PasswordItem'

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });


describe('<PasswordTbody />', () => {

  it('should render <PasswordItem /> inside tbody  ', () => {
      const passwords = [{
        _id: 'asdasdasd',
        username: 'haidar',
        password: 'hallooe',
        url: 'hasdasdsad'
      }]
    const wrapper = shallow(<PasswordTbody passwords={ passwords } />)
    expect(wrapper.contains(
      <tbody><PasswordItem passwords={passwords} /></tbody>
      )).toBe(true)
  })
})
