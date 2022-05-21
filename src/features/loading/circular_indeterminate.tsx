import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from "./circular-indeterminate.module.scss";

export default function CircularIndeterminate() {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <CircularProgress className={styles.CircularAnimation}/>
      <Typography className={styles.ProgressText}>Simulando...</Typography>
    </Box>
  );
}
