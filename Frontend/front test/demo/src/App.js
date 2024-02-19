import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BranchList from './Components/BranchList.js';
 import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddUser from './Components/User/AddUser.js';
import UserLoginForm from './Components/User/UserLoginForm.js';
import EmployeeLoginForm from './Components/Employee/EmployeeLoginForm.js';
import AboutUs from './Components/AboutUs.js';
import Header from './Components/Header.js';
import Home from './Components/Home/MyPages/Home.js';
import MyMarguee from './Components/Home/MyPages/MyMarguee.js';
import Footer from './Components/Home/MyPages/Footer.js';
import WelcomeUser from './Components/User/WelcomeUser.js';
import WelcomeEmployee from './Components/Employee/WelcomeEmployee.js';
import WelcomeAdmin from './Components/Admin/WelcomeAdmin.js';


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Header/>
      <MyMarguee/>
      <Switch>
      <Route exact path='/admin/welcome' component={WelcomeAdmin} ></Route>
          <Route exact path='/employee/welcome' component={WelcomeEmployee} ></Route>
          <Route exact path='/user/welcome' component={WelcomeUser} ></Route>
          <Route exact path='/addUser' component={AddUser} ></Route>
          <Route exact path='/user_login' component={UserLoginForm} ></Route>
          <Route exact path='/employee_login' component={EmployeeLoginForm} ></Route>
          <Route exact path='/branchList' component={BranchList} ></Route>
          <Route exact path='/aboutUs' component={AboutUs} ></Route>
          <Route exact path='/' component={Home} ></Route>
        </Switch> 
      <Footer/>
      </header>
    </div>
  );
}

export default App;

