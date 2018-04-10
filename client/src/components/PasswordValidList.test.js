import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import PasswordValidItem from './PasswordValidItem'
import { ListGroup} from 'react-bootstrap'
import PasswordValidList  from './PasswordValidList'

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });


describe('<PasswordValidItem />', () => {

  it('should render ListGroup contain password valid item ', () => {
    const validPassword =  {
        upperCase: false,
        lowerCase: false,
        length: false,
        symbol: false,
        number: false
    }
    const wrapper = shallow(<PasswordValidList validPassword={validPassword}   />)
    expect(wrapper.contains(
    <div className="password-valid-list">
      <ListGroup>
        <PasswordValidItem 
          validPassword={validPassword.upperCase} 
          message="Password harus memiliki setidaknya satu karakter huruf besar ( upper-case )" 
        />
        <PasswordValidItem 
          validPassword={validPassword.lowerCase} 
          message="Password harus memiliki setidaknya satu karakter huruf kecil ( lower-case )" 
        />
        <PasswordValidItem 
          validPassword={validPassword.lowerCase} 
          message="Password harus memiliki setidaknya satu karakter huruf kecil ( lower-case )" 
        />
        <PasswordValidItem 
          validPassword={validPassword.symbol} 
          message="Password harus memiliki setidaknya satu karakter special ( #$@!&%... )" 
        />
        <PasswordValidItem 
          validPassword={validPassword.number} 
          message="Password harus memiliki setidaknya satu angka" 
        />
        <PasswordValidItem 
          validPassword={validPassword.length} 
          message="Password harus memiliki panjang (length)  lebih dari 5 karakter" 
        />
      </ListGroup>
    </div>
      )).toBe(true)
  })
  it('should render 6 <PasswordValidItem />', () => {

    const validPassword =  {
        upperCase: false,
        lowerCase: false,
        length: false,
        symbol: false,
        number: false
    }
    const wrapper = shallow(<PasswordValidList validPassword={validPassword}   />)
    expect(wrapper.find('PasswordValidItem').length).toBe(6)
  })

})
