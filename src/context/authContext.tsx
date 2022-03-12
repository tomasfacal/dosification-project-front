import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  role: "",
  name: "",
  lastname: "",
  email: "",
  phonenumber: "",
  speciality: "",
  job: "",
  login: (
    _token: string,
    _role: string,
    _name: string,
    _lastname: string,
    _email: string,
    _phonenumber: string,
    _speciality: string,
    _job: string
  ) => {},
  logout: () => {},
  setUserInfo: (
    _name: string,
    _lastname: string,
    _phonenumber: string,
    _speciality: string,
    _job: string
  ) => {},
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

  const [lastname, setLastName] = useState(
    localStorage.getItem("lastname")! ? localStorage.getItem("lastname")! : ""
  );

  const [email, setEmail] = useState(
    localStorage.getItem("email")! ? localStorage.getItem("email")! : ""
  );

  const [phonenumber, setPhoneNumber] = useState(
    localStorage.getItem("phonenumber")!
      ? localStorage.getItem("phonenumber")!
      : ""
  );

  const [speciality, setSpeciality] = useState(
    localStorage.getItem("speciality")!
      ? localStorage.getItem("speciality")!
      : ""
  );

  const [job, setJob] = useState(
    localStorage.getItem("job")! ? localStorage.getItem("job")! : ""
  );

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
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
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
    localStorage.removeItem("token");
    localStorage.removeItem("role");
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
