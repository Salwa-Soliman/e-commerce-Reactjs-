import React, { useState, useEffect, useContext } from "react";
import { Container, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import axios from "axios";
import "../assets/styles/Products.css";
import { GeneralContext } from "./../contexts/GeneralContext";
import StarRatings from "react-star-ratings";
import CurrencyFormatter from "./CurrencyFormat";

export default function Products() {
  const categories = [
    "all",
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration",
  ];

  const [filteredCategory, setFilteredCategory] = useState("all");

  let setProducts = useContext(GeneralContext).setProducts;

  let productsList = useContext(GeneralContext).products.filter((product) =>
    filteredCategory === "all" ? product : product.category === filteredCategory
  );

  let updateOrderedQty = useContext(GeneralContext).updateOrderedQty;

  useEffect(() => {
    if (productsList.length === 0) {
      axios
        .get("https://dummyjson.com/products")
        .then((response) => {
          let products = response.data.products;
          // console.log(products);
          products.forEach((product, index) => {
            product.orderedQty = 0;
          });
          setProducts(products);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <Container style={{ minHeight: "100vh" }}>
      <div
        style={{
          position: "fixed",
          top: "92px",
          left: 0,
          zIndex: 3,
          padding: "10px",
        }}
        className="filters d-flex justify-content-center align-items-center w-100 bg-white"
      >
        <select
          style={{
            textTransform: "capitalize",
          }}
          className="btn btn-outline-warning  fw-bold text-custom"
          onChange={(event) => setFilteredCategory(event.target.value)}
        >
          {categories.map((category) => (
            <option value={category} key={category}>
              {category.replace("-", " ")}
            </option>
          ))}
        </select>
      </div>

      <Container
        className="mb-5 d-flex justify-content-center justify-content-lg-between flex-wrap align-items-center mx-auto"
        style={{ marginTop: "70px" }}
      >
        {productsList.map((card, index) => (
          <Card key={index} className="my-2 my-card" style={{ width: "350px" }}>
            <Link to={`/products/${card.id}`}>
              <div className="img-container d-flex justify-content-center align-items-center">
                <Card.Img variant="top" src={card.images[0]} alt="image" />
              </div>
            </Link>
            <Card.Body>
              <Link to={`/products/${card.id}`} className="text-secondary">
                <Card.Title>{card.title}</Card.Title>
              </Link>

              <div className="price fw-bold">
                {CurrencyFormatter(
                  card.price * (1 - card.discountPercentage / 100)
                )}
              </div>
              {card.discountPercentage ? (
                <div className="old-price  ">
                  <span className=" text-black-50 text-decoration-line-through">
                    {CurrencyFormatter(card.price)}
                  </span>
                  <small className="discount ms-2 px-1 ">
                    {card.discountPercentage}%
                  </small>
                </div>
              ) : null}

              <div className="rating d-flex justify-content-start align-items-center">
                <StarRatings
                  rating={card.rating}
                  starRatedColor="#F6B01E"
                  starEmptyColor="grey"
                  numberOfStars={5}
                  name="rating"
                  starDimension="15px"
                  starSpacing="0"
                />
                <small className="ms-2"> ( {card.stock} )</small>
              </div>
              <div className="add-to-cart">
                {card.orderedQty ? (
                  <div className="qty-container fw-bold fs-5">
                    <div className="qty d-flex justify-content-between  align-align-items-center">
                      <Button
                        className="decrease-btn btn btn-warning  text-white "
                        onClick={() => updateOrderedQty(-1, card.id)}
                      >
                        -
                      </Button>
                      <span className="d-block mx-4"> {card.orderedQty} </span>
                      <Button
                        className="increase-btn btn btn-warning  text-white "
                        onClick={() => updateOrderedQty(1, card.id)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex justify-content-between align-items-center">
                    <Button
                      onClick={() => updateOrderedQty(1, card.id)}
                      // className="card-btn rounded-pill border-orange bg-transparent bg-opacity-50  "
                      className="btn btn-warning  text-white"
                    >
                      Add to Cart
                    </Button>
                  </div>
                )}
              </div>
            </Card.Body>
          </Card>
        ))}
      </Container>
    </Container>
  );
}
