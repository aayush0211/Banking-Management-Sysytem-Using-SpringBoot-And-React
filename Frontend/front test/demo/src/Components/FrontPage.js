import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

const FrontPage = () => {
  return (
    <>
      <Container className="mt-5">
        <h1>Welcome to CDAC Bank</h1>
        <p>Manage your finances efficiently with us.</p>
      </Container>

      <footer className="footer mt-auto py-3 bg-light">
        <Container>
          <span className="text-muted">Your Bank Name &copy; {new Date().getFullYear()}</span>
          <span className="float-right">Helpline: 123-456-7890</span>
        </Container>
      </footer>
    </>
  );
};

export default FrontPage;
