import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { useSession } from '../Security/SessionContext';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useSession();
  const { item, setItem } = useSession();
  const history=useHistory();
 const logoutHandler=()=>{
   sessionStorage.removeItem("token");
   sessionStorage.removeItem("role");
  setIsLoggedIn(false);
 setItem(0);
  console.log("in log out :- "+isLoggedIn);
  history.push("/");
 }
 const homeHandler=()=>{
  const encodedRole = sessionStorage.getItem('role');
        const decodedRole = atob(encodedRole);
  if(decodedRole==='USER')
  history.push('/user/welcome');
else if(decodedRole==='MANAGER')
history.push('/employee/welcome');
else if(decodedRole==='ADMIN')
history.push('/admin/welcome');
 }
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          CDAC Bank
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={homeHandler}>Home</Nav.Link>
            <Nav.Link as={Link} to="/aboutUs">
              About Us
            </Nav.Link>
            <Nav.Link as={Link} to="/branchList">
              Branch List
            </Nav.Link>
            <Nav.Link as={Link} to="/addUser">
              Open Account
            </Nav.Link>
            {isLoggedIn ? (
              <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
            ) : (
              <NavDropdown title="Login" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/employee_login">
                  Employee Login
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/user_login">
                  User Login
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
