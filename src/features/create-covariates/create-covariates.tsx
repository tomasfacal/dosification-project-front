import { Fragment } from "react";
import styles from "./create-covariates.module.scss";
import { TextField, Grid } from "@material-ui/core";
import { useSimulationGlobalState } from "../../context/SimulationGlobalState";

const CreateCovariates: React.FC<any> = (props: any) => {
  const { state } = useSimulationGlobalState();
  const handleInputChange = (event: any) => {
    props.setValues(event.target.name, event.target.value);
  };

  return (
    <Fragment>
      <div className={styles.FormContainer}>
        <h1 className={styles.Title}>Covariables</h1>
        <Grid container spacing={1}>
          {props.covariates.map((covariate: string) => (
            <Grid key={covariate} item xs={12} sm={6}>
              <div className={styles.fieldContainer}>
                <TextField
                  label={props.display_covariates[covariate]}
                  name={covariate}
                  error={covariate === ""}
                  defaultValue={
                    state.covariates && state.covariates[covariate]
                      ? state.covariates[covariate]
                      : ""
                  }
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
