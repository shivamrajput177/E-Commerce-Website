import React from 'react'
import {Navbar, Nav, Container} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const Header = () => {
    return (
    <header>
          <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
          <Container>
          <Navbar.Brand> 
          <NavLink to="/">RS Shop</NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
            <NavLink to="/cart" style={{color:"white",margin:"10px"}} activeStyle={{borderBottom:"2px solid Grey"}}><i className='fas fa-shopping-cart'></i>Cart</NavLink>
            <NavLink to="/login" style={{color:"white",margin:"10px"}} activeStyle={{borderBottom:"2px solid Grey"}}><i className='fas fa-user'></i>Sign In</NavLink>
            </Nav>
          </Navbar.Collapse>
          </Container>
        </Navbar>
    </header>
    )
}

export default Header
