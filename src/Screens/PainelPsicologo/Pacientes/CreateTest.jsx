import React, { useEffect, useState, useContext } from "react";
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
  const [level, setLevel] = useState(null); // null means no level selected
  const [activeButtonIndex, setActiveButtonIndex] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState({});
  const [questions, setQuestions] = useState({});
  const [changeCategory, setChangeCategory] = useState(false);
  const [finish, setFinish] = useState(false);
  const [saveAndExit, setSaveAndExit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { testSerialId, testDetails } = location.state || {};

  // Load testId from state or localStorage
  useEffect(() => {
    if (testSerialId) {
      localStorage.setItem("testId", testSerialId);
      setTestId(testSerialId);
    } else {
      const storedTestId = localStorage.getItem("testId");
      if (storedTestId) setTestId(storedTestId);
    }
  }, [testSerialId]);

  // Load test details
  useEffect(() => {
    if (testDetails) setTestInformations(testDetails);
  }, [testDetails]);

  // Initialize questions state from testDetails if available
  useEffect(() => {
    if (testDetails && testDetails.questions) {
      setQuestions(testDetails.questions);
    }
  }, [testDetails]);

  // Fetch categories when level changes
  useEffect(() => {
    if (level !== null) {
      fetchCategoriesByLevel(level, setCategories);
      setSelectedOption("");
    } else {
      setCategories([]);
      setSelectedOption("");
    }
  }, [level]);

  // Update questions and selectedCategories when testInformations or categories change
  useEffect(() => {
    if (
      Object.keys(testInformations).length > 0 &&
      categories.length > 0 &&
      level !== null
    ) {
      const indicesCategorias = getCategoriesByLevel(testInformations, level);
      const levelKey = `level_${level}`;
      const newQuestions = getQuestions(testInformations, indicesCategorias, level);
      setQuestions((prev) => ({ ...prev, [levelKey]: newQuestions[levelKey] }));
      updateSelectedCategoriesFromTestInformations(
        testInformations,
        level,
        categories,
        setSelectedCategories
      );
    }
  }, [testInformations, categories, level]);

  const handleLevelChange = (newLevel) => {
    setLevel(newLevel);
    setActiveButtonIndex(newLevel - 1);
    setSelectedOption("");
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleAddQuestion = async () => {
    if (!selectedOption || level === null) return;
    if (selectedCategories[level]?.includes(selectedOption)) {
      setChangeCategory(true);
      setTimeout(() => setChangeCategory(false), 2000);
      return;
    }
    await updateSelectedCategories(level, [selectedOption], setSelectedCategories);
  };

  const handleSaveAndExit = async () => {
    try {
      setIsLoading(true);
      await updateQuestionsOfDatabase(testId, questions);
      setSaveAndExit(false);
      setIsLoading(false);
      navigate("/painel-psi/pacientes/informacoes", { replace: true });
    } catch (error) {
      setIsLoading(false);
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
      setIsLoading(false);
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
            disabled={false}
          />
          {level !== null && (
            <CompetenceSelector
              activeButtonIndex={activeButtonIndex}
              categories={categories}
              selectedOption={selectedOption}
              handleChange={handleChange}
            />
          )}
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
