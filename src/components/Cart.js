import React, { useContext } from "react";
import "../assets/styles/Cart.css";
import { GeneralContext } from "../contexts/GeneralContext";
import { Container, Button } from "react-bootstrap";
import CurrencyFormatter from "./CurrencyFormat";
import deleteImage from "../assets/images/icons8-remove-48.png";
import emptyCart from "../assets/images/cart.668e6453.svg";
import { Link } from "react-router-dom";

export default function Cart() {
  const productsList = useContext(GeneralContext).products.filter(
    (product) => product.orderedQty > 0
  );

  let updateOrderedQty = useContext(GeneralContext).updateOrderedQty;
  let removeProduct = useContext(GeneralContext).removeOrderedQty;

  let calcTotalPrice = () => {
    let totalPrice = 0;
    productsList.forEach(
      (product) =>
        (totalPrice +=
          product.price *
          product.orderedQty *
          (1 - product.discountPercentage / 100))
    );
    return CurrencyFormatter(totalPrice);
  };
  let emptyCartStyle = productsList.length
    ? ""
    : "justify-content-center align-items-center";
  return (
    <Container className={"cart d-flex " + emptyCartStyle}>
      <div className="w-100 my-2">
        {productsList.length ? (
          <div className=" d-flex w-100 mt-3">
            <div className="w-75">
              {/* Left  */}
              {productsList.map((product, index) => (
                <div
                  key={index}
                  className="bg-white bg-opacity-75 mb-2  h-auto "
                >
                  {/* Upper row  */}
                  <div className="d-flex">
                    <div className="cart-img-container px-3">
                      <img
                        src={product.images[0]}
                        alt=""
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                    <div className=" d-flex justify-content-between cart-text-container  pt-2 w-100 pe-3">
                      <div>
                        <p>{product.title}</p>
                      </div>
                      <div className="d-flex flex-column align-items-end ">
                        <p className="fw-bold">
                          {CurrencyFormatter(
                            product.price *
                              (1 - product.discountPercentage / 100)
                          )}
                        </p>
                        {product.discountPercentage && (
                          <div className="d-flex">
                            <p className="text-black-50 text-decoration-line-through">
                              {CurrencyFormatter(product.price)}
                            </p>
                            <p className="fs-6 ms-2 discount">
                              {product.discountPercentage} %
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Lower row  */}
                  <div className=" d-flex justify-content-between pb-3 px-3 align-content-end">
                    <div>
                      <button
                        className="btn text-custom fw-bold d-flex align-items-start"
                        onClick={() => removeProduct(product.id)}
                        // style={{ fontWeight: 600 }}
                      >
                        <img
                          src={deleteImage}
                          alt=""
                          style={{
                            width: "30px",
                            height: "30px",
                            objectFit: "contain",
                          }}
                        />
                        <span>Remove</span>
                      </button>
                    </div>
                    <div>
                      <div className="qty-container fw-bold fs-5">
                        <div className="qty d-flex justify-content-between  align-items-center">
                          <Button
                            className="decrease-btn btn btn-warning  text-white "
                            onClick={() => updateOrderedQty(-1, product.id)}
                          >
                            -
                          </Button>
                          <span className="d-block mx-4">
                            {" "}
                            {product.orderedQty}{" "}
                          </span>
                          <Button
                            className="increase-btn btn btn-warning  text-white "
                            onClick={() => updateOrderedQty(1, product.id)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* right */}
            <div
              className="bg-white ms-2 p-3  bg-opacity-75"
              style={{ height: "173px" }}
            >
              <p className="text-capitalize text-black-50 fw-bold">
                Cart summary
              </p>
              <hr className="w-100 bg-black" style={{ height: "1px" }} />
              <p>
                Subtotal:{" "}
                <span className="d-inline-block fs-5 fw-bold">
                  {calcTotalPrice()}
                </span>
              </p>

              <Button
                className="btn-warning text-white"
                style={{ fontWeight: "500" }}
              >
                CHECKOUT ({calcTotalPrice()})
              </Button>
            </div>
          </div>
        ) : (
          <Container className="d-flex flex-column text-center justify-content-center align-items-center">
            <div>
              <img src={emptyCart} alt="" />
            </div>
            <div>
              <p style={{ fontWeight: 500 }}>Your cart is empty!</p>
              <p>Browse our categories and discover our best deals!</p>
              <Link to="/products" className="btn btn-warning mt-4">
                <Button className="btn btn-warning text-uppercase">
                  Start Shopping
                </Button>
              </Link>
            </div>
          </Container>
        )}
      </div>
    </Container>
  );
}
