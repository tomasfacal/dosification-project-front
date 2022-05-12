import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import TextField from "@mui/material/TextField";
import styles from "./upload-observation-step3.module.scss";

const row = (
  x: any,
  i: number,
  header: any,
  handleRemove: (_: number) => void,
  startEditing: (_: number) => void,
  editIdx: number,
  handleChange: (a: any, b: string, c: number) => void,
  stopEditing: () => void
) => {
  const currentlyEditing = editIdx === i;
  return (
    <TableRow key={`tr-${i}`} selected={false}>
      {header.map((y: any, k: number) => (
        <TableCell key={`trc-${k}`}>
          {currentlyEditing ? (
            <TextField
              name={y.prop}
              onChange={(e) => handleChange(e, y.prop, i)}
              value={x[y.prop]}
            />
          ) : (
            x[y.prop]
          )}
        </TableCell>
      ))}
      <TableCell>
        {currentlyEditing ? (
          <CheckIcon className={styles.CheckIcon} onClick={() => stopEditing()} />
        ) : (
          <EditIcon className={styles.EditIcon} onClick={() => startEditing(i)} />
        )}
      </TableCell>
      <TableCell>
        <DeleteIcon className={styles.DeleteIcon} onClick={() => handleRemove(i)} />
      </TableCell>
    </TableRow>
  );
};

interface TableProps {
  data: any;
  header: any;
  handleRemove: (_: number) => void;
  startEditing: (_: number) => void;
  editIdx: number;
  handleChange: (a: any, b: string, c: number) => void;
  stopEditing: () => void;
}

const TableComponent: React.FC<TableProps> = ({
  data,
  header,
  handleRemove,
  startEditing,
  editIdx,
  handleChange,
  stopEditing,
}) => (
  <Table className={styles.Table}>
    <TableHead className={styles.TableHeader}>
      <TableRow>
        {header.map((x: any, i: number) => (
          <TableCell key={`thc-${i}`}>{x.name}</TableCell>
        ))}
        <TableCell />
        <TableCell />
      </TableRow>
    </TableHead>
    <TableBody>
      {data.map((x: any, i: number) =>
        row(
          x,
          i,
          header,
          handleRemove,
          startEditing,
          editIdx,
          handleChange,
          stopEditing
        )
      )}
    </TableBody>
  </Table>
);

export default TableComponent;
