import React, { useEffect, useState, useContext } from "react";
import { Box } from "@mui/material";
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
import { useNavigate, useLocation, useBlocker } from "react-router-dom";
import { treatQuestionValues } from "../../../Validators/Tests/treatData";
import DialogConfirmation from "../../../Components/ElementsInterface/DialogConfirmation";
import Logo from '../../../Assets/LogoSocialMentes1.png';
import { updateTestSituation } from "../../../Services/testsPatientsService";
import { AppContext } from "../../../Contexts/AppContext";

export default function CriarTeste() {
  const { open: isSidebarExpanded } = useContext(AppContext);
  const sidebarWidth = isSidebarExpanded ? '20vw' : '5vw';

  const [testId, setTestId] = useState("");
  const [testInformations, setTestInformations] = useState({});
  const [nivel, setNivel] = useState(1);
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState({});
  const [questionValues, setQuestionValues] = useState({});

  const [changeCategory, setChangeCategory] = useState(false);
  const [encerrar, setEncerrar] = useState(false);
  const [saveAndExit, setSaveAndExit] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { testSerialId, testDetails } = location.state || {};

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ''; // Necessário para exibir o alerta no Chrome
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    loadInitialDataFromLocalStorage(setTestId, setCategoriasSelecionadas);
  }, []);

  useEffect(() => {
    const storedCategoriasSelecionadas = JSON.parse(localStorage.getItem("categoriasSelecionadas"));
    if (storedCategoriasSelecionadas) {
      setCategoriasSelecionadas(storedCategoriasSelecionadas);
    }
  }, []);

  useEffect(() => {
    if (testSerialId) {
      localStorage.setItem("testId", testSerialId);
      setTestId(testSerialId);
    } else {
      const storedTestId = localStorage.getItem("testId");
      if (storedTestId) {
        setTestId(storedTestId);
      }
    }
  }, [testSerialId]);

  useEffect(() => {
    if (testDetails) {
      setTestInformations(testDetails);
    }
  }, [testDetails]);

  useEffect(() => {
    if (nivel > 0) {
      fetchCategoriasPorNivel(nivel, setCategorias);
    }
  }, [nivel]);

  useEffect(() => {
    if (Object.keys(testInformations).length > 0 && categorias.length > 0) {
      const newQuestionValues = {};
      for (let level = 1; level <= 4; level++) {
        const indicesCategorias = getCategoriesByLevel(testInformations, level);
        const levelKey = `level_${level}`;

        newQuestionValues[levelKey] = getQuestionsValues(
          testInformations,
          indicesCategorias,
          level
        )[levelKey];
      }
      setQuestionValues(newQuestionValues);
      updateCategoriasSelecionadasFromTestDetails(
        testInformations,
        nivel,
        categorias,
        setCategoriasSelecionadas
      );
    }
  }, [testInformations, categorias]);

  useEffect(() => {
    localStorage.setItem(
      "categoriasSelecionadas",
      JSON.stringify(categoriasSelecionadas)
    );
  }, [categoriasSelecionadas]);

  useEffect(() => {
    localStorage.setItem(
      "questionValues",
      JSON.stringify(questionValues)
    );
  }, [questionValues]);

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
          setChangeCategory(true);

          setTimeout(() => {
            setChangeCategory(false);
          }, 2000);

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
      await updateQuestionValues(testId, questionValues);
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
      updateTestSituation(testId);
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
          display: { xs: "block", md: "flex" }, gap: "20vw",
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
            testDetails={testDetails}
            setTestInformations={setTestInformations}
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
          confirmButtonColor="var(--color-blue-2)"
          cancelButtonColor="var(--color-pink)"
          confirmButtonHoverColor='var(--color-blue-2)'
          cancelButtonHoverColor='var(--color-pink)'
          confirmButtonBorderColor="var(--color-blue-2)"
          cancelButtonBorderColor="var(--color-pink)"
          confirmButtonHoverBackground='' // cor ao fundo do botão à esquerda passando mouse
          cancelButtonHoverBackground='#ffe4ec' // cor do fundo do botão à direita passando mouse
          confirmButtonHoverBorderColor='' // cor da borda do botão à esquerda passando mouse
          cancelButtonHoverBorderColor='var(--color-pink)' // cor da borda do botão à direita passando mouse
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
          confirmButtonColor="var(--color-blue-2)"
          cancelButtonColor="var(--color-pink)"
          confirmButtonHoverColor='var(--color-blue-2)'
          cancelButtonHoverColor='var(--color-pink)'
          confirmButtonBorderColor="var(--color-blue-2)"
          cancelButtonBorderColor="var(--color-pink)"
          confirmButtonHoverBackground='' // cor ao fundo do botão à esquerda passando mouse
          cancelButtonHoverBackground='#ffe4ec' // cor do fundo do botão à direita passando mouse
          confirmButtonHoverBorderColor='' // cor da borda do botão à esquerda passando mouse
          cancelButtonHoverBorderColor='var(--color-pink)' // cor da borda do botão à direita passando mouse
          logoSrc={Logo}
          logoAlt="socialmentes-logo"
        />
      )}
      
      {changeCategory && (
        <Box sx={{
          position: "fixed",
          bottom: "3vh",
          left: `calc(${sidebarWidth} + (100vw - ${sidebarWidth}) / 2)`,
          transform: "translateX(-50%) translateY(-50%)",
          zIndex: "1000",
          width: "30vw",
          height: {lg: "2.5vh", md: "1.5vh"},
          padding: "1em",
          border: "2px solid var(--color-blue-4)",
          borderRadius: "15px",
          backgroundColor: "white",
          fontFamily: "var(--font-text)",
          color: "var(--color-gray-4)",
          fontWeight: "500",
          textAlign: "center",
        }} >
          Mude a competência/nível para adicionar outra checklist
        </Box>
      )}
    </Box>
  );
}
