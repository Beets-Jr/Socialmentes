import React, { useEffect, useState, useContext, useLayoutEffect } from "react";
import { Box } from "@mui/material";
import FixedButtons from "../../../Components/PainelPsicologo/Pacientes/CriarTeste/FixedButtons";
import {
  fetchCategoriesByLevel,
  updateSelectedCategoriesFromTestInformations,
  updateSelectedCategories,
} from "./CriarTesteUtils";
import {
  getCategoriesByLevel,
  getQuestions,
} from "../../../Services/Tests/Category/GetCategories.mjs";
import { updateQuestionsOfDatabase } from "../../../Services/Tests/testsFunctions.mjs";
import { useNavigate, useLocation } from "react-router-dom";
import { treatQuestionValues } from "../../../Validators/Tests/treatData";
import DialogConfirmation from "../../../Components/ElementsInterface/DialogConfirmation";
import Logo from "../../../Assets/LogoSocialMentes1.png";
import { updateTestSituation } from "../../../Services/testsPatientsService";
import { AppContext } from "../../../Contexts/AppContext";
import LevelSelector from "../../../Components/PainelPsicologo/Pacientes/CriarTeste/LevelSelector";
import CompetenceSelector from "../../../Components/PainelPsicologo/Pacientes/CriarTeste/CompetenceSelector";
import QuestionsList from "../../../Components/PainelPsicologo/Pacientes/CriarTeste/QuestionsList";

export default function CreateTest() {
  const { open: isSidebarExpanded } = useContext(AppContext);
  const sidebarWidth = isSidebarExpanded ? "20vw" : "5vw";

  const [testId, setTestId] = useState("");
  const [testInformations, setTestInformations] = useState({});
  const [level, setLevel] = useState(1);
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState({});
  const [questions, setQuestions] = useState({});

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [changeCategory, setChangeCategory] = useState(false);
  
  const [loading, setLoading] = useState(true);
  const [levelChangeCount, setLevelChangeCount] = useState(0);

  const [finish, setFinish] = useState(false);
  const [saveAndExit, setSaveAndExit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { testSerialId, testDetails } = location.state || {};

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
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
    if (level > 0) {
      fetchCategoriesByLevel(level, setCategories);
    }
  }, [level]);

  useEffect(() => {
    if (Object.keys(testInformations).length > 0 && categories.length > 0) {
      const newQuestions = {};
      for (let level = 1; level <= 4; level++) {
        const indicesCategorias = getCategoriesByLevel(testInformations, level);
        const levelKey = `level_${level}`;

        newQuestions[levelKey] = getQuestions(
          testInformations,
          indicesCategorias,
          level
        )[levelKey];
      }
      setQuestions(newQuestions);
      updateSelectedCategoriesFromTestInformations(
        testInformations,
        level,
        categories,
        setSelectedCategories
      );

     // Carregar as questões iniciais automaticamente até o nível 4
    if (loading && levelChangeCount < 4) {
      handleLevelChange(level + 1);
    } else {
      setLoading(false);
    }
      
      console.log(loading);
    }
  }, [testInformations, categories]);

  const handleLevelChange = (newLevel) => {
    if (levelChangeCount <= 3) {
      setLevel(newLevel);
      if (levelChangeCount != 3) {
        setLevelChangeCount(prevCount => prevCount + 1);
      } else {
        setLevel(1);
      }
    } else if (activeButtonIndex != newLevel) {
      setLevel(newLevel);
      setIsButtonDisabled(true);
      setLevelChangeCount(prevCount => prevCount + 1);
      setActiveButtonIndex(newLevel);
      setSelectedOption("");
      setCategories([]);
    }
  }; 

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleAddQuestion = async () => {
    try {
      if (selectedOption) {
        if (selectedCategories[level]?.includes(selectedOption)) {
          setChangeCategory(true);

          setTimeout(() => {
            setChangeCategory(false);
          }, 2000);

          return;
        }

        await updateSelectedCategories(
          level,
          [selectedOption],
          setSelectedCategories
        );
      }
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  const handleSaveAndExit = async () => {
    try {
      setIsLoading(true);
      await updateQuestionsOfDatabase(testId, questions);

      setSaveAndExit(false);
      setIsLoading(false);

      navigate("/painel-psi/pacientes/informacoes", { replace: true });
    } catch (error) {
      console.error("Erro ao salvar e sair:", error);
    }
  };

  const handleFinish = async () => {
    try {
      setIsLoading(true);
      const treatQValues = treatQuestionValues(questions);
      await updateQuestionsOfDatabase(testId, treatQValues);
      await updateTestSituation(testId);

      setFinish(false);
      setIsLoading(false);

      navigate("/painel-psi/pacientes/informacoes", { replace: true });
    } catch (error) {
      console.error("Erro ao finish:", error);
    }
  };

  return (
    <Box
      sx={{
        position: "sticky",
        marginTop: {
          xs: "1em",
          sm: "2.5em",
        },
        marginLeft: {
          xs: "1em",
          sm: "3.75em",
        },
      }}
    >
      <Box>
        <Box
          sx={{
            display: { xs: "block", md: "flex" },
            gap: "20vw",
          }}
        >
          <LevelSelector
            activeButtonIndex={activeButtonIndex}
            handleLevelChange={handleLevelChange}
            disabled={isButtonDisabled}
          />
          <CompetenceSelector
            activeButtonIndex={activeButtonIndex}
            categories={categories}
            selectedOption={selectedOption}
            handleChange={handleChange}
          />
        </Box>
        <Box
          sx={{
            marginTop: "5vh",
            marginBottom: "9vh",
          }}
        >
          <QuestionsList
            testId={testId}
            testDetails={testDetails}
            setTestInformations={setTestInformations}
            level={level}
            selectedCategories={selectedCategories}
            setQuestions={setQuestions}
            questions={questions}
            categories={categories}
            setSelectedCategories={setSelectedCategories}
          />
        </Box>
        <FixedButtons
          handleAddQuestion={handleAddQuestion}
          handlefinish={() => setFinish(true)}
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
          isLoading={isLoading}
        />
      )}

      {finish && (
        <DialogConfirmation
          open={finish}
          onClose={() => setFinish(false)}
          onConfirm={handleFinish}
          messageTitle="Você deseja finalizar o seu teste?"
          message="Caso finalizado, você não poderá alterá-lo depois!"
          confirmButtonText="Finalizar"
          cancelButtonText="Cancelar"
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
          isLoading={isLoading}
        />
      )}

      {changeCategory && (
        <Box
          sx={{
            position: "fixed",
            bottom: "3vh",
            left: `calc(${sidebarWidth} + (100vw - ${sidebarWidth}) / 2)`,
            transform: "translateX(-50%) translateY(-50%)",
            zIndex: "1000",
            width: "30vw",
            height: { lg: "2.5vh", md: "1.5vh" },
            padding: "1em",
            border: "2px solid var(--color-blue-4)",
            borderRadius: "15px",
            backgroundColor: "white",
            fontFamily: "var(--font-text)",
            color: "var(--color-gray-4)",
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          Mude a competência/nível para adicionar outra checklist
        </Box>
      )}
    </Box>
  );
}
