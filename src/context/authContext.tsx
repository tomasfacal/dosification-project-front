import React, { useState } from "react";
import { useCookies } from "react-cookie";

interface AuthContextType {
  token: string;
  isLoggedIn: boolean;
  role: string;
  name: string;
  lastname: string;
  email: string;
  phonenumber: string;
  speciality: string;
  job: string;
  login: (
    token: string,
    role: string,
    name: string,
    lastname: string,
    email: string,
    phonenumber: string,
    speciality: string,
    job: string
  ) => void;
  logout: () => void;
  setUserInfo: (
    name: string,
    lastname: string,
    phonenumber: string,
    speciality: string,
    job: string
  ) => void;
}

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

export const AuthContextProvider = (props: any) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token", "role"]);

  const [token, setToken] = useState(cookies.token || "");
  const [role, setRole] = useState(cookies.role || "");

  const [name, setName] = useState(localStorage.getItem("name") || "");

  const [lastname, setLastName] = useState(
    localStorage.getItem("lastname") || ""
  );

  const [email, setEmail] = useState(localStorage.getItem("email") || "");

  const [phonenumber, setPhoneNumber] = useState(
    localStorage.getItem("phonenumber") || ""
  );

  const [speciality, setSpeciality] = useState(
    localStorage.getItem("speciality") || ""
  );

  const [job, setJob] = useState(localStorage.getItem("job") || "");

  const userIsLoggedIn = !!token;

  const loginHandler = (
    token: string,
    role: string,
    name: string,
    lastname: string,
    email: string,
    phonenumber: string,
    speciality: string,
    job: string
  ) => {
    setRole(role);
    setToken(token);
    setName(name);
    setLastName(lastname);
    setEmail(email);
    setPhoneNumber(phonenumber);
    setSpeciality(speciality);
    setJob(job);
    setCookie("token", token, { path: "/" });
    setCookie("role", role, { path: "/" });
    localStorage.setItem("name", name);
    localStorage.setItem("lastname", lastname);
    localStorage.setItem("email", email);
    localStorage.setItem("phonenumber", phonenumber);
    localStorage.setItem("speciality", speciality);
    localStorage.setItem("job", job);
  };

  const logoutHandler = () => {
    setRole("");
    setToken("");
    setName("");
    setLastName("");
    setEmail("");
    setPhoneNumber("");
    setSpeciality("");
    setJob("");
    removeCookie("token");
    removeCookie("role");
    localStorage.removeItem("name");
    localStorage.removeItem("lastname");
    localStorage.removeItem("email");
    localStorage.removeItem("phonenumber");
    localStorage.removeItem("speciality");
    localStorage.removeItem("job");
  };

  const setUserInfo = (
    name: string,
    lastname: string,
    phonenumber: string,
    speciality: string,
    job: string
  ) => {
    setName(name);
    setLastName(lastname);
    setPhoneNumber(phonenumber);
    setSpeciality(speciality);
    setJob(job);
    localStorage.setItem("name", name);
    localStorage.setItem("lastname", lastname);
    localStorage.setItem("phonenumber", phonenumber);
    localStorage.setItem("speciality", speciality);
    localStorage.setItem("job", job);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    role: role,
    name: name,
    lastname: lastname,
    email: email,
    phonenumber: phonenumber,
    speciality: speciality,
    job: job,
    login: loginHandler,
    logout: logoutHandler,
    setUserInfo: setUserInfo,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
