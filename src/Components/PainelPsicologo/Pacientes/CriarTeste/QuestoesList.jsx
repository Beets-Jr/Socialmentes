import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Questao from "./Questao";
import styles from "./Styles.module.css";
import BlueLine from "../../../../Assets/Icons/BlueLine";
import { updateQuestionStatus } from "../../../../Database/Utils/testsFunctions.mjs";

export default function QuestoesList({
    nivel,
    categoriasSelecionadas,
    testId
}) {
    const [selectedValues, setSelectedValues] = useState([]);

    const handleSelectedValuesChange = (testId, nivel, indiceDaCategoria, indiceQuestao, value) => {

        const newValue = updateQuestionStatus(testId, nivel, indiceDaCategoria, indiceQuestao, value);

    };

    useEffect(() => {
        console.log(`Valores selecionados: `, selectedValues);
    }, [selectedValues]);

    return (
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: "3vh", width: "25%" }}>
            <p className={styles.titulo1}>Questões</p>
            <BlueLine />

            {Object.keys(categoriasSelecionadas).map((key) => (
                parseInt(key) === nivel &&
                <div key={key}>
                    {categoriasSelecionadas[key].map((categoria, index) => (
                        <div key={index} style={{ marginBottom: "10vh" }}>
                            <Questao
                                nivel={parseInt(key)}
                                categoriaSelecionada={categoria}
                                selectedValues={selectedValues}
                                onSelectedValuesChange={(indiceQuestao, value) => handleSelectedValuesChange(testId, nivel, index, indiceQuestao, value)}
                            />
                        </div>
                    ))}
                </div>
            ))}
        </Box>
    );
}
