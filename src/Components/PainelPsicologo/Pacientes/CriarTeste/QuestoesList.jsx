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

    const handleSelectedValuesChange = (testId, nivel, indiceQuestao, value) => {
        /** Fix: passar corretamente o índice da categoria, talvez checando o selectedOption */
        const indiceDaCategoria = 0;

        console.log(`Array: ${categoriasSelecionadas}`);
        console.log(`Nível: ${nivel}`);
        console.log(`Índice da categoria: ${indiceDaCategoria}`);
        console.log(`Índice da questão: ${indiceQuestao}`);
        console.log(`Valor da questão: ${value}`);

        const newValue = updateQuestionStatus(testId, nivel, indiceDaCategoria, indiceQuestao, value);
        /** Fix: configurar o selectedValues para inicialmente ter as informações do bd*/

    };

    useEffect(() => {
        /** setar os selected values de acordo com o bd */
    }, []);

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
                                onSelectedValuesChange={(index, value) => handleSelectedValuesChange(testId, nivel, 0, index, value)}
                            />
                        </div>
                    ))}
                </div>
            ))}
        </Box>
    );
}
