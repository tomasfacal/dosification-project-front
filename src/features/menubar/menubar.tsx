import { Fragment } from "react";
import styles from "./menubar.module.scss";
import MenuHomeCard from "../menu-home-card/menu-home-card";

const Menubar = () => {
  return (
    <Fragment>
      <div className={styles.CardContainer}>
        <MenuHomeCard
          text="Integra características del paciente y su tratamiento para 
            generar predicciones farmacocinéticas individualizadas en tiempo real"
          class="Card3"
        />
        <MenuHomeCard
          text="Automatiza la aplicación de modelos popPK disponibles para la dosificación de presición"
          class="Card2"
        />
        <MenuHomeCard
          text="Aporta insumos basados en evidencia para seleccionar posologías en forma racional"
          class="Card1"
        />
      </div>
    </Fragment>
  );
};

export default Menubar;
