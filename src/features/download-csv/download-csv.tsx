import { Grid, Button } from "@material-ui/core";
import { useState, useEffect } from "react";
import API from "../../networking/api-service";
import { API_ROUTES } from "../../networking/api-routes";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Error from "../error/error";
import styles from "./download-csv.module.scss";

type Props = {
  document_number: string | undefined;
};

const DownloadCSVModal = ({ document_number }: Props) => {
  const [models, setModels] = useState([] as ModelInfo[]);
  const [model, setModel] = useState(0);
  const [error, setError] = useState("");

  const fetchModels = async () => {
    try {
      const response = await API.get(API_ROUTES.MODEL_DRUGS +`${document_number}/models_for_patient`)
      setModels(response.data);
      setModel(response.data[0]);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  const handleInputChange = (event: any) => {
    setModel(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    try {
      const currentModel = models.find((m) => m.id === model);
      const csv = await API.get(
        API_ROUTES.MODEL_DRUGS +
          `${model}/patients/${document_number}/download_csv`
      );
      const link = document.createElement("a");
      if (currentModel) {
        link.download = `${document_number}_modelo_${currentModel.name}.csv`;
      } else {
        link.download = `${document_number}.csv`;
      }

      link.href = `data:text/csv;charset=utf-8,${escape(csv.data)}`;
      link.click();
    } catch (error) {
      console.log("error", error);
      setError(
        "Hubo un error al intentar descargar las observaciones. Puede que este paciente no tenga observaciones para el modelo seleccionado"
      );
    }
  };

  return (
    <Grid item xs={12} sm={12}>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="model-select-label">Modelo</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={model}
            label="Modelo"
            onChange={handleInputChange}
          >
            {models.map((model: ModelInfo) => (
              <MenuItem key={model.id} value={model.id}>
                {model.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Button
        color="primary"
        variant="outlined"
        onClick={handleSubmit}
        className={styles.DownloadCsv}
      >
        Descargar
      </Button>
      {error && <Error error={error} />}
    </Grid>
  );
};

export default DownloadCSVModal;
