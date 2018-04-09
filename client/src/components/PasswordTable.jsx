import React from 'react'
import PasswordThead from './PasswordThead'
import PasswordTbody from './PasswordTbody'

import {Table} from 'react-bootstrap'
const PasswordTable = (props) => {
	const { passwords} = props
  if (passwords.length) {
    return (
      <Table responsive striped bordered condensed hover>
        <PasswordThead />
        <PasswordTbody passwords={passwords} />
      </Table>
    )
  } else {
    return <div className="centered"> <h3> No Passwords Found </h3> </div>
  }
}

export default PasswordTable
