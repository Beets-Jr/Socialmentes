import React from "react";
import { Box } from "@mui/material";
import GridTestes from "../../../Components/Psicologo/PacientesPage/GridTestes";
import styles from "./Psicologo.module.css"
import BlueLine from "../../../Assets/Icons/BlueLine";
import Botao from "../../../Components/Psicologo/PacientesPage/Botao";
import iconAddToList from "../../../Assets/Icons/add-list-icon.jpg"

export default function PacientesPage() {
  return (
    <Box sx={{ marginLeft: "3.75em", marginTop: "3em" }}>
        <Box className={styles.infoPacientes}>
            <div className={styles.titulo} >Informações do(a) paciente</div>
            <BlueLine />
            <div><span>Nome:</span> NomeTeste1 Sobrenome Sobrenome2</div>
            <div><span>Idade:</span> 13 anos e 5 meses</div>
            <div><span>Responsável:</span> NomeTeste1 Sobrenome Sobrenome2</div>
        </Box>

        <GridTestes />
        <div style={{ marginTop: "5vh", marginBottom: "5vh" }}>
            <Botao icon={iconAddToList} text="Criar Teste"  />
        </div>
        
    </Box>
  );
}
