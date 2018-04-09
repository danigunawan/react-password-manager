import React from 'react'
import { Link } from 'react-router-dom'
import Logout from './Logout'


const Navbar = () => {

  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="/">React Password Manager</a>
        </div>
        <ul className="nav navbar-nav">
          <li><Link to="/">Home </Link></li>
          { localStorage.token !== undefined && <Logout /> }
          { localStorage.token === undefined && <li><Link to="/login">Login </Link></li>}
          { localStorage.token === undefined && <li><Link to="/register">Register </Link></li>}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
