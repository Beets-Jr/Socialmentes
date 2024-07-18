import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import styles from "./PacientesInfo.module.css";
import BlueLine from "../../../Assets/Icons/BlueLine";
import iconAddToList from "../../../Assets/Icons/add-list-icon.png";
import Botao from "../../../Components/PainelPsicologo/Pacientes/CriarTeste/Botao";
import GridTestes from "../../../Components/PainelPsicologo/Pacientes/CriarTeste/GridTestes";
import { getTestsFromPatient } from "../../../Services/Tests/GetTestsFromPatient.mjs";
import { createTestForPatient } from "../../../Services/Tests/testsFunctions.mjs";

export default function PacientesInfo() {
    const location = useLocation();
    const { patient } = location.state || {};
    const [patientTests, setPatientTests] = useState([]);
    const navigate = useNavigate();

    if (!patient) {
        return <div>Dados do paciente não disponíveis</div>;
    }

    async function getTests() {
        const patientTests = await getTestsFromPatient(patient.id);
        setPatientTests(patientTests);
        console.log("Patient Tests: ", patientTests);
    }

    useEffect(() => {
        getTests();
    }, []);

    const handleCriarTeste = async () => {
        try {
            // Lógica para criar o documento teste no banco de dados, atribuindo o ID do paciente
            console.log("Criando teste para o paciente ", patient.childName, "cujo id é: ", patient.id);
            const createdTestId = await createTestForPatient(patient.id, patient.childName);
    
            // Navega para a rota após o sucesso da criação do teste
            navigate(`/painel-adm/pacientes/teste/${createdTestId}`);
        } catch (error) {
            console.error("Erro ao criar teste:", error);
            // Tratar o erro adequadamente aqui
        }
    }    

    return (
        <Box sx={{ marginLeft: "3.75em", marginTop: "3em", position: "sticky" }}>
            <Box className={styles.infoPacientes}>
                <div className={styles.titulo}>Informações do(a) paciente</div>
                <BlueLine />
                <div><span>Nome:</span> {patient.childName}</div>
                <div><span>Idade:</span> {patient.age}</div>
                <div><span>Responsável:</span> {patient.psychologistName}</div>
            </Box>

            <GridTestes testsInfo={patientTests} />
            <div style={{ marginTop: "5vh", marginBottom: "5vh" }} onClick={handleCriarTeste}>
                <Botao icon={iconAddToList} text="Criar Teste" />
            </div>
        </Box>
    );
}
