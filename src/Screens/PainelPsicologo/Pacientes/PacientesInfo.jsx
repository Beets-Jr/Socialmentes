import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import styles from "./PacientesInfo.module.css";
import BlueLine from "../../../Assets/Icons/BlueLine";
import iconAddToList from "../../../Assets/Icons/add-list-icon.png";
import Botao from "../../../Components/PainelPsicologo/Pacientes/CriarTeste/Botao";
import GridTestes from "../../../Components/PainelPsicologo/Pacientes/CriarTeste/GridTestes";
import { getTestsFromPatient } from "../../../Services/Tests/GetTestsFromPatient.mjs";

export default function PacientesInfo() {
    const location = useLocation();
    const { patient } = location.state || {};
    const [patientTests, setPatientTests] = useState([]);

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
            <div style={{ marginTop: "5vh", marginBottom: "5vh" }}>
                <Botao icon={iconAddToList} text="Criar Teste" route="/painel-adm/pacientes/criar-teste" />
            </div>
        </Box>
    );
}
