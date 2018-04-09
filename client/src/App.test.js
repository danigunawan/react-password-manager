import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import Navbar from './components/Navbar'
import { Switch } from 'react-router-dom'

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });


describe('<App />', () => {
  it('should render Navbar', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.contains(<Navbar />)).toBe(true)
  })

})
