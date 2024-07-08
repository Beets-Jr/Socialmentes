import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Questao from "./Questao";
import styles from "./Styles.module.css";
import BlueLine from "../../../../Assets/Icons/BlueLine";

export default function QuestoesList({
    nivel,
    categoriasSelecionadas,
    mostrarQuestoes
}) {
    const [selectedValues, setSelectedValues] = useState({});

    const handleSelectedValuesChange = (nivel, categoria, index, value) => {
        const newSelectedValues = {
            ...selectedValues,
            [nivel]: {
                ...(selectedValues[nivel] || {}),
                [categoria]: {
                    ...(selectedValues[nivel]?.[categoria] || {}),
                    [index]: value,
                },
            },
        };
        setSelectedValues(newSelectedValues);
    };

    return (
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: "3vh", width: "25%" }}>
            <p className={styles.titulo1}>Questões</p>
            <BlueLine />

            {mostrarQuestoes && Object.keys(categoriasSelecionadas).map((key) => (
                parseInt(key) === nivel &&
                <div key={key}>
                    {categoriasSelecionadas[key].map((categoria, index) => (
                        <div key={index} style={{ marginBottom: "10vh" }} >
                            <Questao
                                nivel={parseInt(key)}
                                categoriaSelecionada={categoria}
                                selectedValues={selectedValues[nivel]?.[categoria] || {}}
                                onSelectedValuesChange={(index, value) => handleSelectedValuesChange(parseInt(key), categoria, index, value)}
                            />
                        </div>
                    ))}
                </div>
            ))}
        </Box>
    );
}
