import React from 'react';
import { ListGroupItem, Glyphicon } from 'react-bootstrap'

function PasswordValidItem(props) {
  const { validPassword, message } = props
  return (
    <ListGroupItem>
      { validPassword ? <Glyphicon glyph="ok" />:<Glyphicon glyph="remove" /> }
         { message }
    </ListGroupItem>
  );
}

export default PasswordValidItem;
