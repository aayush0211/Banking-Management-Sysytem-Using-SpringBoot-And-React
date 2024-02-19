import { HttpStatusCode } from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import BankServices from "../../BankService/BankServices";
import Authentication, { useSession } from "../../Security/SessionContext";
import UserTransactionList from "./UserTransactionList";
function UserTransactionForm(props) {
  const { isLoggedIn, setIsLoggedIn } = useSession();
  const [transactionType, setTransactionType] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [accountId, setaccountId] = useState(props.user.id);
  const [list, setList] = useState([]);
  const [render, setRender] = useState(false);
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    if (!Authentication.checkAutherization("USER", isLoggedIn, setIsLoggedIn))
      history.push("/user_login");
  }, []);
  const handleTransactionTypeChange = (event) => {
    const value = event.target.value;
    setTransactionType(value);

    // Reset other state values when transaction type changes
    setSelectedDate("");
    setSelectedMonth("");

    setSelectedYear("");
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    // You can perform actions based on the selected transaction type and values here
    console.log("Transaction Type:", transactionType);
    console.log("Selected Date:", selectedDate);
    console.log("Selected Month:", selectedMonth);
    console.log("Selected Year:", selectedYear);
    console.log("Selected Branch:", accountId);
    if (transactionType === "all") {
      BankServices.getAllAccountWiseTransactions(accountId).then((obj) =>
        displayMassage(obj)
      );
    } else if (transactionType === "date") {
      BankServices.getDailyAccountWiseTransactions(
        accountId,
        selectedDate
      ).then((obj) => displayMassage(obj));
    } else if (transactionType === "monthly") {
      const parts = selectedMonth.split("-");
      BankServices.getMonthlyAccountWiseTransactions(
        accountId,
        parts[1],
        parts[0]
      ).then((obj) => displayMassage(obj));
    } else if (transactionType === "yearly") {
      BankServices.getYearlyAccountWiseTransactions(
        accountId,
        selectedYear
      ).then((obj) => displayMassage(obj));
    }
  };

  function displayMassage(obj) {
    const message = document.getElementById("messaget");
    var bool = obj.status === HttpStatusCode.Ok ? true : false;
    if (bool) {
     // message.textContent = "List of Transactions :- ";
      message.style.color = "green";
      setList(obj.data);
      setRender(true);
      // history.push('/employee/transactionList',{ list:obj.data });
    } else {
      message.textContent = obj.response.data.message;
      message.style.color = "red";
      setRender(false);
    }
  }

  return (
    <div className="bg_adduser">
      <div className="container d-flex justify-content-center align-items-center">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="transactionType" className="py-3">
            <h2>Transaction Type</h2>
            <hr />
            <Form.Control
              as="select"
              required
              value={transactionType}
              onChange={handleTransactionTypeChange}
            >
              <option value="">Select Transaction Type</option>
              <option value="date">Date Wise Transactions</option>
              <option value="monthly">Monthly Transactions</option>
              <option value="yearly">Yearly Transactions</option>
              <option value="all">All Transactions</option>
            </Form.Control>
          </Form.Group>
          {transactionType === "date" && (
            <Form.Group controlId="selectedDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                max={new Date().toISOString().split("T")[0]}
                required
                value={selectedDate}
                onChange={handleDateChange}
              />
            </Form.Group>
          )}
          {transactionType === "monthly" && (
            <Form.Group controlId="selectedMonth">
              <Form.Label>Month</Form.Label>
              <Form.Control
                type="month"
                max={new Date().toISOString().split("-").slice(0, 2).join("-")}
                required
                value={selectedMonth}
                onChange={handleMonthChange}
              />
            </Form.Group>
          )}
          {transactionType === "yearly" && (
            <Form.Group controlId="selectedYear">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="number"
                min="2020"
                max="2024"
                step="1"
                required
                value={selectedYear}
                onChange={handleYearChange}
              />
            </Form.Group>
          )}
          <Button variant="primary" type="submit" className="my-2">
            Submit
          </Button>
        </Form>
      </div>
      <div id="messaget"></div>
      {render === true && <UserTransactionList list={list} />}
    </div>
  );
}

export default UserTransactionForm;
