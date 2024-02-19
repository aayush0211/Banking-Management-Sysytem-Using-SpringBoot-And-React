import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import WelcomeMessage from './WelcomeMessage'; // Component to display user's welcome message
import ViewProfile from './ViewProfile'; // Component for viewing profile
import UpdateProfile from './UpdateProfile'; // Component for updating profile
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useSession } from '../../Security/SessionContext';
import Authentication from '../../Security/SessionContext';
import ChangePassword from './ChangePassword';
import BankServices from '../../BankService/BankServices';
import { HttpStatusCode } from 'axios';
import AddBranch from './AddBranch';
import InletOutletMoneyForm from './InletOutletMoneyForm';
import TransactionForm from './TransactionForm';
import AdminBranchList from './AdminBranchList';
import AddEmployee from './AddEmployee';
import UpdateBranch from './UpdateBranch';
import EmployeeList from './EmployeeList';
import DeleteEmployee from './DeleteEmployee';
// Import other components for remaining options

const WelcomeAdmin = () => {
  // State to track the active option
  const [activeOption, setActiveOption] = useState('home');
  const [render,setRender]=useState(false);
  const { isLoggedIn, setIsLoggedIn } = useSession();
  const { item, setItem } = useSession();
  const history=useHistory();
const [user,setUser]=useState();
const [pass,setPass]=useState();

  useEffect(()=>{
    if(!Authentication.checkAutherization('ADMIN',isLoggedIn,setIsLoggedIn))
      history.push('/employee_login');
    console.log(item);
  BankServices.getAdmin(item).then((obj)=>displayMassage(obj));

   console.log(user);
  console.log(item);
//setUser(Test.getEmployee());
//setRender(true);
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
 const updateBranch=(obj)=>{
  setPass(obj);
    setActiveOption('updateBranch');
  }
  const defaultRender = () => {
   
    setActiveOption("home");
  };
 const addManagerHandler=(branch)=>{
    setPass(branch);
    setActiveOption('addEmployee');
  }
  const deleteEmployee = (obj, flag = false) => {
    if (!flag) {
      setPass(obj);
      setActiveOption('deleteEmployee');
    } else {setActiveOption("employeeList"); }
 }
  return (
    <Container fluid>
      {" "}
      <div id="message"></div>
      {render === true && (
        <Row>
          {/* Left side: User's welcome message */}
          <Col md={2}>
            <Nav className="flex-column">
              <Nav.Link onClick={() => handleOptionClick("home")}>
                Home
              </Nav.Link>
              <Nav.Link onClick={() => handleOptionClick("addBranch")}>
                Add Branch
              </Nav.Link>
              <Nav.Link onClick={() => handleOptionClick("branch")}>
                Branch List
              </Nav.Link>
              <Nav.Link onClick={() => handleOptionClick("employeeList")}>
                Manager List
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
              <Nav.Link onClick={() => handleOptionClick("inletOutlet")}>
                Money Inlet/Outlet in Branch
              </Nav.Link>
              <Nav.Link onClick={() => handleOptionClick("transactionHistory")}>
                Transactions
              </Nav.Link>

              {/* Add other navigation options */}
            </Nav>
          </Col>
          {/* Right side: Vertical navigation and component rendering */}
          <Col md={10}>
            {/* Render corresponding component based on activeOption */}
            {activeOption === "home" && <WelcomeMessage user={user} />}
            {activeOption === "addBranch" && <AddBranch user={user} />}
            {activeOption === "branch" && (
              <AdminBranchList
                updateBranchHandler={updateBranch}
                addManagerHandler={addManagerHandler}
                user={user}
              />
            )}
            {activeOption === "updateBranch" && <UpdateBranch branch={pass} />}
            {activeOption === "employeeList" && (
              <EmployeeList deleteHandler={deleteEmployee} branch={pass} />
            )}
            {activeOption === "addEmployee" && (
              <AddEmployee defaultRenderHandler={defaultRender} branch={pass} />
            )}
            {activeOption === "viewProfile" && <ViewProfile user={user} />}
            {activeOption === "changePassword" && (
              <ChangePassword user={user} />
            )}
            {activeOption === "updateProfile" && <UpdateProfile user={user} />}
            {activeOption === "inletOutlet" && (
              <InletOutletMoneyForm user={user} />
            )}
            {activeOption === "transactionHistory" && (
              <TransactionForm user={user} />
            )}
            {activeOption === "deleteEmployee" && (
              <DeleteEmployee
                deleteEmployeeHandler={deleteEmployee}
                user={pass}
              />
            )}
            {/* Render other components for remaining options */}
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default WelcomeAdmin;
