// QuestoesList.js

import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Questao from "./Questao";
import styles from "./Styles.module.css";
import BlueLine from "../../../../Assets/Icons/BlueLine";

export default function QuestoesList({
  nivel,
  categoriasSelecionadas,
  testId,
  setQuestionValues,
  questionValues,
  categorias, // Adicionei categorias como propriedade para acessar o vetor de categorias global
}) {
  const handleSelectedValuesChange = (
    testId,
    nivel,
    indiceDaCategoria,
    indiceQuestao,
    value
  ) => {
    // Encontrar o índice da categoria no vetor de categorias geral
    const categoriaSelecionada =
      categoriasSelecionadas[nivel][indiceDaCategoria];
    const indiceCategoriaGeral = categorias.findIndex(
      (cat) => cat === categoriaSelecionada
    );

    setQuestionValues((prevValues) => {
      const updatedValues = { ...prevValues };

      if (!updatedValues[`level_${nivel}`]) {
        updatedValues[`level_${nivel}`] = {};
      }

      if (
        !updatedValues[`level_${nivel}`][`category_${indiceCategoriaGeral}`]
      ) {
        updatedValues[`level_${nivel}`][`category_${indiceCategoriaGeral}`] = {};
      }

      updatedValues[`level_${nivel}`][`category_${indiceCategoriaGeral}`][
        `question_${indiceQuestao}`
      ] = value;

      return updatedValues;
    });
  };

  useEffect(() => {
    console.log("Objetao: ", questionValues);
  }, [questionValues]);

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "3vh",
        width: "25%",
      }}
    >
      <p className={styles.titulo1}>Questões</p>
      <BlueLine />

      {Object.keys(categoriasSelecionadas).map(
        (key) =>
          parseInt(key) === nivel && (
            <div key={key}>
              {categoriasSelecionadas[key].map((categoria, index) => {
                // Encontrar o índice da categoria no vetor de categorias geral
                const indiceCategoriaGeral = categorias.findIndex(
                  (cat) => cat === categoria
                );

                return (
                  <div key={index} style={{ marginBottom: "10vh" }}>
                    <Questao
                      nivel={parseInt(key)}
                      categoriaSelecionada={categoria}
                      indiceDaCategoria={index} // Passando o índice da categoria local
                      indiceCategoriaGeral={indiceCategoriaGeral} // Passando o índice da categoria global
                      selectedValues={questionValues}
                      onSelectedValuesChange={(indiceQuestao, value) =>
                        handleSelectedValuesChange(
                          testId,
                          nivel,
                          index,
                          indiceQuestao,
                          value
                        )
                      }
                    />
                  </div>
                );
              })}
            </div>
          )
      )}
    </Box>
  );
}
