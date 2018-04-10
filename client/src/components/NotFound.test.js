import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import NotFound from './NotFound.jsx'
import { Link } from 'react-router-dom'

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });


describe('<NotFound />', () => {

  it('should render not found page  ', () => {
    const wrapper = shallow(<NotFound  />)
    expect(wrapper.contains(
    <div className="centered">
      <h2>Not Found.  What are you looking for ? </h2> 
      <h4> <Link to="/" className="text-center" > Back To Home </Link></h4>
    </div>
      )).toBe(true)
  })
})
