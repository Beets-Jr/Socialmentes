import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Paper, Button } from "@mui/material";
import styles from "./PacientesInfo.module.css";
import BlueLine from "../../../Assets/Icons/BlueLine";
import iconAddToList from "../../../Assets/Icons/add-list-icon.png";
import Botao from "../../../Components/PainelPsicologo/Pacientes/CriarTeste/Botao";
import GridTestes from "../../../Components/PainelPsicologo/Pacientes/CriarTeste/GridTestes";
import { getTestsFromPatient } from "../../../Services/Tests/GetTestsFromPatient.mjs";
import ExitIcon from "../../../Assets/Icons/XexitIcon.png";
import { createTestForPatient } from "../../../Services/Tests/testsFunctions.mjs";

export default function PacientesInfo() {
  const location = useLocation();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(location.state?.patient || JSON.parse(localStorage.getItem('patient')) || {});
  const [patientTests, setPatientTests] = useState([]);
  const [testeNaoFinalizado, setTesteNaoFinalizado] = useState(false);

  useEffect(() => {
    if (Object.keys(patient).length !== 0) {
      localStorage.setItem('patient', JSON.stringify(patient));
      getTests();
    } else {
      console.error("Nenhum dado de paciente disponível.");
    }
  }, [patient]);

  if (Object.keys(patient).length === 0) {
    return <div>Dados do paciente não disponíveis</div>;
  }

  async function getTests() {
    try {
      const patientTests = await getTestsFromPatient(patient.id);
      setPatientTests(patientTests);
      console.log("Testes do paciente:", patientTests);
    } catch (error) {
      console.error("Erro ao buscar testes:", error);
    }
  }

  const handleCriarTeste = async () => {
    const unfinishedTestCount = patientTests.filter(test => test.situation === 1).length;

    if (unfinishedTestCount === 0) {
      try {
        console.log("Criando teste para o paciente", patient.childName, "cujo id é:", patient.id);
        const createdTestId = await createTestForPatient(patient.id, patient.childName);

        navigate(`/painel-psi/pacientes/teste/${createdTestId}`, {
          state: { testDocId: createdTestId },
        });
      } catch (error) {
        console.error("Erro ao criar teste:", error);
      }
    } else {
      setTesteNaoFinalizado(true);
    }
  }

  return (
    <Box sx={{
      marginX: { xs: "1em", sm: "3.75em" },
      marginTop: { xs: "1em", sm: "3em" },
      position: "sticky",
    }}>
      <Box className={styles.infoPacientes} sx={{ display: "flex", flexDirection: "row", gap: "60%" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "3vh" }}>
          <div className={styles.titulo}>Informações do(a) paciente</div>
          <BlueLine />
          <div><span>Nome:</span> {patient.childName} </div>
          <div><span>Idade:</span> {patient.age} </div>
          <div><span>Responsável:</span> {patient.psychologistName} </div>
        </Box>

        <Box onClick={() => navigate('/painel-psi/pacientes')} sx={{ cursor: "pointer", marginLeft: "3vw" }}>
          <img src={ExitIcon} alt="Sair" />
        </Box>
      </Box>

      <GridTestes testsInfo={patientTests} />
      <Box
        sx={{
          marginY: { xs: "1em", sm: "3em" },
          marginLeft: { xs: "1em" }
        }}
        onClick={handleCriarTeste}
      >
        <Botao fullText icon={iconAddToList} text="Criar Teste" />
      </Box>

      {/** Exibir o componente correto */}
      {testeNaoFinalizado && (
        <Paper
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
          <p>Você tem um teste não finalizado, finalize-o antes de criar outro.</p>
          <Button
            onClick={() => setTesteNaoFinalizado(false)}
            variant="contained"
            color="primary"
            sx={{ marginRight: "1em" }}
          >
            OK
          </Button>
        </Paper>
      )}
    </Box>
  );
}