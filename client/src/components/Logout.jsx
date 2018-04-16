import React from 'react'
import { withRouter } from 'react-router-dom'
import { NavItem } from 'react-bootstrap'

export const Logout = (props) => {
  const submitLogout = () => {
    localStorage.removeItem('token')
		props.history.push('/login'); 
    return true
  }

  return ( 
    <li><a onClick={ submitLogout } >Logout </a></li>
  )
}

export default withRouter(Logout)
