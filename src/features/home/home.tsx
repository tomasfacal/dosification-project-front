import React, {Fragment, useState, useEffect} from 'react';
import styles from './home.module.scss';
import Hero from '../hero/hero';
import Menubar from '../menubar/menubar';
import PersonCard from '../person-card/person-card';

const Home = () => {
  return (
      <Fragment>
        <Hero/>
        <Menubar/>
        <PersonCard/>
      </Fragment>
  );
}
 
export default Home;
