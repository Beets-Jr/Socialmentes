import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import Questao from "./Questao";
import styles from "./Styles.module.css";
import BlueLine from "../../../../Assets/Icons/BlueLine";
import { updateQuestionsOfDatabase } from "../../../../Services/Tests/testsFunctions.mjs";
import { handleSelectedValuesChange } from "../../../../Screens/PainelPsicologo/Pacientes/CriarTesteUtils.mjs";
import DialogConfirmation from "../../../ElementsInterface/DialogConfirmation";
import Logo from "../../../../Assets/LogoSocialMentes1.png";

export default function QuestionsList({
  testId,
  testDetails,
  setTestInformations,
  level,
  selectedCategories,
  setQuestions,
  questions,
  categories,
  setSelectedCategories,
}) {
  const [remotion, setRemotion] = useState(false);
  const [categoryLevel, setCategoryLevel] = useState();
  const [categoryIndex, setCategoryIndex] = useState();
  const [categoryIndexOnLevel, setCategoryIndexOnLevel] = useState();

  const handleRemotion = (categoryIndexOnLevel, level, categoryIndex) => {
    setCategoryIndexOnLevel(categoryIndexOnLevel);
    setCategoryIndex(categoryIndex);
    setCategoryLevel(level);
    setRemotion(true);
  };

  const handleRemotionConfirmed = async () => {
    const updatedValues = { ...questions };
    const levelKey = `level_${categoryLevel}`;

    console.log(`Removing category_${categoryIndex} from level_${levelKey}`);

    // Remover a categoria específica e suas questões
    if (updatedValues[levelKey]) {
      delete updatedValues[levelKey][categoryIndex];

      // Se não houver mais categorias no nível, remover o nível
      if (Object.keys(updatedValues[levelKey]).length === 0) {
        delete updatedValues[levelKey];
      }
    }

    // Atualizar categoriasSelecionadas após remover a categoria de questions
    const updatedSelectedCategories = { ...selectedCategories };
    if (updatedSelectedCategories[level]) {
      // Filtrar pelo nome da categoria, ao invés do índice
      updatedSelectedCategories[level] = updatedSelectedCategories[
        level
      ].filter((category) => category !== categoryIndex);

      // Se não houver mais categorias no nível, remover o nível
      if (updatedSelectedCategories[level].length === 0) {
        delete updatedSelectedCategories[level];
      }
    }

    // Atualizar o estado local e garantir a re-renderização
    setQuestions(updatedValues);
    setSelectedCategories(updatedSelectedCategories);

    // Atualizar o testDetails.questions com os novos questions
    const updatedTestDetails = { ...testDetails, questions: updatedValues };
    setTestInformations(updatedTestDetails);

    try {
      console.log("UpdatedValues: ", updatedValues);
      // Atualizar o banco de dados
      await updateQuestionsOfDatabase(testId, updatedValues);
    } catch (error) {
      console.error("Erro ao remover a questão:", error);
    } finally {
      setRemotion(false);
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
          marginBottom: "20vh"
        }}
      >
        <p className={styles.titulo1}>Questões</p>
        <BlueLine />

        {Object.keys(selectedCategories).length === 0 ? (
          <p className={styles.message}>Nenhuma checklist adicionada</p>
        ) : (
          // Iterar sobre os níveis fixos (de 0 a 3)
          [1, 2, 3, 4].map((level) => (
            <div key={level}>
              <p className={styles.titulo2} style={{ marginTop: "1vh"}}>Nível {level}</p>
              <BlueLine />
              {selectedCategories[level] &&
              Array.isArray(selectedCategories[level]) &&
              selectedCategories[level].length > 0 ? (
                selectedCategories[level].map((category, index) => {
                  const indiceCategoriaGeral = categories.findIndex(
                    (cat) => cat === category
                  );

                  return (
                    <div key={index}>
                      <Questao
                        level={level}
                        categoriaSelecionada={category}
                        indiceDaCategoria={index}
                        indiceCategoriaGeral={indiceCategoriaGeral}
                        selectedValues={questions}
                        onSelectedValuesChange={(indiceQuestao, value) =>
                          handleSelectedValuesChange(
                            level,
                            index,
                            indiceQuestao,
                            value,
                            categories,
                            selectedCategories,
                            setQuestions,
                            testDetails,
                            setTestInformations
                          )
                        }
                        onRemotion={() =>
                          handleRemotion(index, level, indiceCategoriaGeral)
                        }
                      />
                    </div>
                  );
                })
              ) : (
                <p className={styles.message} style={{ marginTop: "2vh" }} >
                  Nenhuma categoria adicionada para este nível
                </p>
              )}
            </div>
          ))
        )}
      </Box>

      {remotion && (
        <DialogConfirmation
          open={remotion}
          onClose={() => setRemotion(false)}
          onConfirm={handleRemotionConfirmed}
          messageTitle="Você deseja apagar esta categoria?"
          message="Esta ação é irreversível!"
          confirmButtonText="Apagar"
          cancelButtonText="Não Apagar"
          confirmButtonColor="var(--color-blue-2)"
          cancelButtonColor="var(--color-pink)"
          confirmButtonHoverColor="var(--color-blue-2)"
          cancelButtonHoverColor="var(--color-pink)"
          confirmButtonBorderColor="var(--color-blue-2)"
          cancelButtonBorderColor="var(--color-pink)"
          confirmButtonHoverBackground="" // cor ao fundo do botão à esquerda passando mouse
          cancelButtonHoverBackground="#ffe4ec" // cor do fundo do botão à direita passando mouse
          confirmButtonHoverBorderColor="" // cor da borda do botão à esquerda passando mouse
          cancelButtonHoverBorderColor="var(--color-pink)" // cor da borda do botão à direita passando mouse
          logoSrc={Logo}
          logoAlt="socialmentes-logo"
        />
      )}
    </>
  );
}
