import React from "react";
import { Box } from "@mui/material";
import styles from "./Styles.module.css";
import BlueLine from "../../../../Assets/Icons/BlueLine";

export default function NivelSelector({ activeButtonIndex, handleButtonClick }) {
    return (
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: "3vh", width: "25%" }}>
            <p className={styles.titulo1}>Nível</p>
            <BlueLine />
            <div className={styles.nivel}>
                {[1, 2, 3, 4].map((level, index) => (
                    <button
                        key={index}
                        className={`${styles.button} ${activeButtonIndex === index ? styles.active : ""}`}
                        onClick={() => handleButtonClick(index)}
                    >
                        {level}
                    </button>
                ))}
            </div>
        </Box>
    );
}
