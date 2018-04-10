import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import PasswordTable from './PasswordTable'
import PasswordThead from './PasswordThead.jsx'
import PasswordTbody from './PasswordTbody.jsx'
import { Table  } from 'react-bootstrap'

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });


describe('<PasswordTable />', () => {
  it('should render no password found if passwords props length is 0 ', () => {
    const wrapper = shallow(<PasswordTable passwords={ [] } />)
    expect(wrapper.containsMatchingElement(
      <div className="centered"> <h3> No Passwords Found </h3> </div>)).toBe(true)
  })

  it('should render <Table /> if has passwords ', () => {
      const passwords = [{
        _id: 'asdasdasd',
        username: 'haidar',
        password: 'hallooe',
        url: 'hasdasdsad'
      }]
    const wrapper = shallow(<PasswordTable passwords={ passwords } />)
    expect(wrapper.contains(
      <Table responsive striped bordered condensed hover >
      <PasswordThead /> 
      <PasswordTbody passwords={passwords} />
      </Table>)).toBe(true)
  })
})
