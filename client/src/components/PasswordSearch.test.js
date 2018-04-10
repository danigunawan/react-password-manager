import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import { PasswordSearch } from './PasswordSearch'

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });


describe('<PasswordSearch />', () => {
  it('should render input search ', () => {
    const wrapper = shallow(<PasswordSearch />)
    expect(wrapper.containsMatchingElement(
      <input type="text" className="form-control" name="query" placeholder="Search URL"/>)).toBe(true)
  })
  it('should have query state with string kosong', () => {
    const wrapper = shallow(<PasswordSearch />)
    expect(wrapper.state().query).toBe('')
  })

  it('should change state when type in input tag', () => {

    const wrapper = shallow(<PasswordSearch searchPassword={ () => {} } />)
    const input = wrapper.find('input').first().simulate('change', { target: { name: 'query', value: 'a' } })
    expect(wrapper.state().query).toBe('a')
  })
})
