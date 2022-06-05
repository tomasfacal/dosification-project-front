import styles from "./errors.module.scss";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

interface ErrorInterface {
  error_code: string;
  error_text: string;
}

const ErrorPage: React.FC<ErrorInterface> = (props: ErrorInterface) => {
  return (
    <section className={styles.ErrorContainer}>
      <span>
        <span>{props.error_code[0]}</span>
      </span>
      <span>{props.error_code[1]}</span>
      <span>
        <span>{props.error_code[2]}</span>
      </span>
      <h1 className={styles.Title}>{props.error_text}</h1>
      <Button
        color="primary"
        variant="contained"
        className={styles.SubmitButton}
        component={Link}
        to={"/"}
      >
        Volver al Inicio
      </Button>
    </section>
  );
};

export default ErrorPage;
