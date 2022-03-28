import React from "react";
import { Container } from "react-bootstrap";
import "../assets/styles/Footer.css";
export default function FooterComponent() {
  return (
    <Container
      fluid
      className="footer fw-bold bg-info bg-opacity-25 mb-0 p-3 text-center fw-bold fst-italic "
    >
      <h3>
        Coded & Maintained With <span className="text-custom">&hearts;</span>
      </h3>
    </Container>
  );
}
