import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  role: "",
  login: (token: string, role: string) => {},
  logout: () => {},
});

export const AuthContextProvider = (props: any) => {
  const [token, setToken] = useState(
    localStorage.getItem("token")! ? localStorage.getItem("token")! : ""
  );
  const [role, setRole] = useState(
    localStorage.getItem("role")! ? localStorage.getItem("role")! : ""
  );

  const userIsLoggedIn = !!token;

  const loginHandler = (token: string, role: string) => {
    setRole(role);
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
  };

  const logoutHandler = () => {
    setRole("");
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    role: role,
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
