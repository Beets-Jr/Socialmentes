import React, { useState } from "react";
import styles from "./Botao.module.css";
import { Link } from "react-router-dom";

export default function Botao({ icon, text, route, bgcolor, onClick, fullText }) {
  const [isActive, setIsActive] = useState(false);

  const buttonClass = `${styles.button} ${bgcolor ? styles[bgcolor] : ""} ${isActive ? styles.active : ""
    }`;

  const handleClick = () => {
    setIsActive(!isActive);
    if (onClick) {
      onClick();
    }
  };

  return (
    <Link to={route ? route : ''} className={styles.link} onClick={handleClick}>
      <div className={buttonClass}>
        {icon && <img src={icon} className={styles.icon} alt={text} style={{ display: fullText ? "inline" : "" }} />}
        <span className={styles.text} style={{ width: fullText ? "100%" : "" }}
        >{text}</span>
      </div>
    </Link>
  );
}