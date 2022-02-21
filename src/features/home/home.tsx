import React, {Fragment} from 'react';
import styles from './home.module.scss';
import Hero from '../hero/hero';
import Menubar from '../menubar/menubar';
import PersonCard from '../person-card/person-card';

const Home = () => {
  return (
      <Fragment>
        <Hero/>
        <Menubar/>
        <div className={styles.TeamContainer}>
          <div className={styles.TeamTitle}>
            Equipo de desarrollo
          </div>
          <div className={styles.CardContainer}>
            <PersonCard name="Agustina Drocco" image="droccoPhoto"/>
            <PersonCard name="Tomás Facal" image="facalPhoto"/>
            <PersonCard name="Agustín Pirotto" image="pirottoPhoto"/>
          </div>
        </div>
      </Fragment>
  );
}
 
export default Home;
