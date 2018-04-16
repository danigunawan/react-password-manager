import React from 'react';

import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import AlertPanel from './AlertPanel'
import { Alert } from 'react-bootstrap'

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });


describe('<AlertPanel />', () => {
  it('should render Alert span because has no props ', () => {
    const wrapper = shallow(<AlertPanel />)
    expect(wrapper.contains(<span></span>)).toBe(true)
  })

  it('should render Alert with message terjadi kesalahan', () => {
    const wrapper = render(<AlertPanel show={true} status="danger" message="terjadi kesalahan" />)
    expect(wrapper.text()).toBe("terjadi kesalahan")
  })

})
