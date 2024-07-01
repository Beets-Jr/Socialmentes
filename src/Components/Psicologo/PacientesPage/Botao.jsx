import React from "react";
import styles from "./Botao.module.css";
import { Link } from "react-router-dom";

export default function Botao({ icon, text, route }) {
  return (
    <Link to={route} className={styles.link}>
      <button>
        {icon && <img src={icon} className={styles.icon} />}
        <span className={styles.text}>{text}</span>
      </button>
    </Link>
  );
}
