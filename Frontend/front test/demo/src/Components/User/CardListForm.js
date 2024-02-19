import { HttpStatusCode } from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import BankServices from "../../BankService/BankServices";
import Authentication, { useSession } from "../../Security/SessionContext";
import CardList from "./CardList";
import UpdateCard from "./UpdateCard";
function CardListForm(props) {
  const { isLoggedIn, setIsLoggedIn } = useSession();
  const [cardType, setcardType] = useState("");
  const [selectedAccount, setselectedAccount] = useState(0);
  const [item, setItem] = useState();
  const [list, setList] = useState();
  const history = useHistory();
  const [isActive, setisActive] = useState(false);
  const [render, setRender] = useState(false);
  const [updateRender, setUpdateRender] = useState(false);
  useEffect(() => {
    if (!Authentication.checkAutherization("USER", isLoggedIn, setIsLoggedIn))
      history.push("/user_login");
    setselectedAccount(props.user.id);
  }, []);
  const handlecardTypeChange = (event) => {
    const value = event.target.value;
    setcardType(value);
  };
  const handleSubmit = async (event = null) => {
    if (event !== null) event.preventDefault();
    setUpdateRender(false);
    // You can perform actions based on the selected transaction type and values here
    console.log("cardType Type:", cardType);
    console.log("Selected Account:", selectedAccount);
    if (cardType === "active") {
      BankServices.getActiveCards(selectedAccount).then((obj) =>
        displayMassage(obj)
      );
      setisActive(true);
    } else if (cardType === "inActive") {
      BankServices.getInActiveCards(selectedAccount).then((obj) =>
        displayMassage(obj)
      );
      setisActive(false);
    }
  };
  function reRender() {
    console.log("successfully renew !!");
    handleSubmit();
  }
  function updateHandler(item) {
    setItem(item);
    setRender(false);
    setUpdateRender(true);
  }
  function cardListRender() {
    setUpdateRender(false);
    handleSubmit();
  }
  function displayMassage(obj) {
    const message = document.getElementById("messagecl");
    var bool = obj.status === HttpStatusCode.Ok ? true : false;
    if (bool) {
      // message.textContent = 'List of Cards :- ';
      message.style.color = "green";
      setList(obj.data);
      setRender(true);
      setUpdateRender(false);
    } else {
      message.textContent = obj.response.data.message;
      message.style.color = "red";
    }
  }

  return (
    <div className="bg_adduser">
      <div className="container d-flex justify-content-center align-items-center">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="cardType" className="py-3">
            <h3>Card Type</h3>
            <hr />
            <Form.Control
              as="select"
              required
              value={cardType}
              onChange={handlecardTypeChange}
            >
              <option value="">Select Card Type</option>
              <option value="active">Active Cards</option>
              <option value="inActive">InActive Cards</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <div id="messagecl"></div>
        </Form>
      </div>
      {render === true && (
        <CardList
          list={list}
          isActive={isActive}
          renderHandler={reRender}
          updateHandler={updateHandler}
        />
      )}
      {updateRender === true && (
        <UpdateCard cardListRenderHandler={cardListRender} card={item} />
      )}
    </div>
  );
}

export default CardListForm;
