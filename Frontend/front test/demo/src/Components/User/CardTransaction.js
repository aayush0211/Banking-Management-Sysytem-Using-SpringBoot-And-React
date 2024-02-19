import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import BankServices from "../../BankService/BankServices";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import "../../Style/Form_flexBox.css";
import { HttpStatusCode } from "axios";

function CardTransaction(props) {
  const [formData, setFormData] = useState({
    id: "",
    cardNetwork: "",
    cardType: "",
    transactionType: "",
    transactionDate: new Date().toISOString().split("T")[0],
    amount: "",
    accountNo: "",
    receiverAccountNo: "",
    expiryDate: "",
    CVV: "",
    password:''
  });
const location=useLocation();
  const [cardtype, setCardType] = useState(['DEBIT']);
  const [cardNetworks] = useState(['MASTER', 'VISA', 'RUPAY']);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
     if (!checkPasswordMatch()) return;
   props.transactionHandler(formData);
    setFormData({
      id: "",
      cardNetwork: "",
      cardType: "",
      transactionType: "",
      transactionDate: new Date().toISOString().split("T")[0],
      amount: "",
      accountNo: "",
      receiverAccountNo: "",
      expiryDate: "",
      CVV: "",
      password: ""
    });
  };
function checkPasswordMatch() {
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  const message = document.getElementById("password-match-message");

  if (password === confirmPassword) {
    message.textContent = "Passwords match";
    message.style.color = "green";
    return true;
  } else {
    message.textContent = "Passwords do not match";
    message.style.color = "red";
    return false;
  }
}

  return (
    // <div className="bg_cardtransaction">
    <div className="container d-flex justify-content-center align-items-center">
      <div className="border rounded-5 px-3 py-2">
        <Form onSubmit={handleSubmit}>
          <h3 className="mt-2">Enter Your Card and Transaction Details</h3>
          <div id="messagect"></div>
          <div className="d-flex flex-row m-3">
            <Form.Group className="mb-3 px-1" controlId="accountNo">
              <Form.Label>Account No</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter accountNo"
                name="accountNo"
                min={1}
                value={formData.accountNo}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3 px-1" controlId="receiverAccountNo">
              <Form.Label>Receiver Account No.</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter receiverAccountNo"
                name="receiverAccountNo"
                min={1}
                value={formData.receiverAccountNo}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </div>
          <div className="d-flex flex-row m-3">
            <Form.Group className="mb-3 px-1" controlId="amount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter amount"
                name="amount"
                max={50000}
                min={1}
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3 px-1" controlId="id">
              <Form.Label>Card No</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Card Number"
                name="id"
                min={1}
                value={formData.id}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3 px-1" controlId="cardType">
              <Form.Label>Card Type</Form.Label>
              <Form.Control
                as="select"
                name="cardType"
                value={formData.cardType}
                onChange={handleChange}
                required
              >
                <option value="">Select Type</option>
                {cardtype.map((card) => (
                  <option key={card} value={card}>
                    {card}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </div>
          <div className="d-flex flex-row m-3">
            <Form.Group className="mb-3" controlId="cardNetwork">
              <Form.Label>Card Network Type</Form.Label>
              <Form.Control
                as="select"
                name="cardNetwork"
                value={formData.cardNetwork}
                onChange={handleChange}
                required
              >
                <option value="">Select cardNetwork</option>
                {cardNetworks.map((cardNetwork) => (
                  <option key={cardNetwork} value={cardNetwork}>
                    {cardNetwork}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3 px-1" controlId="CVV">
              <Form.Label>CVV</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter CVV"
                name="CVV"
                min={1}
                value={formData.CVV}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3 px-1" controlId="expiryDate">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter expiryDate"
                name="expiryDate"
                min={new Date().toISOString().split("T")[0]}
                value={formData.expiryDate}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </div>
          <div className="d-flex flex-row m-3">
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                id="password"
                placeholder="Enter passsword"
                type="password"
                name="password"
                pattern="/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3 px-1" controlId="confirm_password">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                id="confirm-password"
                placeholder="Enter password again"
                type="password"
                name="confirm_password"
                pattern="/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/"
                required
                onInput={checkPasswordMatch}
                title="Passwords must be at least 8 characters long"
              />
              <div id="password-match-message"></div>
            </Form.Group>
          </div>
          <Button variant="primary" type="submit" className="px-3 m-2">
            Submit
          </Button>
          <Link to="/user/welcome">
            <Button variant="primary" type="button">
              Back
            </Button>
          </Link>
        </Form>
      </div>
    </div>
    // </div>
  );
}

export default CardTransaction;

