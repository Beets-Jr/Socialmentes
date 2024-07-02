import React, { useState } from "react";
import styles from "./Botao.module.css";
import { Link } from "react-router-dom";

export default function Botao({ icon, text, route, bgcolor }) {
    const [isActive, setIsActive] = useState(false);

    const buttonClass = `${styles.button} ${bgcolor ? styles[bgcolor] : ""} ${isActive ? styles.active : ""}`;

    return (
        <Link
            to={route}
            className={styles.link}
            onClick={() => setIsActive(!isActive)}
        >
            <button className={buttonClass}>
                {icon && <img src={icon} className={styles.icon} alt={text} />}
                <span className={styles.text}>{text}</span>
            </button>
        </Link>
    );
}
