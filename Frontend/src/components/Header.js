import React from 'react'
import { Route } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {Navbar, Nav, Container,NavDropdown} from 'react-bootstrap'
import { NavLink} from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'
import SearchBox from './SearchBox'

const Header = () => {

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

    return (
    <header>
          <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
          <Container>
          <Navbar.Brand> 
          <NavLink to="/">RS Shop</NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav className="ml-auto">
            <NavLink to="/cart" style={{color:"white",margin:"10px"}} activeStyle={{borderBottom:"2px solid Grey"}}><i className='fas fa-shopping-cart'></i>Cart</NavLink>
            {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}

            {/* <NavLink to="/login" style={{color:"white",margin:"10px"}} activeStyle={{borderBottom:"2px solid Grey"}}><i className='fas fa-user'></i>Sign In</NavLink> */}
            </Nav>
          </Navbar.Collapse>
          </Container>
        </Navbar>
    </header>
    )
}

export default Header
