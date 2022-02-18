import React, {Fragment, useState, useEffect} from 'react';
import styles from './menu-home-card.module.scss';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import cardBackground from '../../assets/images/backgroundCard.jpg';
import pirottoPhoto from '../../assets/images/agus.png';
import facalPhoto from '../../assets/images/facal.png';
import droccoPhoto from '../../assets/images/drocco.png';
import Avatar from '@mui/material/Avatar';
import { Person } from '@mui/icons-material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface CardMenu {
  text: string;
  class: string;
}

const getClass = (className: string) => {
  if (className === 'Card1')
    return styles.Card1
  else if (className === 'Card2')
    return styles.Card2
  else
    return styles.Card3
}

const MenuHomeCard = (props: CardMenu) => {
  return (
    <Fragment>
      <div className={ getClass(props.class) }>
        <LocalHospitalIcon className={styles.CardIcon}/>
        <div className={styles.CardTextContainer}>
          <Typography className={styles.CardText}>
            { props.text }
          </Typography>
        </div>
      </div>
    </Fragment>
  );
}
 
export default MenuHomeCard;
