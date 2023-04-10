import React, { useState } from 'react';
import { useEffect } from 'react';

import { NavLink as ReactLink, useNavigate } from 'react-router-dom';
import userContext from "../context/useContext";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';
import { doLogout, getCurrentUserDetails, isLoggedIn } from '../auth';

function CustomNavbar() {

 

  let navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const [login, setLogin]=useState(false)
  const [user, setUser]=useState(undefined)
  useEffect(()=>{
    setLogin(isLoggedIn())
    setUser(getCurrentUserDetails())
  },[login])
  const logout = ()=>{
    doLogout(()=>{
      // logged out
      setLogin(false)
    
      navigate("/")
    })
  }


  return (
    <div>
      <Navbar color='dark'
      dark
      expand='md'
      fixed=''
      className='px-4'>
        <NavbarBrand tag={ReactLink} to="/">MyBlogs</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
          <NavItem>
              <NavLink tag={ReactLink} to="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/about">About Us</NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink tag={ReactLink} to="/login">
                Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/signup">
                Signup
              </NavLink>
            </NavItem> */}
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag={ReactLink} to="/services">Service</DropdownItem>
                <DropdownItem>Contact Us</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Youtube</DropdownItem>
                <DropdownItem  tag={ReactLink} to="/user/dashboard">Add Post</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Nav navbar>
            {
              login && ( 
                <>
                <NavItem>
                <NavLink onClick={logout}>
                  logout
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink tag={ReactLink} to="/user/profile-info">
                {/* { user.name}<br></br> */}
                { user.email}
                </NavLink>
              </NavItem>
                </>
              )
            }
       {
        !login &&(
         <>
          <NavItem>
          <NavLink tag={ReactLink} to="/login">
            Login
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={ReactLink} to="/signup">
            Signup
          </NavLink>
        </NavItem>
         </>
        )
       }
          </Nav>
          {/* <NavbarText>YOUTUBE</NavbarText> */}
        </Collapse>
      </Navbar>
    </div>
  );
}

export default CustomNavbar;