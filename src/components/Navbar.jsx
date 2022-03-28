import React, { useContext } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
//For Handling Routing
import { Link } from "react-router-dom";
import "../assets/styles/Navbar.css";
import { GeneralContext } from "../contexts/GeneralContext";
import logo from "../assets/images/icons8-react-native-64.png";
export default function NavbarComponent() {
  let theme = useContext(GeneralContext);
  return (
    <Navbar bg="light" expand="lg" className="navbar py-3 sticky-top  ">
      <Container>
        <Navbar.Brand href="#">
          <img src={logo} alt="" width={50} height={50} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            {/* <Link
              to="/home"
              className="home text-decoration-none   text-dark mx-3"
            >
              Home
            </Link> */}
            <Link
              to="/products"
              className=" text-decoration-none   text-dark mx-3"
            >
              Products
            </Link>

            <Link
              to="/login"
              className=" text-decoration-none   text-dark mx-3"
            >
              Login
            </Link>
            <Link to="/cart" className=" text-decoration-none   text-dark mx-3">
              Cart
            </Link>
          </Nav>

          <Button variant="outline-warning" onClick={theme.darkModeToggler}>
            Toggle Dark Mode
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
