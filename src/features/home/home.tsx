import React, {Fragment, useState, useEffect} from 'react';
import styles from './home.module.scss';
import Hero from '../hero/hero';
import Menubar from '../menubar/menubar';

const Home = () => {
  return (
      <Fragment>
        <Hero/>
        <Menubar/>
      </Fragment>
  );
}
 
export default Home;
