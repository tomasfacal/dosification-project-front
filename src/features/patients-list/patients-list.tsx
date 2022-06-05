import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./patients-list.module.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import API from "../../networking/api-service";
import { API_ROUTES } from "../../networking/api-routes";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import { TextField, Button } from "@material-ui/core";
import ChildModal from "../modal-patient/modal";

const PatientsList = () => {
  const [data, setData] = useState<PatientInfo[]>([]);
  const [page, setPage] = useState(0);
  const [searchField, setSearchField] = useState("");
  const [search, setSearch] = useState("");
  const [countPatient, setCountPatients] = useState(0);
  const [open, setOpen] = useState(false);

  // We have to add 1 to the page due to materialUI table page
  // beginning in 0 and there is not way to change it
  const getPatientsPage = async () => {
    try {
      const res = await API.get(API_ROUTES.LIST_PATIENTS + `?page=${page + 1}`);
      setData(res.data.results);
      setCountPatients(res.data.count);
    } catch (error) {
      console.log(error);
    }
  };

  const getPatientsSearch = async () => {
    try {
      const res = await API.get(API_ROUTES.LIST_PATIENTS + `?search=${search}`);
      if (res.data.results.length === 0) {
        handleOpen();
      } else {
        setData(res.data.results);
        setCountPatients(res.data.count);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPatientsPage();
  }, [page]);

  useEffect(() => {
    getPatientsSearch();
  }, [search]);

  const handleChangePage = (_event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleInputChange = (event: any) => {
    setSearchField(event.target.value);
  };

  const handleSubmit = () => {
    setSearch(searchField);
  };

  const handleCancel = () => {
    setSearch("");
    setPage(0);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <div>
        <TextField
          label="Buscar paciente"
          name="search"
          id="searchInput"
          onChange={handleInputChange}
        />
        <Button
          color="primary"
          variant="contained"
          className={styles.searchButton}
          onClick={handleSubmit}
          disabled={!searchField}
        >
          <SearchIcon />
        </Button>
        <Button
          color="primary"
          variant="contained"
          className={styles.cancelSearchButton}
          onClick={handleCancel}
        >
          <CancelIcon />
        </Button>
      </div>
      <TableContainer className={styles.TableContainer} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className={styles.TableHeader}>
            <TableRow className={styles.TableTitle}>
              <TableCell align="center"> Documento </TableCell>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Apellido</TableCell>
              <TableCell align="center">Sexo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.document_number}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">
                  <Link
                    to={`/patient/${row.document_number}`}
                    className="btn btn-primary"
                  >
                    {row.document_number}
                  </Link>
                </TableCell>
                <TableCell align="center">{row.first_name}</TableCell>
                <TableCell align="center">{row.last_name}</TableCell>
                {row.sex === "F" ? (
                  <TableCell align="center">
                    <FemaleIcon className={styles.FemaleIcon} />
                  </TableCell>
                ) : (
                  <TableCell align="center">
                    <MaleIcon className={styles.MaleIcon} />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={countPatient}
                rowsPerPage={10}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[10]}
                labelRowsPerPage={<span>Rows:</span>}
                labelDisplayedRows={({ page }) => {
                  return `Página: ${page}`;
                }}
                backIconButtonProps={{
                  color: "primary",
                }}
                nextIconButtonProps={{ color: "primary" }}
                SelectProps={{
                  inputProps: {
                    "aria-label": "page number",
                  },
                }}
                showFirstButton={false}
                showLastButton={false}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <ChildModal
        open={open}
        onClose={handleClose}
        text="No hemos podido encontrar el paciente
            almacenado en el sistema."
      ></ChildModal>
    </Fragment>
  );
};

export default PatientsList;
