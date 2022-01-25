import React from 'react';
import Typography from '@mui/material/Typography';
import styles from './error.module.scss';

const Error = (props: any) => {
    return (
        <Typography className={styles.error}>{props.error}</Typography>
    )
}
 
export default Error;
