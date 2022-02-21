import React, {Fragment} from 'react';
import styles from './menu-home-card.module.scss';
import Typography from '@mui/material/Typography';
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
