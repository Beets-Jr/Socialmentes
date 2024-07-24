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
  return (
    <Box sx={{ marginLeft: "3.75em", marginTop: "3em", position: "sticky", }}>
      <Box className={styles.infoPacientes}>
        <div className={styles.titulo} >Informações do(a) paciente</div>
        <BlueLine />
        <div><span>Nome:</span> NomeTeste1 Sobrenome Sobrenome2</div>
        <div><span>Idade:</span> 13 anos e 5 meses</div>
        <div><span>Responsável:</span> NomeTeste1 Sobrenome Sobrenome2</div>
      </Box>

      <GridTestes />
      <div style={{ marginTop: "5vh", marginBottom: "5vh" }}>
        <Botao icon={iconAddToList} text="Criar Teste" route="/painel-adm/pacientes/criar-teste" />
      </div>

    </Box>
  );
}
