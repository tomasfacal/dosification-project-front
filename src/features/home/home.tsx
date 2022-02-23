import { Fragment } from "react";
import styles from "./home.module.scss";
import Hero from "../hero/hero";
import Menubar from "../menubar/menubar";
import PersonCard from "../person-card/person-card";
import pirottoPhoto from "../../assets/images/pirotto.png";
import facalPhoto from "../../assets/images/facal.png";
import droccoPhoto from "../../assets/images/drocco.png";

const Home = () => {
  return (
    <Fragment>
      <Hero />
      <Menubar />
      <div className={styles.TeamContainer}>
        <div className={styles.TeamTitle}>Equipo de desarrollo</div>
        <div className={styles.CardContainer}>
          <PersonCard name="Agustina Drocco" image={pirottoPhoto} />
          <PersonCard name="Tomás Facal" image={facalPhoto} />
          <PersonCard name="Agustín Pirotto" image={droccoPhoto} />
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
