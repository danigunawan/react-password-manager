import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import {PasswordItem} from './PasswordItem'
import {Link} from 'react-router-dom'
import date from 'date-and-time'
import { 
  Button
} from 'react-bootstrap'

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });


describe('<PasswordValidItem />', () => {

  it('should render tr td element with data from props and button unshow  ', () => {
      const passwords = [{
        _id: 'asdasdasd',
        username: 'haidar',
        password: 'hallo',
        url: 'facebook',
        show: false
      }]
    const wrapper = shallow(<PasswordItem passwords={passwords}  deletePassword={() => {} } unshowPassword={() => {}}    />)
    expect(wrapper.containsAllMatchingElements([
      <td>haidar</td>,
      <td>*****</td>,
      <td>facebook</td>,
      <button>Unshow </button>,
      <Button bsStyle="primary" onClick={() => {} }>Unshow </Button>,
      <Button bsStyle="danger" onClick={ () => {} } >Delete</Button>,
			<Link  to='/edit' className="btn btn-warning" > Edit </Link>
]))
  })

  it('should render tr td element with data from props and button show  ', () => {
      const passwords = [{
        _id: 'asdasdasd',
        username: 'haidar',
        password: 'hallo',
        url: 'facebook',
        show: true
      }]
    const wrapper = shallow(<PasswordItem passwords={passwords}  deletePassword={() => {} } unshowPassword={() => {}}    />)
    expect(wrapper.containsAllMatchingElements([
      <td>haidar</td>,
      <td>hallow</td>,
      <td>facebook</td>,
      <Link className="btn btn-primary" to={`/show-password/${passwords[0]._id}`}>Show </Link>,
      <Button bsStyle="danger" onClick={ () => {} } >Delete</Button>,
			<Link  to='/edit' className="btn btn-warning" > Edit </Link>
      ]))
  })

})
