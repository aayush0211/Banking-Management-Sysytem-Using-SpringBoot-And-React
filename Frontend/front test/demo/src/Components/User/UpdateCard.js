import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import BankServices from "../../BankService/BankServices";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { HttpStatusCode } from "axios";
import { useSession } from "../../Security/SessionContext";
import Authentication from "../../Security/SessionContext";
function UpdateCard(props) {
  const { isLoggedIn, setIsLoggedIn } = useSession();

  const [formData, setFormData] = useState({
    id: props.card.id,
    cardNetwork: props.card.cardNetwork,
    cardType: props.card.cardType,
    CVV: props.card.cvv,
    expiryDate: props.card.expiryDate,
    creationDate: props.card.creationDate,
    maxTransferAmount: props.card.maxTransferAmount,
  });
  const history = useHistory();
  useEffect(() => {
    if (!Authentication.checkAutherization("USER", isLoggedIn, setIsLoggedIn))
      history.push("/user_login");
  }, []);

  // useEffect(()=>{
  //   setPreviewPhoto(URL.createObjectURL(formData.image));
  // },[])
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
    BankServices.updateAmountLimit(
      formData.id,
      formData.maxTransferAmount
    ).then((obj) => displayMassage(obj));
  };

  function displayMassage(obj) {
    const message = document.getElementById("messageuc");
    var bool = obj.status === HttpStatusCode.Ok ? true : false;
    if (bool) {
      message.textContent = "Successfully updated !";
      message.style.color = "green";
      alert(obj.data);
      props.cardListRenderHandler();
    } else {
      message.textContent = obj.response.data.message;
      message.style.color = "red";
    }
  }

  return (
   
      <div className="container d-flex justify-content-center align-items-center">
        <div className="border rounded-5 px-3 py-2">
          <Form onSubmit={handleSubmit} className="">
            <div id="messageuc"></div>
          
            <Form.Group className="mb-2" controlId="cardNetwork">
              <Form.Label>Card Name</Form.Label>
              <Form.Control
                type="text"
                maxLength={30}
                minLength={3}
                readOnly
                name="cardNetwork"
                value={formData.cardNetwork}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="cardType">
              <Form.Label>Card Type</Form.Label>
              <Form.Control
                type="text"
                name="cardType"
                maxLength={30}
                readOnly
                value={formData.cardType}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="CVV">
              <Form.Label>CVV</Form.Label>
              <Form.Control
                type="number"
                name="CVV"
                readOnly
                value={formData.CVV}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="expiryDate">
              <Form.Label>Date of Expiry</Form.Label>
              <Form.Control
                type="date"
                name="expiryDate"
                min={new Date().toISOString().split("T")[0]}
                readOnly
                value={formData.expiryDate}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <div className="d-flex flex-row m-3">
              <Form.Group className="mb-3" controlId="maxTransferAmount">
                <Form.Label>max Transfer Amount</Form.Label>
                <Form.Control
                  type="number"
                  name="maxTransferAmount"
                  max={50000}
                  min={1}
                  value={formData.maxTransferAmount}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3 px-1" controlId="creationDate">
                <Form.Label>creation Date</Form.Label>
                <Form.Control
                  type="date"
                  readOnly
                  name="creationDate"
                  max={new Date().toISOString().split("T")[0]}
                  value={formData.creationDate}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
            <Button variant="primary" type="submit" className="mx-2">
              Update
            </Button>
          </Form>
        </div>
      </div>
    
  );
}

export default UpdateCard;

// private long Id;

// 	private String cardNetwork;

// 	private String cardType;

// 	private int CVV;

// 	private LocalDate expiryDate;

// 	private LocalDate creationDate;

// 	private long accountNumber;

// 	private String accountHolderName;

// 	private double maxTransferAmount;
