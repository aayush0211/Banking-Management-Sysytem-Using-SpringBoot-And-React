import { HttpStatusCode } from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import BankServices from "../../BankService/BankServices";
import Authentication, { useSession } from "../../Security/SessionContext";
import CardTransaction from "./CardTransaction";
import EmailTransaction from "./EmailTransaction";
function MoneyTransferForm(props) {
  const { isLoggedIn, setIsLoggedIn } = useSession();
  const [transfertype, settransfertype] = useState("");
  const history = useHistory();
  const [cardrender, setCardRender] = useState(false);
  const [emailRender, setEmailRender] = useState(false);
  const email = props.user.email;
  useEffect(() => {
    if (!Authentication.checkAutherization("USER", isLoggedIn, setIsLoggedIn))
      history.push("/user_login");
  }, []);
  const handletransfertypeChange = (event) => {
    const value = event.target.value;
    settransfertype(value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    // You can perform actions based on the selected transaction type and values here
    console.log("transfertype Type:", transfertype);
    // console.log('email:', email);
    if (transfertype === "card") {
      setEmailRender(false);
      setCardRender(true);
    } else if (transfertype === "email") {
      setCardRender(false);
      setEmailRender(true);
    }
  };
  function transaction(obj) {
    if (cardrender === true)
      BankServices.transferMoneyByCard(obj).then((obj) => displayMassage(obj));
    else if (emailRender === true)
      BankServices.transferMoneyByEmail(obj).then((obj) => displayMassage(obj));
  }
  function displayMassage(obj) {
    const message = document.getElementById("messagemt");
    var bool = obj.status === HttpStatusCode.Created ? true : false;
    console.log(bool);
    if (bool) {
      message.textContent = `successfully debited !! transaction id :- ${obj.data.id}`;
      message.style.color = "green";
    } else {
      message.textContent = obj.response.data.message;
      message.style.color = "red";
    }
  }

  return (
    <div className="bg_moneytransfer">
      <div className="container d-flex justify-content-center align-items-center">
        <Form onSubmit={handleSubmit}>
          <div id="messagemt"></div>
          <Form.Group controlId="transfertype" className="py-3">
            <h2>Transaction Type</h2>
            <hr />
            <Form.Control
              as="select"
              required
              value={transfertype}
              onChange={handletransfertypeChange}
            >
              <option value="">Select account Type</option>
              <option value="card">Via Debit Card</option>
              <option value="email">Via email passsword</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
      {cardrender === true && (
        <CardTransaction transactionHandler={transaction} />
      )}
      {emailRender === true && (
        <EmailTransaction email={email} transactionHandler={transaction} />
      )}
    </div>
  );
}

export default MoneyTransferForm;
