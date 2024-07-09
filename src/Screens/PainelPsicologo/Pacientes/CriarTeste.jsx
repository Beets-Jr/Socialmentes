import React, { useEffect, useState } from "react";
import { getCategoriaNomesPorNivel } from "../../../Database/Utils/testsInfoFunctions";
import { Box } from "@mui/material";
import NivelSelector from "../../../Components/PainelPsicologo/Pacientes/CriarTeste/NivelSelector";
import CompetenciaSelector from "../../../Components/PainelPsicologo/Pacientes/CriarTeste/CompetenciaSelector";
import QuestoesList from "../../../Components/PainelPsicologo/Pacientes/CriarTeste/QuestoesList";
import FixedButtons from "../../../Components/PainelPsicologo/Pacientes/CriarTeste/FixedButtons";
import { getTestById } from "../../../Database/Utils/testsFunctions";

export default function CriarTeste() {
  const [activeButtonIndex, setActiveButtonIndex] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [nivel, setNivel] = useState(0);
  const [categorias, setCategorias] = useState([]);
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState({});

  async function logTestInfo(testId) {
    const testInfo = await getTestById(testId);

    if (testInfo) {
        console.log(`ID: ${testInfo.id}`);
        console.log(`Patient ID: ${testInfo.patientId}`);
        console.log(`Patient Name: ${testInfo.patientName}`);
        console.log(`Situation: ${testInfo.situation}`);
        console.log(`Test Type: ${testInfo.testType}`);
        console.log(`Timestamp: ${testInfo.timestamp}`);
    } else {
        console.log('Test information could not be retrieved.');
    }
}

  // Chame a função com um ID de teste específico
  logTestInfo('E3ssWQUAx0iRiHr7T4ei'); // Substitua '12345abcde' pelo ID do teste desejado

  useEffect(() => {
    if (nivel > 0) {
      const categorias = getCategoriaNomesPorNivel(nivel);
      setCategorias(categorias);
    }
  }, [nivel]);

  const handleButtonClick = (index) => {
    setActiveButtonIndex(index);
    setNivel(index + 1);
    setSelectedOption("");
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleAdicionarQuestao = () => {
    if (selectedOption) {
      if (categoriasSelecionadas[nivel]?.includes(selectedOption)) {
        {
          /** substituir pelo alerta devido */
        }
        alert("Essa categoria já foi selecionada para este nível.");
        return;
      }

      const updatedCategoriasSelecionadas = {
        ...categoriasSelecionadas,
        [nivel]: [...(categoriasSelecionadas[nivel] || []), selectedOption],
      };
      setCategoriasSelecionadas(updatedCategoriasSelecionadas);
    }
  };

  const handleEncerrar = () => {
    console.log("click");
  };

  return (
    <Box sx={{ position: "sticky", marginTop: "2.5em", marginLeft: "3.75em" }}>
      <Box>
        <Box sx={{ display: "flex", gap: "20vw" }}>
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

        <Box sx={{ marginTop: "5vh" }}>
          <QuestoesList
            nivel={nivel}
            categoriasSelecionadas={categoriasSelecionadas}
          />
        </Box>
        <FixedButtons
          handleAdicionarQuestao={handleAdicionarQuestao}
          handleEncerrar={handleEncerrar}
        />
      </Box>

    </Box>
  );
}
