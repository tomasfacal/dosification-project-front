import React, {Fragment, useState, useEffect} from 'react';
import styles from './patients-list.module.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import API from '../../networking/api-service';
import { API_ROUTES } from '../../networking/api-routes';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';

const PatientsList = () => {
  const [data, setData] = useState<PatientInfo[]>(
    []
  )
  const [page, setPage] = useState(0);
  const [countPatient, setCountPatients] = useState(0);

  // We have to add 1 to the page due to materialUI table page 
  // beginning in 0 and there is not way to change it
  useEffect(() => {
    API.get(API_ROUTES.LIST_PATIENTS+`?page=${page+1}`)
    .then(res => {
      setData(res.data.results);
      setCountPatients(res.data.count);
    })
  }, [page]);

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  return (
    <Fragment>
      <TableContainer className={styles.TableContainer}component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className= {styles.TableHeader}>
            <TableRow className= {styles.TableTitle}>
              <TableCell align="center"> Documento </TableCell>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Apellido</TableCell>
              <TableCell align="center">Sexo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => 
              <TableRow
                key={row.document_number}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">{row.document_number}</TableCell>
                <TableCell align="center">{row.first_name}</TableCell>
                <TableCell align="center">{row.last_name}</TableCell>
                {(row.sex === 'F') ? <TableCell align="center"><FemaleIcon className= {styles.FemaleIcon}/></TableCell> : <TableCell align="center"><MaleIcon className= {styles.MaleIcon}/></TableCell> } 
              </TableRow>
            )}
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
                  color: "primary"
                }}
                nextIconButtonProps={{ color: "primary" }}
                SelectProps={{
                  inputProps: {
                    "aria-label": "page number"
                  }
                }}
                showFirstButton={false}
                showLastButton={false}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Fragment>
  );
}
 
export default PatientsList;
