import Typography from "@mui/material/Typography";
import styles from "./error.module.scss";

const Error: React.FC<any> = (props: any) => {
  return <Typography className={styles.error}>{props.error}</Typography>;
};

export default Error;
