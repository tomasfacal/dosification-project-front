import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function FormComponent(props: any) {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  });

  const change = (event: any) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    props.onSubmit(formState);
    // clear form
    setFormState({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
    });
  };

  return (
    <form>
      <TextField
        name="firstName"
        label="First name"
        value={formState.firstName}
        onChange={change}
      />
      <br />
      <TextField
        name="lastName"
        label="Last Name"
        value={formState.lastName}
        onChange={change}
      />
      <br />
      <TextField
        name="username"
        label="Username"
        value={formState.username}
        onChange={change}
      />
      <br />
      <TextField
        name="email"
        label="Email"
        value={formState.email}
        onChange={change}
      />
      <br />
      <Button onClick={onSubmit} color="primary">
        Submit
      </Button>
    </form>
  );
}
