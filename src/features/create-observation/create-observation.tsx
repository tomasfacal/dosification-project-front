import React, { Fragment, useState, useEffect } from "react";
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
          {props.covariates.map((covariate: string) => (
            <Grid key={covariate} item xs={6} sm={2}>
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

export default CreateObservation;
