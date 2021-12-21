import React from 'react';
import { Link, Typography } from '@material-ui/core';
import styles from './call-to-action.module.scss';
import LinkIcon from '@mui/icons-material/Link';

interface CalltoActionProps {
  text: string,
  url: string,
  urlText: string
}

const CallToAction = (props: CalltoActionProps) => {
  return (
    <Typography className={styles.CallToAction}>
      {props.text}<Link href={props.url}>{props.urlText} <LinkIcon/></Link>
    </Typography>
  );
}

export default CallToAction;
