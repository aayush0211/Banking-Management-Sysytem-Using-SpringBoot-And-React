import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import WelcomeMessage from './WelcomeMessage'; // Component to display user's welcome message
import CheckBalance from './CheckBalance'; // Component for checking balance
import ViewProfile from './ViewProfile'; // Component for viewing profile
import UpdateProfile from './UpdateProfile'; // Component for updating profile
import DeleteProfile from './DeleteProfile';
import UserTransactionForm from './UserTransactionForm';
import MoneyTransferForm from './MoneyTransferForm';
import AddCard from './AddCard';
import CardListForm from './CardListForm';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useSession } from '../../Security/SessionContext';
import Authentication from '../../Security/SessionContext';
import ChangePassword from './ChangePassword';
import { HttpStatusCode } from 'axios';
import BankServices from '../../BankService/BankServices';
// Import other components for remaining options

const WelcomeUser = () => {
  // State to track the active option
  const [render,setRender]=useState(false);
  const [activeOption, setActiveOption] = useState('home');
  const location=useLocation();
  const { isLoggedIn, setIsLoggedIn } = useSession();
  const history=useHistory();
const [user,setUser]=useState();
const { item, setItem } = useSession();

  useEffect(()=>{
    if(!Authentication.checkAutherization('USER',isLoggedIn,setIsLoggedIn))
    history.push('/user_login');
  BankServices.getUser(item).then((obj)=>displayMassage(obj));
   console.log(user);
  console.log(item);
  },[])

  // Function to handle option selection
  const handleOptionClick = (option) => {
    setActiveOption(option);
  };
  function displayMassage(obj){
    const message = document.getElementById('message');
  var bool= obj.status===HttpStatusCode.Ok ? true :false;
  if (bool) {
   // message.textContent = `Your Balance :- ${obj.data}`;
    message.style.color = 'green';
    setUser(obj.data);
    setRender(true);
  } else {
    message.textContent = obj.response.data.message;
    message.style.color = 'red';
  }
  }
 const defaultRender = () => {
   console.log("in default render in welcome page !!");
   setActiveOption("home");
   setRender(false);
   BankServices.getUser(item).then((obj) => displayMassage(obj));
 };
  return (
    <Container fluid>
      <div id="message"></div>
      {render === true && (
        <Row>
          <Col md={2}>
            <Nav className="flex-column">
              <Nav.Link onClick={() => handleOptionClick("home")}>
                Home
              </Nav.Link>
              <Nav.Link onClick={() => handleOptionClick("checkBalance")}>
                Check Balance
              </Nav.Link>
              <Nav.Link onClick={() => handleOptionClick("viewProfile")}>
                View Profile
              </Nav.Link>
              <Nav.Link onClick={() => handleOptionClick("changePassword")}>
                Change Password
              </Nav.Link>
              <Nav.Link onClick={() => handleOptionClick("updateProfile")}>
                Update Profile
              </Nav.Link>
              <Nav.Link onClick={() => handleOptionClick("deleteProfile")}>
                Delete Account
              </Nav.Link>
              <Nav.Link onClick={() => handleOptionClick("transferMoney")}>
                Transfer Money
              </Nav.Link>
              <Nav.Link onClick={() => handleOptionClick("getCard")}>
                Get New Card
              </Nav.Link>
              <Nav.Link onClick={() => handleOptionClick("cardList")}>
                Cards Detail
              </Nav.Link>
              <Nav.Link onClick={() => handleOptionClick("transactionHistory")}>
                Transaction History
              </Nav.Link>
            </Nav>
          </Col>
          <Col md={10}>
            {activeOption === "home" && <WelcomeMessage user={user} />}
            {activeOption === "checkBalance" && <CheckBalance user={user} />}
            {activeOption === "viewProfile" && <ViewProfile user={user} />}
            {activeOption === "changePassword" && (
              <ChangePassword user={user} />
            )}
            {activeOption === "updateProfile" && (
              <UpdateProfile defaultRenderHandler={defaultRender} user={user} />
            )}
            {activeOption === "deleteProfile" && (
              <DeleteProfile defaultRenderHandler={defaultRender} user={user} />
            )}
            {activeOption === "transferMoney" && (
              <MoneyTransferForm user={user} />
            )}
            {activeOption === "getCard" && <AddCard user={user} />}
            {activeOption === "cardList" && <CardListForm user={user} />}
            {activeOption === "transactionHistory" && ( 
              <UserTransactionForm user={user} />
            )}
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default WelcomeUser;
