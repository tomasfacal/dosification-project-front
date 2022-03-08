import { Fragment } from "react";
import styles from "./menubar.module.scss";
import MenuHomeCard from "../menu-home-card/menu-home-card";

const Menubar = () => {
  return (
    <Fragment>
      <div className={styles.CardContainer}>
        <MenuHomeCard
          text="Dosifica de una manera más precisa a tus pacientes
                en tiempo real"
          class="Card1"
        />
        <MenuHomeCard
          text="La monitorización de los pacientes es más sencilla"
          class="Card2"
        />
        <MenuHomeCard
          text="Ayuda a farmaceuticos/doctores a encontrar las dosis
                correctas según cada paciente"
          class="Card3"
        />
      </div>
    </Fragment>
  );
};

export default Menubar;
