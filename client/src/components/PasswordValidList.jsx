import React from 'react';

import { ListGroup} from 'react-bootstrap'
import PasswordValidItem  from './PasswordValidItem'
function PasswordValidList(props) {

  const { validPassword } = props
  return (
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
  );
}


export default PasswordValidList;
