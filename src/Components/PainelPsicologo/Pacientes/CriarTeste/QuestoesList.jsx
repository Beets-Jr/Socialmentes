import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import Questao from "./Questao";
import styles from "./Styles.module.css";
import BlueLine from "../../../../Assets/Icons/BlueLine";
import { updateQuestionValues } from "../../../../Services/Tests/testsFunctions.mjs";

export default function QuestoesList({
  testId,
  testDetails,
  setTestInformations,
  nivel,
  categoriasSelecionadas,
  setQuestionValues,
  questionValues,
  categorias,
  setCategoriasSelecionadas,
}) {
  const [remotion, setRemotion] = useState(false);
  const [indiceDaCategoriaGeral, setIndiceDaCategoriaGeral] = useState();
  const [indiceDaCategoriaNoNivel, setIndiceDaCategoriaNoNivel] = useState();

  const handleSelectedValuesChange = (
    nivel,
    indiceDaCategoria,
    indiceQuestao,
    value
  ) => {
    console.log("Question Values before:", questionValues);

    const categoriaSelecionada =
      categoriasSelecionadas[nivel] && categoriasSelecionadas[nivel][indiceDaCategoria];
    if (!categoriaSelecionada) return;
  
    const indiceCategoriaGeral = categorias.findIndex(
      (cat) => cat === categoriaSelecionada
    );
  
    setQuestionValues((prevValues) => {
      const updatedValues = { ...prevValues };

      if (!updatedValues[`level_${nivel}`]) {
        updatedValues[`level_${nivel}`] = {};
      }
  
      if (!updatedValues[`level_${nivel}`][`category_${indiceCategoriaGeral}`]) {
        updatedValues[`level_${nivel}`][`category_${indiceCategoriaGeral}`] = {};
      }
  
      updatedValues[`level_${nivel}`][`category_${indiceCategoriaGeral}`][
        `question_${indiceQuestao}`
      ] = value;

      // Atualizar o testDetails.questions com os novos questionValues
      const updatedTestDetails = { ...testDetails, questions: updatedValues };
      setTestInformations(updatedTestDetails);

      console.log("Question Values after:", updatedValues);
      return updatedValues;
    });
  };  

  const handleRemotion = (indiceDaCategoriaNoNivel, indiceDaCategoriaGeral) => {
    setIndiceDaCategoriaNoNivel(indiceDaCategoriaNoNivel);
    setIndiceDaCategoriaGeral(indiceDaCategoriaGeral);
    setRemotion(true);
  };

  const handleRemotionConfirmed = async () => {
    const updatedValues = { ...questionValues };
    const levelKey = `level_${nivel}`;
    const categoryKey = `category_${indiceDaCategoriaGeral}`;
  
    // Remover a categoria específica e suas questões
    if (updatedValues[levelKey]) {
      delete updatedValues[levelKey][categoryKey];
  
      // Se não houver mais categorias no nível, remover o nível
      if (Object.keys(updatedValues[levelKey]).length === 0) {
        delete updatedValues[levelKey];
      }
    }
  
    // Atualizar categoriasSelecionadas após remover a categoria de questionValues
    const updatedCategoriasSelecionadas = { ...categoriasSelecionadas };
    if (updatedCategoriasSelecionadas[nivel]) {
      updatedCategoriasSelecionadas[nivel] = updatedCategoriasSelecionadas[nivel].filter(
        (_, index) => index !== indiceDaCategoriaNoNivel
      );
  
      // Se não houver mais categorias no nível, remover o nível
      if (updatedCategoriasSelecionadas[nivel].length === 0) {
        delete updatedCategoriasSelecionadas[nivel];
      }
    }
  
    // Atualizar o estado local e garantir a re-renderização
    setQuestionValues(updatedValues);
    setCategoriasSelecionadas(updatedCategoriasSelecionadas);

    localStorage.setItem("categoriasSelecionadas", JSON.stringify(updatedCategoriasSelecionadas));
    console.log("Categorias Selecionadas:", updatedCategoriasSelecionadas);
  
    // Atualizar o testDetails.questions com os novos questionValues
    const updatedTestDetails = { ...testDetails, questions: updatedValues };
    setTestInformations(updatedTestDetails);
  
    try {
      // Atualizar o banco de dados
      await updateQuestionValues(testId, updatedValues);
    } catch (error) {
      console.error("Erro ao remover a questão:", error);
    } finally {
      setRemotion(false);  // Garantir que o modal de confirmação seja fechado
    }
  };  

  return (
    <>
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

        {Object.keys(categoriasSelecionadas).length === 0 || (categoriasSelecionadas[nivel] && categoriasSelecionadas[nivel].length === 0) ? (
          <p className={styles.message}>Nenhuma checklist adicionada</p>
        ) : (
          Object.keys(categoriasSelecionadas).map(
            (key) =>
              parseInt(key) === nivel && (
                <div key={key}>
                  {categoriasSelecionadas[key].map((categoria, index) => {
                    const indiceCategoriaGeral = categorias.findIndex(
                      (cat) => cat === categoria
                    );

                    return (
                      <div key={index} style={{ marginBottom: "2vh" }}>
                        <Questao
                          nivel={parseInt(key)}
                          categoriaSelecionada={categoria}
                          indiceDaCategoria={index}
                          indiceCategoriaGeral={indiceCategoriaGeral}
                          selectedValues={questionValues}
                          onSelectedValuesChange={(indiceQuestao, value) =>
                            handleSelectedValuesChange(
                              nivel,
                              index,
                              indiceQuestao,
                              value
                            )
                          }
                          onRemotion={() =>
                            handleRemotion(index, indiceCategoriaGeral)
                          }
                        />
                      </div>
                    );
                  })}
                </div>
              )
          )
        )}
      </Box>

      {remotion && (
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "2em",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            zIndex: 9999,
          }}
        >
          <p>Tem certeza que deseja remover a questão? Esta ação é irreversível.</p>
          <Button
            onClick={handleRemotionConfirmed}
            variant="contained"
            color="primary"
            sx={{ marginRight: "1em" }}
          >
            Sim, quero remover
          </Button>
          <Button
            onClick={() => setRemotion(false)}
            variant="contained"
            color="secondary"
          >
            Não, prefiro continuar na página
          </Button>
        </Box>
      )}
    </>
  );
}
