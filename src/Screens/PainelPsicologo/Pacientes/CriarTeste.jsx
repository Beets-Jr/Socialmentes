import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import NivelSelector from "../../../Components/PainelPsicologo/Pacientes/CriarTeste/NivelSelector";
import CompetenciaSelector from "../../../Components/PainelPsicologo/Pacientes/CriarTeste/CompetenciaSelector";
import QuestoesList from "../../../Components/PainelPsicologo/Pacientes/CriarTeste/QuestoesList";
import FixedButtons from "../../../Components/PainelPsicologo/Pacientes/CriarTeste/FixedButtons";
import {
  loadInitialDataFromLocalStorage,
  fetchCategoriasPorNivel,
  updateCategoriasSelecionadasFromTestDetails,
  updateCategoriasSelecionadas,
} from "./CriarTesteUtils";
import {
  getCategoriesByLevel,
  getQuestionsValues,
} from "../../../Services/Tests/Category/GetCategorys.mjs";
import { updateQuestionValues } from "../../../Services/Tests/testsFunctions.mjs";
import { useNavigate, useLocation } from "react-router-dom";
import { treatQuestionValues } from "../../../Validators/Tests/treatData";
import DialogConfirmation from "../../../Components/ElementsInterface/DialogConfirmation";
import Logo from '../../../Assets/LogoSocialMentes1.png'

export default function CriarTeste() {
  const [testId, setTestId] = useState("");
  const [nivel, setNivel] = useState(1);
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState({});
  const [questionValues, setQuestionValues] = useState({});
  const [encerrar, setEncerrar] = useState(false);
  const [saveAndExit, setSaveAndExit] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { testDetails, testDocId } = location.state || {};

  useEffect(() => {
    if (testDocId) {
      localStorage.setItem("testId", testDocId);
      setTestId(testDocId);
    } else {
      const storedTestId = localStorage.getItem("testId");
      if (storedTestId) {
        setTestId(storedTestId);
      }
    }
  }, [testDocId]);

  useEffect(() => {
    loadInitialDataFromLocalStorage(setTestId, setCategoriasSelecionadas);
    console.log('Categorias selecionadas:', categoriasSelecionadas);
  }, []);

  useEffect(() => {
    if (nivel > 0) {
      fetchCategoriasPorNivel(nivel, setCategorias);
    }
  }, [nivel]);

  useEffect(() => {
    if (testDetails && nivel > 0) {
      const indicesCategorias = getCategoriesByLevel(testDetails, nivel);
      const newQuestionValues = getQuestionsValues(
        testDetails,
        indicesCategorias,
        nivel
      );
      setQuestionValues(newQuestionValues);
      updateCategoriasSelecionadasFromTestDetails(
        testDetails,
        nivel,
        categorias,
        setCategoriasSelecionadas
      );
    }
  }, [nivel, testDetails, categorias]);

  useEffect(() => {
    localStorage.setItem(
      "categoriasSelecionadas",
      JSON.stringify(categoriasSelecionadas)
    );
  }, [categoriasSelecionadas]);

  const handleButtonClick = (index) => {
    setActiveButtonIndex(index);
    setNivel(index + 1);
    setSelectedOption("");
    setCategorias([]);
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleAdicionarQuestao = async () => {
    try {
      if (selectedOption) {
        if (categoriasSelecionadas[nivel]?.includes(selectedOption)) {
          alert("Essa categoria já foi selecionada para este nível.");
          return;
        }
        await updateCategoriasSelecionadas(
          nivel,
          [selectedOption],
          setCategoriasSelecionadas
        );
      }
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  const handleSaveAndExit = async () => {
    try {
      const treatQValues = treatQuestionValues(questionValues)
      await updateQuestionValues(testId, treatQValues);
      setSaveAndExit(false);
      navigate("/painel-psi/pacientes");
    } catch (error) {
      console.error("Erro ao salvar e sair:", error);
    }
  };

  const handleEncerrar = async () => {
    try {
      const treatQValues = treatQuestionValues(questionValues)
      await updateQuestionValues(testId, treatQValues);
      /** Implementar a função que seta a situation do teste para 0 */
      setEncerrar(false);
      navigate("/painel-psi/pacientes");
    } catch (error) {
      console.error("Erro ao encerrar:", error);
    }
  };

  return (
    <Box sx={{
      position: "sticky",
      marginTop: {
        xs: "1em",
        sm: "2.5em"
      },
      marginLeft: {
        xs: "1em",
        sm: "3.75em"
      }
    }}>
      <Box>
        <Box sx={{
          display: { xs: "block", md: "flex" }, gap: "10vw",
        }}>
          <NivelSelector
            activeButtonIndex={activeButtonIndex}
            handleButtonClick={handleButtonClick}
          />
          <CompetenciaSelector
            activeButtonIndex={activeButtonIndex}
            categorias={categorias}
            selectedOption={selectedOption}
            handleChange={handleChange}
          />
        </Box>
        <Box sx={{
          marginTop: "5vh", marginBottom: "9vh",
        }}>
          <QuestoesList
            testId={testId}
            nivel={nivel}
            categoriasSelecionadas={categoriasSelecionadas}
            setQuestionValues={setQuestionValues}
            questionValues={questionValues}
            categorias={categorias}
            setCategoriasSelecionadas={setCategoriasSelecionadas}
          />
        </Box>
        <FixedButtons
          handleAdicionarQuestao={handleAdicionarQuestao}
          handleEncerrar={() => setEncerrar(true)}
          handleSaveAndExit={() => setSaveAndExit(true)}
        />
      </Box>
      {saveAndExit && (
        <DialogConfirmation 
          open={saveAndExit}
          onClose={() => setSaveAndExit(false)} 
          onConfirm={handleSaveAndExit}
          messageTitle="Você deseja salvar o teste e sair?"
          message="Você poderá alterá-lo depois."
          confirmButtonText="Salvar"
          cancelButtonText="Cancelar"
          confirmButtonColor="var(--color-pink)"
          cancelButtonColor="var(--color-blue-2)"
          confirmButtonHoverColor='white'
          cancelButtonHoverColor='white'
          confirmButtonBorderColor="var(--color-pink)"
          cancelButtonBorderColor="var(--color-blue-2)"
          confirmButtonHoverBackground='' // cor ao fundo do botão à esquerda passando mouse
          cancelButtonHoverBackground='' // cor do fundo do botão à direita passando mouse
          confirmButtonHoverBorderColor='' // cor da borda do botão à esquerda passando mouse
          cancelButtonHoverBorderColor='' // cor da borda do botão à direita passando mouse
          logoSrc={Logo}
          logoAlt="socialmentes-logo"
        />
      )}

      {encerrar && (
        <DialogConfirmation 
          open={encerrar}
          onClose={() => setEncerrar(false)} 
          onConfirm={handleEncerrar}
          messageTitle="Você deseja finalizar o seu teste?"
          message="Caso finalizado, você não poderá alterá-lo depois!"
          confirmButtonText="Finalizar"
          cancelButtonText="Cancelar"
          confirmButtonColor="var(--color-pink)"
          cancelButtonColor="var(--color-blue-2)"
          confirmButtonHoverColor='white'
          cancelButtonHoverColor='white'
          confirmButtonBorderColor="var(--color-pink)"
          cancelButtonBorderColor="var(--color-blue-2)"
          confirmButtonHoverBackground='' // cor ao fundo do botão à esquerda passando mouse
          cancelButtonHoverBackground='' // cor do fundo do botão à direita passando mouse
          confirmButtonHoverBorderColor='' // cor da borda do botão à esquerda passando mouse
          cancelButtonHoverBorderColor='' // cor da borda do botão à direita passando mouse
          logoSrc={Logo}
          logoAlt="socialmentes-logo"
        />
      )}
      
    </Box>
  );
}
