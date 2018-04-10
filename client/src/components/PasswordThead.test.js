import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import PasswordThead from './PasswordThead.jsx'

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });


describe('<PasswordThead />', () => {

  it('should render <thead />  ', () => {
    const wrapper = shallow(<PasswordThead  />)
    expect(wrapper.contains(
		<thead>
		<tr>
			<th>URL</th>
			<th>Username</th>
			<th>Password</th>
			<th>CreatedAt</th>
			<th>UpdatedAt</th>
			<th>Action</th>
		</tr>
		</thead>
      )).toBe(true)
  })
})
