import { Fragment } from "react";
import styles from "./create-observation.module.scss";
import { TextField, Grid } from "@material-ui/core";

const CreateObservation = (props: any) => {
  const handleInputChange = (event: any) => {
    props.setValues(event.target.name, event.target.value);
  };

  return (
    <Fragment>
      <div className={styles.FormContainer}>
        <Grid container spacing={2}>
          {props.fieldsList.map((field: string) => (
            <Grid key={field} item xs={6} sm={6}>
              <div className={styles.fieldContainer}>
                <TextField
                  label={field}
                  name={field}
                  error={field === ""}
                  helperText={field === "" ? { field } + "requerido" : " "}
                  onChange={handleInputChange}
                />
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </Fragment>
  );
};

export default CreateObservation;
