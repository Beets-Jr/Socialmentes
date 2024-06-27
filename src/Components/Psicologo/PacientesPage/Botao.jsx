import React from 'react';
import styles from "./Botao.module.css";

export default function Botao({ icon, text}) {
  return (
    <button >
      { icon && <img src={icon} className={styles.icon}/>}
      <span className={styles.text} >{text}</span>
    </button>
  )
}
