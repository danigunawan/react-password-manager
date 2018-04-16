import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import { Logout } from './Logout.jsx'

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });


describe('<Logout />', () => {

  it('should render logout button  ', () => {
    const wrapper = shallow(<Logout  />)
    expect(wrapper.containsAllMatchingElements([
    <li><a  >Logout </a></li>
    ]
      )).toBe(true)
  })

  it('should return true if click logout ', () => {
    const history = { push: () => true }
    const wrapper = shallow(<Logout history={ history }  />)
    expect(wrapper.containsAllMatchingElements([
    <li><a  >Logout </a></li>
    ]
      )).toBe(true)
      wrapper.find('a').simulate('click')
  })
})
