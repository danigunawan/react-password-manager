import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import Navbar from './Navbar.jsx'
import { Link } from 'react-router-dom'
import Logout from './Logout'

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });


describe('<Navbar />', () => {

  it('should render navbar with logout button  ', () => {
    const wrapper = shallow(<Navbar  />)
    expect(wrapper.contains(
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="/">React Password Manager</a>
        </div>
        <ul className="nav navbar-nav">
          <li><Link to="/">Home </Link></li>
          <Logout />
        </ul>
      </div>
    </nav>
      )).toBe(true)
  })
})
