import React, { useState } from 'react';


const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token:string) => {},
  logout: () => {},
});

export const AuthContextProvider = (props:any) => {
    const [token, setToken] = useState(localStorage.getItem("token")!
        ? localStorage.getItem("token")!
        : ""
    ); 
  
    const userIsLoggedIn = !!token;
  
    const loginHandler = (token:string) => {
      setToken(token);
      localStorage.setItem('token', token);
    };
  
    const logoutHandler = () => {
      setToken('');
      localStorage.removeItem('token');
    };
  
    const contextValue = {
      token: token,
      isLoggedIn: userIsLoggedIn,
      login: loginHandler,
      logout: logoutHandler,
    };
  
    return (
      <AuthContext.Provider value={contextValue}>
        {props.children}
      </AuthContext.Provider>
    );
};

export default AuthContext;