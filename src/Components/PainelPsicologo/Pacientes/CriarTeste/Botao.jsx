import React, { useState } from "react";
import styles from "./Botao.module.css";
import { Link } from "react-router-dom";

export default function Botao({ icon, text, route, bgcolor, onClick }) {
  const [isActive, setIsActive] = useState(false);

  const buttonClass = `${styles.button} ${bgcolor ? styles[bgcolor] : ""} ${
    isActive ? styles.active : ""
  }`;

  const handleClick = () => {
    setIsActive(!isActive);
    if (onClick) {
      onClick();
    }
  };

  return (
    <Link to={route} className={styles.link} onClick={handleClick}>
      <button className={buttonClass}>
        {icon && <img src={icon} className={styles.icon} alt={text} />}
        <span className={styles.text}>{text}</span>
      </button>
    </Link>
  );
}
