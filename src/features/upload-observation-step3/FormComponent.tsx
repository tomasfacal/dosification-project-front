import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from "./upload-observation-step3.module.scss";

export default function FormComponent(props: any) {
  const [formState, setFormState] = useState(props.formsFields);

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
    setFormState(props.formsFields);
  };

  return (
    <form className={styles.Form}>
      {Object.keys(props.formsFields).map((field: string) => (
        <TextField
          name={field}
          label={field}
          value={formState[field]}
          onChange={change}
          className={styles.Field}
        />
      ))}
      <Button onClick={onSubmit} color="primary" variant="contained">
        Agregar
      </Button>
    </form>
  );
}
