// SessionContext.js

import React, { createContext, useState, useContext } from 'react';

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Example state for login status
  const [item,setItem]=useState(0);
  return (
    <SessionContext.Provider value={{ isLoggedIn, setIsLoggedIn,item,setItem }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  return useContext(SessionContext);
};

class Authentication
{
     checkAutherization(role,isLoggedIn,setIsLoggedIn)
    {
        console.log("in security class "+role +" "+isLoggedIn);
        if(isLoggedIn===true) {  
        const encodedRole = sessionStorage.getItem('role');
        const decodedRole = atob(encodedRole);
        console.log(encodedRole+" "+decodedRole);
        if(decodedRole===role)
        return true;
        }
this.logout();
setIsLoggedIn(false);
    return false;
    }
    logout()
    {
        sessionStorage.removeItem("role");
        sessionStorage.removeItem("token");
    }
}
export default new Authentication();