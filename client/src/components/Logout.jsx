import React from 'react'
import { withRouter } from 'react-router-dom'
import { NavItem } from 'react-bootstrap'

const Logout = withRouter((props) => {
  const submitLogout = () => {
    localStorage.removeItem('token')
		props.history.push('/login'); 
  }

  return ( 
    <NavItem eventKey={1} href="#" onClick={submitLogout}>
      Logout
    </NavItem>
  )
})

export default Logout
