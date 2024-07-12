import React from "react";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import styles from "./PacientesInfo.module.css";
import BlueLine from "../../../Assets/Icons/BlueLine";
import iconAddToList from "../../../Assets/Icons/add-list-icon.png";
import Botao from "../../../Components/PainelPsicologo/Pacientes/CriarTeste/Botao";
import GridTestes from "../../../Components/PainelPsicologo/Pacientes/CriarTeste/GridTestes";

export default function PacientesInfo() {
    const location = useLocation();
    const { patient } = location.state || {};

    if (!patient) {
        return <div>Dados do paciente não disponíveis</div>;
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

            <GridTestes />
            <div style={{ marginTop: "5vh", marginBottom: "5vh" }}>
                <Botao icon={iconAddToList} text="Criar Teste" route="/painel-adm/pacientes/criar-teste" />
            </div>
            {
                console.log(patient)
            }
        </Box>
    );
}
