import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Questao from "./Questao";
import styles from "./Styles.module.css";
import BlueLine from "../../../../Assets/Icons/BlueLine";
import { updateQuestionStatus } from "../../../../Database/Utils/testsFunctions.mjs";

export default function QuestoesList({
    nivel,
    categoriasSelecionadas,
    testId,
    setQuestionValues,
    questionValues
}) {

    const handleSelectedValuesChange = (testId, nivel, indiceDaCategoria, indiceQuestao, value) => {
        updateQuestionStatus(testId, nivel, indiceDaCategoria, indiceQuestao, value);

        setQuestionValues((prevValues) => {
            const updatedValues = { ...prevValues };

            if (!updatedValues[`level_${nivel}`]) {
                updatedValues[`level_${nivel}`] = {};
            }

            if (!updatedValues[`level_${nivel}`][`category_${indiceDaCategoria}`]) {
                updatedValues[`level_${nivel}`][`category_${indiceDaCategoria}`] = {};
            }

            updatedValues[`level_${nivel}`][`category_${indiceDaCategoria}`][`question_${indiceQuestao}`] = value;

            return updatedValues;
        });
    };

    useEffect(() => {
        console.log(`Valores selecionados: `, questionValues);
    }, [questionValues]);

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
                                indiceDaCategoria={index}
                                selectedValues={questionValues}
                                onSelectedValuesChange={(indiceQuestao, value) => handleSelectedValuesChange(testId, nivel, index, indiceQuestao, value)}
                            />
                        </div>
                    ))}
                </div>
            ))}
        </Box>
    );
}
