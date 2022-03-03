import { Fragment } from "react";
import styles from "./create-covariates.module.scss";
import { TextField, Grid } from "@material-ui/core";

const CreateCovariates = (props: any) => {
  const handleInputChange = (event: any) => {
    props.setValues(event.target.name, event.target.value);
  };

  return (
    <Fragment>
      <div className={styles.FormContainer}>
        <h1 className={styles.Title}>Covariables</h1>
        <Grid container spacing={2}>
          {props.covariates.map((covariate: string) => (
            <Grid key={covariate} item xs={12} sm={6}>
              <div className={styles.fieldContainer}>
                <TextField
                  label={covariate}
                  name={covariate}
                  error={covariate === ""}
                  helperText={
                    covariate === "" ? { covariate } + "requerido" : " "
                  }
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

export default CreateCovariates;
