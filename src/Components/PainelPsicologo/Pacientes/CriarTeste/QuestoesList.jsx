import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Questao from "./Questao";
import styles from "./Styles.module.css";
import BlueLine from "../../../../Assets/Icons/BlueLine";
import { updateQuestionStatus } from "../../../../Database/Utils/testsFunctions";

export default function QuestoesList({
    nivel,
    categoriasSelecionadas
}) {
    const [selectedValues, setSelectedValues] = useState([]);

    const handleSelectedValuesChange = (testId, nivel, indiceQuestao, indiceCategoria, value) => {
        const indiceDaCategoria = 0;

        console.log(`Array: ${categoriasSelecionadas[nivel][0]}`);
        console.log(`Nível: ${nivel}`); // simplesmente o nivel
        console.log(`Índice da categoria: ${indiceDaCategoria}`); // indice da categoria
        console.log(`Índice da questão: ${indiceQuestao}`); // indice da questao
        console.log(`Valor do radio: ${value}`); // valor selecionado

        const newSelectedValues = updateQuestionStatus(testId, nivel, indiceCategoria, indiceQuestao, value);
        setSelectedValues(newSelectedValues);
    };

    useEffect(() => {
        console.log(selectedValues);
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
                                selectedValues={selectedValues[`level_${nivel}.category_${index}`] || {}}
                                onSelectedValuesChange={(index, value) => handleSelectedValuesChange('E3ssWQUAx0iRiHr7T4ei', nivel, index, 0, value)}
                            />
                        </div>
                    ))}
                </div>
            ))}
        </Box>
    );
}
