import { Fragment, useState, useEffect } from "react";
import { useObservationsGlobalState } from "../../context/ObservationsGlobalState";
import styles from "./upload-observation-step2.module.scss";
import { Routing } from "../../constant/Routing";
import Breadcrumbs from "../breadcrumbs/breadcrumbs";
import { useNavigate } from "react-router-dom";
import CreateObservation from "../create-observation/create-observation";
import { API_ROUTES } from "../../networking/api-routes";
import API from "../../networking/api-service";
import { Button } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import FormComponent from "./FormComponent";
import TableComponent from "./TableComponent";

const UploadObservationStep3 = (props: any) => {
  const navigation = useNavigate();
  const { state, setState } = useObservationsGlobalState();
  const theme = createTheme();

  const [variableColumns, setVariableColumns] = useState([] as string[]);

  const [columnsValues, setColumnsValues] = useState({} as any);

  const [tableState, setTableState] = useState({
    data: [] as any,
    editIdx: -1,
  });

  // Se queda con todas las filas menos
  const handleRemove = (i: number) => {
    setTableState((prev) => ({
      ...prev,
      data: prev.data.filter((_row: any, j: number) => j !== i),
    }));
  };

  const startEditing = (i: number) => {
    setTableState((prev) => ({
      ...prev,
      editIdx: i,
    }));
  };

  const stopEditing = () => {
    setTableState((prev) => ({
      ...prev,
      editIdx: -1,
    }));
  };

  const handleChange = (e: any, name: string, i: number) => {
    const { value } = e.target;
    setTableState((prev) => ({
      ...prev,
      data: prev.data.map((row: any, j: number) =>
        j === i ? { ...row, [name]: value } : row
      ),
    }));
  };

  const breadcrumbs = [
    {
      name: "Inicio",
      link: Routing.HOME,
      clickable: true,
      actual: false,
    },
    {
      name: "Seleccionar paciente y modelo",
      link: Routing.UPLOAD_OBSERVATION_STEP_1,
      clickable: true,
      actual: false,
    },
    {
      name: "Cargar Variables Fijas",
      link: Routing.UPLOAD_OBSERVATION_STEP_2,
      clickable: true,
      actual: false,
    },
    {
      name: "Cargar observaciones",
      link: Routing.UPLOAD_OBSERVATION_STEP_3,
      clickable: true,
      actual: true,
    },
  ];

  const fetchObservationFields = async () => {
    try {
      const response = await API.get(
        API_ROUTES.MODEL_DRUGS + state.model_id + "/"
      );
      // setVariableColumns(response.data.variable_columns); PEGADA AL BACK
      setVariableColumns(["ID", "ID2", "ID3"]);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchObservationFields();
  }, []);

  const formFields = () => {
    let hash = {} as any;
    variableColumns.forEach((element) => (hash[element] = ""));
    return hash;
  };

  const headers = () => {
    let array = [] as any;
    variableColumns.forEach((element) => (array.push({
      name: element,
      prop: element.replace(/\s/g, '').toLowerCase()
    })));
    return array;
  };

  return (
    <ThemeProvider theme={theme}>
      <FormComponent
        onSubmit={(submission: any) =>
          setTableState((prev) => ({
            ...prev,
            data: [...prev.data, submission],
          }))
        }
        formsFields={formFields}
      />
      <TableComponent
        handleRemove={handleRemove}
        startEditing={startEditing}
        editIdx={tableState.editIdx}
        stopEditing={stopEditing}
        handleChange={handleChange}
        data={tableState.data}
        header={[
          {
            name: "First name",
            prop: "firstName",
          },
          {
            name: "Last name",
            prop: "lastName",
          },
          {
            name: "Username",
            prop: "username",
          },
          {
            name: "Email",
            prop: "email",
          },
        ]}
      />
    </ThemeProvider>
  );
};

export default UploadObservationStep3;
