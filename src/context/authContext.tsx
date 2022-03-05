import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  role: "",
  name: "",
  login: (_token: string, _role: string, _name:string) => {},
  logout: () => {},
});

export const AuthContextProvider = (props: any) => {
  const [token, setToken] = useState(
    localStorage.getItem("token")! ? localStorage.getItem("token")! : ""
  );
  const [role, setRole] = useState(
    localStorage.getItem("role")! ? localStorage.getItem("role")! : ""
  );

  const [name, setName] = useState(
    localStorage.getItem("name")! ? localStorage.getItem("name")! : ""
  );

  const userIsLoggedIn = !!token;

  const loginHandler = (token: string, role: string, name:string) => {
    setRole(role);
    setToken(token);
    setName(name);
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("name", name);
  };

  const logoutHandler = () => {
    setRole("");
    setToken("");
    setName("");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    role: role,
    name: name,
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
