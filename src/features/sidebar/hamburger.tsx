import React from "react";
import styles from './hamburguer.module.scss';

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

const Hamburger = (props: Props) => (
    <button className = { props.open ? styles.open_hamburguer_button : styles.close_hamburguer_button} onClick={() => props.setOpen(!props.open)}>
        <div />
        <div />
        <div />
    </button>
);

export default Hamburger;

