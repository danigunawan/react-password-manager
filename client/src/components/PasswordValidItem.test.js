import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import PasswordValidItem from './PasswordValidItem'
import { ListGroupItem, Glyphicon } from 'react-bootstrap'

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });


describe('<PasswordValidItem />', () => {

  it('should render ListGroupItem with glyph ok and message  ', () => {
    const wrapper = shallow(<PasswordValidItem validPassword={true} message="test"  />)
    expect(wrapper.contains(
      <ListGroupItem>
        <Glyphicon glyph="ok" />
           test
      </ListGroupItem>
      )).toBe(true)
  })

  it('should render ListGroupItem with glyph remove and message  ', () => {
    const wrapper = shallow(<PasswordValidItem validPassword={false} message="test"  />)
    expect(wrapper.contains(
      <ListGroupItem>
        <Glyphicon glyph="remove" />
           test
      </ListGroupItem>
      )).toBe(true)
  })
})
