import { HttpStatusCode } from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  Link,
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import BankServices from "../../BankService/BankServices";
import Authentication, { useSession } from "../../Security/SessionContext";
function EmployeeInletOutletMoneyForm(props) {
  const { isLoggedIn, setIsLoggedIn } = useSession();
  const [transactionType, setTransactionType] = useState("");
  const [selectedBranch, setSelectedBranch] = useState(props.user.branchId);
  const [list, setList] = useState([]);
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    if (
      !Authentication.checkAutherization("MANAGER", isLoggedIn, setIsLoggedIn)
    )
      history.push("/employee_login");
  }, []);
  const handleTransactionTypeChange = (event) => {
    const value = event.target.value;
    setTransactionType(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // You can perform actions based on the selected transaction type and values here
    console.log("Transaction Type:", transactionType);
    console.log("Selected Branch:", selectedBranch);
    if (transactionType === "inlet") {
      BankServices.getAllInletAmountInBranch(selectedBranch).then((obj) =>
        displayMassage(obj)
      );
    } else if (transactionType === "outlet") {
      BankServices.getAllOutletAmountInBranch(selectedBranch).then((obj) =>
        displayMassage(obj)
      );
    } else if (transactionType === "total") {
      BankServices.getTotalAmountInBranch(selectedBranch).then((obj) =>
        displayMassage(obj)
      );
    }
  };
  function displayMassage(obj) {
    const message = document.getElementById("message");
    const money = document.getElementById("money");
    var bool = obj.status === HttpStatusCode.Ok ? true : false;
    if (bool) {
    //  message.textContent = "Amount received !!";
      message.style.color = "green";
      money.textContent = `Amount :- ${obj.data}`;
    } else {
      message.textContent = obj.response.data.message;
      message.style.color = "red";
    }
  }
  return (
    <div className="bg_adduser">
      <div className="d-flex justify-content-center align-items-center ">
        <Form onSubmit={handleSubmit} className="mt-5 pt-5">
          <div id="message"></div>
          <div className="d-flex flex-row m-3">
            <Form.Group controlId="transactionType" className="mb-3 px-1">
              <Form.Label>Amount Type</Form.Label>
              <Form.Control
                as="select"
                required
                value={transactionType}
                onChange={handleTransactionTypeChange}
              >
                <option value="">Select Transaction Type</option>
                <option value="inlet">Amount Credit in Branch</option>
                <option value="outlet">Amount Debit from Branch</option>
                <option value="total">Total Balance in Branch</option>
              </Form.Control>
            </Form.Group>
          </div>
          <Button variant="primary" type="submit" className="px-3 m-2">
            Submit
          </Button>
          <hr />
          <h2 id="money"></h2>
        </Form>
      </div>
    </div>
  );
}

export default EmployeeInletOutletMoneyForm;
