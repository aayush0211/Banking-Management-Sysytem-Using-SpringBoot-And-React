import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import BankServices from "../../BankService/BankServices";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import "../../Style/Form_flexBox.css";
import { HttpStatusCode } from "axios";
import { useSession } from '../../Security/SessionContext';
import Authentication from '../../Security/SessionContext';
function AddCard(props) {
  const { isLoggedIn, setIsLoggedIn } = useSession();

  const [formData, setFormData] = useState({
    cardNetwork: '',
    maxTransferAmount: "",
    cardType: "",
  });
const location=useLocation();
  const [cardtype, setCardType] = useState(['DEBIT', 'CREDIT']);
  const [cardNetworks] = useState(['MASTER', 'VISA', 'RUPAY']);
  const accountId=props.user.id;
  const history = useHistory();
  useEffect(()=>{
    if(!Authentication.checkAutherization('USER',isLoggedIn,setIsLoggedIn))
    history.push('/user_login');
},[])

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
    console.log(formData+" " + "accountid :- "+accountId);
    BankServices.addCard(accountId,formData).then((obj) => displayMassage(obj));
    setFormData({
      cardNetwork: "",
      maxTransferAmount: "",
      cardType: "",
    });
  };


  function displayMassage(obj) {
    const message = document.getElementById("messagead");
    var bool=obj.status===HttpStatusCode.Created ? true:false;
    if (bool) {
      message.textContent = "Successfully added !";
      message.style.color = "green";
      alert(obj.data);
      history.push("/user/welcome");
    } else {
      message.textContent = obj.response.data.message;
      message.style.color = "red";
    }
  }

  return (
    <div className="bg_profile">
      <div className="container d-flex justify-content-center align-items-center">
        <div className="px-3 py-2">
          <Form onSubmit={handleSubmit}>
            <h3 className="mt-2">Card Registration Form</h3>
            <hr />
            <div id="messagead"></div>
            <div className="d-flex flex-row m-3">     
              <Form.Group className="mb-3 px-1" controlId="maxTransferAmount">
                <Form.Label>Set max. Transfer Amount</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Amount"
                  name="maxTransferAmount"
                  max={50000}
                  min={1}
                  value={formData.maxTransferAmount}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
        
            <div className="d-flex flex-row m-3">
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
                  {cardtype.map((branch) => (
                    <option key={branch} value={branch}>
                      {branch}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

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
    </div>
  );
}

export default AddCard;
