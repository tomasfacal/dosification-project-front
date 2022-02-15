import React, {Fragment, useState, useEffect} from 'react';
import styles from './person-card.module.scss';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import cardBackground from '../../assets/images/backgroundCard.jpg';
import cardImage from '../../assets/images/agus.jpg';
import Avatar from '@mui/material/Avatar';

const PersonCard = () => {
  return (
    <Fragment>
      <Card className={styles.card}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="90"
            image={cardBackground}
          />
          <div className= {styles.avatarContainer}>
            <Avatar className={styles.avatar} src={cardImage} sx={{ width: 100, height: 100 }}/>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Agustin Pirotto
              </Typography>
            </CardContent>
          </div>
        </CardActionArea>
      </Card>
    </Fragment>
  );
}
 
export default PersonCard;
