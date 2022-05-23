import { Fragment } from "react";
import styles from "./terms-and-conditions.module.scss";

const TermsAndConditions = () => {
  return (
    <Fragment>
      <div className={styles.TermsContainer}>
        <div className={styles.Title}>Términos y Condiciones</div>
        <div className={styles.Text}>
          <p>
            El usuario reconoce y acepta que esta herramienta se usará solo como
            una ayuda de referencia y que la información contenida en el
            producto no pretende ser un sustituto del ejercicio del juicio
            profesional.
          </p>
          <p>
            Los autores se reservan el derecho de no ser responsables de la
            actualidad, corrección, integridad o calidad de la información
            proporcionada.
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default TermsAndConditions;
