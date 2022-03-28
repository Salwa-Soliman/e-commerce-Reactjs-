import React, { useContext, useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { GeneralContext } from "./../contexts/GeneralContext";
import "../assets/styles/ProductDetails.css";
import StarRatings from "react-star-ratings";
import CurrencyFormatter from "./CurrencyFormat";
import { Link } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();
  const product = useContext(GeneralContext).getProductDetails(id - 1);
  const theme = useContext(GeneralContext).darkMode;
  const themeStyle = theme ? "bg-dark text-white" : "";
  let updateOrderedQty = useContext(GeneralContext).updateOrderedQty;

  return (
    <div className={` product-details ${themeStyle} `}>
      <Container className="p-0 bg-white bg-opacity-50 mt-5 d-flex flex-column align-items-center align-items-md-stretch flex-md-row">
        <div className="image-container pt-5  py-md-5  bg-white d-flex justify-content-center align-items-center">
          <img src={product.images[0]} alt={product.id} />
        </div>
        <div className="description py-3 py-md-5 mb-0 w-75 text-center text-md-start px-3">
          <h3 className="title fw-bold fs-5">{product.title}</h3>
          <small className="my-2  d-block">
            <span className="fw-bold">Category:</span> {product.category}
          </small>
          <div className="rating">
            <StarRatings
              rating={product.rating}
              starRatedColor="#F6B01E"
              starEmptyColor="grey"
              numberOfStars={5}
              name="rating"
              starDimension="15px"
              starSpacing="0"
            />
            <small> ({product.stock} verified ratings)</small>
          </div>
          <p className="desc fst-italic my-2">{product.description}</p>
          <div className="price">
            <p className="fw-bold fs-5 mb-0">
              {CurrencyFormatter(
                product.price * (1 - product.discountPercentage / 100)
              )}
            </p>
          </div>
          <div className="old-price mt-1 mb-3">
            <span className=" text-black-50 text-decoration-line-through">
              EGP {CurrencyFormatter(product.price)}
            </span>
            <small className="discount ms-2 px-1 ">
              {product.discountPercentage}%
            </small>
          </div>
          <div className="add-to-cart d-flex justify-content-between align-items-center">
            <div>
              <Link to="/products" className="btn btn-warning mt-4">
                Go Back
              </Link>
            </div>
            {product.orderedQty ? (
              <div className="qty-container fw-bold fs-5">
                <div className="qty d-flex justify-content-between  align-align-items-center w-25">
                  <Button
                    className="decrease-btn btn btn-warning  text-white "
                    onClick={() => updateOrderedQty(-1, product.id)}
                  >
                    -
                  </Button>
                  <span className="d-block mx-4"> {product.orderedQty} </span>
                  <Button
                    className="increase-btn btn btn-warning  text-white "
                    onClick={() => updateOrderedQty(1, product.id)}
                  >
                    +
                  </Button>
                </div>
              </div>
            ) : (
              <div className="d-flex   align-items-center">
                <Button
                  onClick={() => updateOrderedQty(1, product.id)}
                  className="btn btn-warning  text-white"
                >
                  Add to Cart
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
