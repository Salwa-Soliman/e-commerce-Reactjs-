import React from "react";
import { Card, Button, Container } from "react-bootstrap";
import embedded from "../assets/images/embedded.jpg";
import frontend from "../assets/images/frontend.webp";
import backend from "../assets/images/backend.webp";
export default function CardsComponent() {
  const cardsInfo = [
    {
      title: "Frontend",
      description: "Learn HTML, CSS, JavaScript and Bootstrap",
      img: frontend,
    },
    {
      title: "Backend",
      description: "Learn C#, .Net, PHP and Laravel",
      img: backend,
    },
    {
      title: "Embedded Systems",
      description: "Learn C, Interfacing, RTOS and ISTQB",
      img: embedded,
    },
  ];
  return (
    <Container className="my-5 d-flex justify-content-center justify-content-lg-between flex-wrap align-items-center mx-auto">
      {cardsInfo.map((card, index) => (
        <Card key={index} className="my-2 my-card" style={{ width: "350px" }}>
          <Card.Img variant="top" src={card.img} alt="image" height={"200px"} />
          <Card.Body>
            <Card.Title>{card.title}</Card.Title>
            <Card.Text>{card.description}</Card.Text>
            <Button variant="primary" className="card-btn">
              View Track
            </Button>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}
