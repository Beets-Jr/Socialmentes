import React, { useState } from "react";
import styles from "./Botao.module.css";
import { Link } from "react-router-dom";

export default function Botao({ icon, text, route, bgcolor, onClick, fullText, customClass }) {
  const [isActive, setIsActive] = useState(false);

  const buttonClass = `${styles.button} ${bgcolor ? styles[bgcolor] : ""} ${isActive ? styles.active : ""} ${customClass ? styles[customClass] : ""}`;

  const handleClick = () => {
    setIsActive(true);
    if (onClick) {
      onClick();
    }
    setTimeout(() => {
      setIsActive(false);
    }, 500);
  };

  return (
    <Link to={route ? route : ''} className={styles.link} onClick={handleClick}>
      <div className={buttonClass}>
        {typeof icon === 'string' ? (
          <img src={icon} className={styles.icon} alt={text} style={{ display: fullText ? "inline" : "" }} />
        ) : (
          React.cloneElement(icon, { className: styles.icon, style: { display: fullText ? "inline" : "" } })
        )}
        <span className={styles.text} style={{ width: fullText ? "100%" : "" }}>{text}</span>
      </div>
    </Link>
  );
}
