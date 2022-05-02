import styles from "./input_patient.module.scss";
import { TextField, Grid } from "@material-ui/core";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import InputAdornment from "@mui/material/InputAdornment";

const InputPatient = (props: any) => {
  const handleClickPencil = (event: any) => {
    props.parentCallbackEditable(props.name);
  };

  const handleChange = (event: any) => {
    props.parentCallback(event.target.name, event.target.value);
  };

  return (
    <div className={styles.ContainterInput}>
      {props.editableInput && (
        <TextField
          fullWidth
          id={"input-with-icon-textfield"}
          label={props.show_name}
          value={props.value}
          name={props.name}
          error={props.name === ""}
          helperText={props.name === "" ? props.name + "requerido" : " "}
          variant="standard"
          onChange={handleChange}
        />
      )}
      {!props.editableInput && (
        <TextField
          fullWidth
          id="input-with-icon-textfield"
          label={props.show_name}
          value={props.value}
          disabled
          InputProps={
            !props.permanentDisabled
              ? {
                  endAdornment: (
                    <InputAdornment position="end">
                      <BorderColorIcon onClick={handleClickPencil} />
                    </InputAdornment>
                  ),
                }
              : {}
          }
          variant="standard"
        />
      )}
    </div>
  );
};

export default InputPatient;
