import React from 'react'
import { Navbar as NavbarBS, Nav, NavItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Logout from './Logout'


const Navbar = () => {

  return (
    <NavbarBS>
      <NavbarBS.Header>
        <NavbarBS.Brand>
          <a href="#home">React Password Manager</a>
        </NavbarBS.Brand>
      </NavbarBS.Header>
      <Nav>
        <NavItem eventKey={1} href="#">
          <Link to="/">Home </Link>
        </NavItem>
				{ localStorage.token !== undefined ?
					<Logout />
					:
					<span></span>
				}
				{ localStorage.token === undefined ?
					<NavItem eventKey={1} >
						<Link to="/login">Login </Link>
					</NavItem>
					:
					<span></span>
				}
				{ localStorage.token === undefined ?
					<NavItem eventKey={1}>
						<Link to="/register">Register </Link>
					</NavItem>
					:
					<span></span>
				}
      </Nav>
    </NavbarBS>
  )
}

export default Navbar
