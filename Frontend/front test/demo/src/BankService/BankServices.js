import axios from "axios";
import { useState, useEffect } from "react";  
const Branch_Url = "http://localhost:8080/branches";
const Employee_Url = "http://localhost:8080/employees";
const User_Url = "http://localhost:8080/accounts";
const Admin_Url = "http://localhost:8080/admin";
const Card_Url = "http://localhost:8080/cards";
const Transaction_Url = "http://localhost:8080/transactions";
class BankService {
  //Branch section ---------------------------------------------------------------------------------------------
  async addBranch(branch) {
    jwtTokenHandler();
    console.log(branch);
    var obj = await axios
      .post(`${Admin_Url}/branches`, branch)
      .then((response) => {
        console.log(response.data + " " + response.status);
        return response;
      })
      .catch((e) => e);
    return obj;
  }

  async updateBranch(branch) {
    jwtTokenHandler();
    console.log(branch);
    var obj = await axios
      .put(`${Branch_Url}/${branch.id}`, branch)
      .then((response) => {
        console.log(response.data + " " + response.status);
        return response;
      })
      .catch((e) => e);
    return obj;
  }
  async getBranches() {
    var branchlist = await axios
      .get("http://localhost:8080/signin/getAllBranches")
      .then((response) => {
        console.log(response.data + " " + response.status);
        return response;
      })
      .catch((e) => e);
    return branchlist;
  }
  //Admin Section   ---------------------------------------------------------------------------------------
  async updateAdmin(admin) {
    jwtTokenHandler();
    console.log(admin);
    var obj = await axios
      .put(`${Admin_Url}/${admin.id}`, admin)
      .then((response) => {
        console.log(response.data + " " + response.status);
        return response;
      })
      .catch((e) => e);
    return obj;
  }

  async AdminUpdatePassword(id, admin) {
    jwtTokenHandler();
    console.log(admin);
    var obj = await axios
      .post(`${Admin_Url}/${id}`, admin)
      .then((response) => {
        console.log(response.data + " " + response.status);
        return response;
      })
      .catch((e) => e);
    return obj;
  }
  async getAdmin(id) {
    jwtTokenHandler();
    var obj = await axios
      .get(`${Admin_Url}/${id}`)
      .then((response) => {
        console.log(response.data + " " + response.status);
        return response;
      })
      .catch((e) => e);
    return obj;
  }

  //Employee Section  -------------------- ------------------------------------------------------------------
  async employeeLogin(LoginForm) {
    console.log(LoginForm);
    var obj = await axios
      .post("http://localhost:8080/signin/employee", LoginForm)
      .then((response) => {
        sessionStorage.setItem("token", response.data.jwtToken);
        sessionStorage.setItem("role", btoa(response.data.role));
        console.log(response.data + " " + response.status);
        return response;
      })
      .catch((e) => e);

    return obj;
  }
  async updateEmployee(employee) {
    jwtTokenHandler();
    console.log(employee);
    var obj = await axios
      .put(`${Employee_Url}/${employee.id}`, employee)
      .then((response) => {
        console.log(response.data + " " + response.status);
        return response;
      })
      .catch((e) => e);
    return obj;
  }
  async changePasswordEmployee(id, obj) {
    jwtTokenHandler();
    console.log(obj);
    var obj = await axios
      .post(`${Employee_Url}/${id}`, obj)
      .then((response) => {
        console.log(response.data + " " + response.status);
        return response;
      })
      .catch((e) => e);
    return obj;
  }
  async addEmployee(employee) {
    jwtTokenHandler();
    var obj = await axios
      .post(
        `${Admin_Url}/employees`,
        employee
      //    ,{headers: {
      //     'Content-Type': 'multipart/form-data',
      //  },}
      )
      .then((response) => {
        console.log(response.data + " " + response.status);
        return response;
      })
      .catch((e) => e);
    return obj;
  }
  async getEmployees() {
    jwtTokenHandler();
    var obj = await axios
      .get(Employee_Url)
      .then((response) => {
        console.log(response.data + " " + response.status);
        return response;
      })
      .catch((e) => e);
    return obj;
  }
  async getEmployee(id) {
    jwtTokenHandler();
    var obj = await axios
      .get(`${Employee_Url}/${id}`)
      .then((response) => {
        console.log(response.data + " " + response.status);
        return response;
      })
      .catch((e) => e);
    return obj;
  }
  async deleteEmployees(id) {
    jwtTokenHandler();
    var obj = await axios
      .delete(`${Employee_Url}/${id}`)
      .then((response) => {
        console.log(response.data + " " + response.status);
        return response;
      })
      .catch((e) => e);
    return obj;
  }

  //User & Account Section ---------------------------------------------------------------------------------------------
  async addUser(newuser) {
    console.log(newuser);
    var obj = await axios
      .post(`http://localhost:8080/signup/account`, newuser)
      .then((response) => {
        console.log(response.data + " " + response.status);
        return response;
      })
      .catch((e) => e);
    return obj;
  }
  async userLogin(newuser) {
    console.log(newuser);
    var obj = await axios
      .post(`http://localhost:8080/signin/account`, newuser)
      .then((response) => {
        sessionStorage.setItem("token", response.data.jwtToken);
        sessionStorage.setItem("role", btoa(response.data.role));
        console.log(response.data.role + " " + response.status);
        return response;
      })
      .catch((e) => e);
    return obj;
  }
  async userChangePassword(id, obj) {
    jwtTokenHandler();
    console.log(obj);
    var obj = await axios
      .post(`${User_Url}/${id}`, obj)
      .then((response) => {
        console.log(response.data + " " + response.status);
        return response;
      })
      .catch((e) => e);
    return obj;
  }
  async getUser(id) {
    jwtTokenHandler();
    var obj = await axios
      .get(`${User_Url}/${id}`)
      .then((response) => {
        console.log(response.data + " " + response.status);
        return response;
      })
      .catch((e) => e);
    return obj;
  }
  async deleteUser(id) {
    jwtTokenHandler();
    var obj = await axios
      .delete(`${User_Url}/${id}`)
      .then((response) => {
        console.log(response.data + " " + response.status);
        return response;
      })
      .catch((e) => e);
    return obj;
  }
  async updateUser(user) {
    jwtTokenHandler();
    var obj = await axios
      .put(`${User_Url}/${user.id}`, user)
      .then((response) => {
        console.log(response.data + " " + response.status);
        return response;
      })
      .catch((e) => e);
    return obj;
  }
  async getBalance(id) {
    jwtTokenHandler();
    var obj = await axios
      .get(`${User_Url}/balance/${id}`)
      .then((response) => {
        console.log(response.data + " " + response.status);
        return response;
      })
      .catch((e) => e);
    return obj;
  }

  async suspendUser(id) {
    jwtTokenHandler();
    var obj = await axios
      .get(`${User_Url}/toSuspendAccount/${id}`)
      .then((response) => {
        console.log(response.data + " " + response.status);
        return response;
      })
      .catch((e) => e);
    return obj;
  }
  async getAllAccountsByBranchId(branchId) {
    jwtTokenHandler();
    var obj = await axios
      .get(`${User_Url}/getAllAccountsByBranchId/${branchId}`)
      .then((response) => {
        console.log(response.data + " " + response.status);
        return response;
      })
      .catch((e) => e);
    return obj;
  }
  async getAllActiveAccountsByBranchId(branchId) {
    jwtTokenHandler();
    var obj = await axios
      .get(`${User_Url}/getAllActiveAccountsByBranchId/${branchId}`)
      .then((response) => {
        console.log(response.data + " " + response.status);
        return response;
      })
      .catch((e) => e);
    return obj;
  }
  async getAllSuspendedActiveAccountsByBranchId(branchId) {
    jwtTokenHandler();
    var obj = await axios
      .get(`${User_Url}/getAllSuspendedAccountsByBranchId/${branchId}`)
      .then((response) => {
        console.log(response.data + " " + response.status);
        return response;
      })
      .catch((e) => e);
    return obj;
  }
  async getAllCloseAccountsByBranchId(branchId) {
    jwtTokenHandler();
    var obj = await axios
      .get(`${User_Url}/getAllCloseAccountsByBranchId/${branchId}`)
      .then((response) => {
        console.log(response.data + " " + response.status);
        return response;
      })
      .catch((e) => e);
    return obj;
  }
  async getAllAccountsTobeSuspended(branchId) {
    jwtTokenHandler();
    var obj = await axios
      .get(`${User_Url}/getAllInactiveAccounts/${branchId}`)
      .then((response) => {
        console.log(response.data + " " + response.status);
        return response;
      })
      .catch((e) => e);
    return obj;
  }
  // CARD SECTION ----------------------------------------------------------------------------------------------

  async getActiveCards(AccountId) {
    jwtTokenHandler();
    var obj = await axios
      .get(`${Card_Url}/getAllActiveCardsByAccountNumber/${AccountId}`)
      .then((response) => {
        console.log(response.data + " " + response.status);
        return response;
      })
      .catch((err) => {
        return err;
      });
    return obj;
  }
  async getInActiveCards(AccountId) {
    jwtTokenHandler();
    var obj = await axios
      .get(`${Card_Url}/getAllInactiveCardsByAccountNumber/${AccountId}`)
      .then((response) => {
        console.log(response.data + " " + response.status);
        return response;
      })
      .catch((err) => {
        return err;
      });
    return obj;
  }
  async updateAmountLimit(cardId, amount) {
    jwtTokenHandler();
    var obj = await axios
      .put(`${Card_Url}/${cardId}`, {
      
          amount: amount,
      
      })
      .then((response) => {
        console.log(response.data + " " + response.status);
        return response;
      })
      .catch((err) => {
        return err;
      });
    return obj;
  }
  async updateCard(cardId) {
    jwtTokenHandler();
    var obj = await axios
      .put(`${Card_Url}/renewCard/${cardId}`)
      .then((response) => {
        console.log(response.data + " " + response.status);
        return response;
      })
      .catch((err) => {
        return err;
      });
    return obj;
  }
  async addCard(accountId, card) {
    jwtTokenHandler();
    var obj = await axios
      .post(`${Card_Url}/${accountId}`, card)
      .then((response) => {
        console.log(response.data + " " + response.status);
        return response;
      })
      .catch((err) => {
        return err;
      });
    return obj;
  }

  //Transactions Section ---------------------------------------------------------------------------------------
  async getAllTransactions() {
    jwtTokenHandler();
    var list = await axios
      .get(Transaction_Url)
      .then((response) => {
        console.log(response.data + " " + response.status);
        return response;
      })
      .catch((e) => e);
    return list;
  }
  async getAllBranchWiseTransactions(branchId) {
    jwtTokenHandler();
    var list = await axios
      .get(`${Transaction_Url}/getAllTransactionByBranch/${branchId}`)
      .then((response) => {
        console.log(response.data + " " + response.status);
        return response;
      })
      .catch((e) => e);
    return list;
  }
  async getAllAccountWiseTransactions(accountId) {
    jwtTokenHandler();
    var list = await axios
      .get(`${Transaction_Url}/${accountId}`)
      .then((response) => {
        console.log(response.data + " " + response.status);
        return response;
      })
      .catch((e) => e);
    return list;
  }
  async getYearlyAccountWiseTransactions(accountId, obj) {
    jwtTokenHandler();
    var list = await axios
      .get(`${Transaction_Url}/account/yearly/${accountId}`, {
        params: {
          year: obj,
        },
      })
      .then((response) => {
        console.log(response.data + " " + response.status);
        return response;
      })
      .catch((e) => e);
    return list;
  }
  async getDailyAccountWiseTransactions(accountId, obj) {
    jwtTokenHandler();
    var list = await axios
      .get(`${Transaction_Url}/account/date/${accountId}`, {
        params: {
          date: obj,
        },
      })
      .then((response) => {
        console.log(response.data + " " + response.status);
        return response;
      })
      .catch((e) => e);
    return list;
  }
  async getMonthlyAccountWiseTransactions(accountId, obj1, obj2) {
    jwtTokenHandler();
    var list = await axios
      .get(`${Transaction_Url}/account/monthly/${accountId}`, {
        params: {
          month: obj1,
          year: obj2,
        },
      })
      .then((response) => {
        console.log(response.data + " " + response.status);
        return response;
      })
      .catch((e) => e);
    return list;
  }
  async getMonthlyTransactions(obj1, obj2) {
    jwtTokenHandler();
    var list = await axios
      .get(`${Transaction_Url}/monthly`, {
        params: {
          month: obj1,
          year: obj2,
        },
      })
      .then((response) => {
        console.log(response.data + " " + response.status);
        return response;
      })
      .catch((e) => e);
    return list;
  }
  async getMonthlyBranchWiseTransactions(obj1, obj2, branchId) {
    jwtTokenHandler();
    var list = await axios
      .get(`${Transaction_Url}/monthly/${branchId}`, {
        params: {
          month: obj1,
          year: obj2,
        },
      })
      .then((response) => {
        console.log(response.data + " " + response.status);
        return response;
      })
      .catch((e) => e);
    return list;
  }
  async getDateWiseTransactions(obj) {
    jwtTokenHandler();
    var list = await axios
      .get(`${Transaction_Url}/date`, {
        params: {
          date: obj,
        },
      })
      .then((response) => {
        console.log(response.data + " " + response.status);
        return response;
      })
      .catch((e) => e);
    return list;
  }
  async getYearlyTransactions(obj) {
    jwtTokenHandler();
    var list = await axios
      .get(`${Transaction_Url}/yearly`, {
        params: {
          year: obj,
        },
      })
      .then((response) => {
        console.log(response.data + " " + response.status);
        return response;
      })
      .catch((e) => e);
    return list;
  }
  async getYearlyBranchWiseTransactions(obj, branchId) {
    jwtTokenHandler();
    var list = await axios
      .get(`${Transaction_Url}/yearly/${branchId}`, {
        params: {
          year: obj,
        },
      })
      .then((response) => {
        console.log(response.data + " " + response.status);
        return response;
      })
      .catch((e) => e);
    return list;
  }

  async getDateWiseBranchWiseTransactions(obj, branchId) {
    jwtTokenHandler();
    var list = await axios
      .get(`${Transaction_Url}/date/${branchId}`, {
        params: {
          date: obj,
        },
      })
      .then((response) => {
        console.log(response.data + " " + response.status);
        return response;
      })
      .catch((e) => e);
    return list;
  }
  async getTotalAmountInBranch(branchId) {
    jwtTokenHandler();
    var obj = await axios
      .get(`${Transaction_Url}/getTotalAmountInBranch/${branchId}`)
      .then((response) => {
        console.log(response.data + " " + response.status);
        return response;
      })
      .catch((e) => e);
    return obj;
  }
  async getAllOutletAmountInBranch(branchId) {
    jwtTokenHandler();
    var obj = await axios
      .get(`${Transaction_Url}/getAllOutletAmountInBranch/${branchId}`)
      .then((response) => {
        console.log(response.data + " " + response.status);
        return response;
      })
      .catch((e) => e);
    return obj;
  }
  async getAllInletAmountInBranch(branchId) {
    jwtTokenHandler();
    var obj = await axios
      .get(`${Transaction_Url}/getAllInletAmountInBranch/${branchId}`)
      .then((response) => {
        console.log(response.data + " " + response.status);
        return response;
      })
      .catch((e) => e);
    return obj;
  }
  async transferMoneyByCard(obj) {
    jwtTokenHandler();
    var obj = await axios
      .post(`${Transaction_Url}/transferMoneyByCard/${obj.CVV}`, obj)
      .then((response) => {
        console.log(response.data + " " + response.status);
        return response;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
    return obj;
  }
  async transferMoneyByEmail(obj) {
    jwtTokenHandler();
    var obj = await axios
      .post(`${Transaction_Url}`, obj)
      .then((response) => {
        console.log(response.data + " " + response.status);
        return response;
      })
      .catch((err) => {
        return err;
      });
    return obj;
  }
}

function jwtTokenHandler() {
  const token = sessionStorage.getItem("token") || "";
  // Set axios default headers with token
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default new BankService();
