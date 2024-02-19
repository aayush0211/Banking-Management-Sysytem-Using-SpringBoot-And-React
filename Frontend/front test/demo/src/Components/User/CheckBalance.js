import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
  Link,
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import BankServices from "../../BankService/BankServices";
import { HttpStatusCode } from "axios";
import { useSession } from "../../Security/SessionContext";
import Authentication from "../../Security/SessionContext";
function CheckBalance(props) {
  const { isLoggedIn, setIsLoggedIn } = useSession();
  const [accountId, setAccountId] = useState(props.user.id);
  const history = useHistory();
  useEffect(() => {
    if (!Authentication.checkAutherization("USER", isLoggedIn, setIsLoggedIn))
      history.push("/user_login");

    BankServices.getBalance(accountId).then((obj) => displayMassage(obj));
  }, []);

  function displayMassage(obj) {
    const message = document.getElementById("messagecb");
     const money = document.getElementById("money");
    var bool = obj.status === HttpStatusCode.Ok ? true : false;
    if (bool) {
      money.textContent = `Your Balance :- ${obj.data}Rs`;
      message.style.color = "green";
    } else {
      message.textContent = obj.response.data.message;
      message.style.color = "red";
    }
  }

  return (
    <div className="bg_profile">
      <div className="container d-flex justify-content-center align-items-center">
        <div className="px-3 mt-5" style={{color:"white"}}>
          <h1>Balance Detail</h1>
          <hr />
          <div id="messagecb"></div>
          <h2 id="money"></h2>
        </div>
      </div>
    </div>
  );
}

export default CheckBalance;
