/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import { Form, Container } from "react-bootstrap";
import "../assets/styles/Form.css";
import { useContext } from "react";
import { GeneralContext } from "../contexts/GeneralContext";

export default function FormComponent() {
  const [formErrors, setformErrors] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const validateField = (field, value, pattern) => {
    if (value.match(pattern)) {
      formErrors[field] = "";
      // console.log("valid");
    } else {
      if (value.length === 0) {
        // console.log("required");
        formErrors[field] = "This field is required";
      } else {
        // console.log("Invalid Entry!");
        formErrors[field] = `Invalid ${field}`;
      }
    }
    userData[field] = value;
    setformErrors({ ...formErrors });
  };

  const submitForm = (e) => {
    e.preventDefault();
    Object.keys(userData).forEach((field) => {
      if (!userData[field]) {
        formErrors[field] = "This Field is required";
        setformErrors({ ...formErrors });
      }
    });
  };

  return (
    <>
      <Container fluid className="my-form">
        <div className="overlay-img">
          <div className="overlay-bg"></div>
        </div>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              onInput={(event) =>
                validateField("username", event.target.value, /^[a-z ]{3,15}$/i)
              }
            />
            <p className="err-msg text-danger">{formErrors.username}</p>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="textEmphasisColor: "
              placeholder="name@example.com"
              onInput={(event) =>
                validateField(
                  "email",
                  event.target.value,
                  // eslint-disable-next-line no-useless-escape
                  /^([a-z_0-9\.]{3,})@([a-z]{3,10})\.([a-z]{3,10})$/i
                )
              }
            />
            <p className="err-msg text-danger">{formErrors.email}</p>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Label>Phone Number</Form.Label>
            <div className=" input-group flex-nowrap">
              <span className="input-group-text fw-bold" id="basic-addon1">
                01
              </span>
              <Form.Control
                type="text"
                placeholder="Phone"
                className="form-control"
                aria-describedby="addon-wrapping"
                onInput={(event) =>
                  validateField(
                    "phone",
                    event.target.value,
                    // eslint-disable-next-line no-useless-escape
                    /^(1|0|2|5)([0-9]{8})$/
                  )
                }
              />
            </div>
            <p className="err-msg text-danger">{formErrors.phone}</p>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="********"
              onInput={(event) =>
                validateField(
                  "password",
                  event.target.value,
                  /^([a-z_0-9]){8,20}$/i
                )
              }
            />
            <p className="err-msg text-danger">{formErrors.password}</p>
          </Form.Group>
          <Form.Group
            className="mb-3 text-center"
            controlId="exampleForm.ControlInput5"
          >
            <button
              className="  btn btn-warning"
              onClick={(event) => submitForm(event)}
            >
              Submit
            </button>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
}
