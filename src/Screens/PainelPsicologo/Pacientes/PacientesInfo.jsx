import React from "react";
import { Box } from "@mui/material";
import styles from "./PacientesInfo.module.css"
import BlueLine from "../../../Assets/Icons/BlueLine";
import iconAddToList from "../../../Assets/Icons/add-list-icon.png";

import Botao from "../../../Components/PainelPsicologo/Pacientes/CriarTeste/Botao";
import GridTestes from "../../../Components/PainelPsicologo/Pacientes/CriarTeste/GridTestes";

export default function PacientesInfo() {
  return (
    <Box sx={{
      marginX: { xs: "1em", sm: "3.75em" },
      marginTop: { xs: "1em", sm: "3em" },
      position: "sticky",
    }}>
      <Box className={styles.infoPacientes}>
        <div className={styles.titulo} >Informações do(a) paciente</div>
        <BlueLine />
        <div><span>Nome:</span> NomeTeste1 Sobrenome Sobrenome2</div>
        <div><span>Idade:</span> 13 anos e 5 meses</div>
        <div><span>Responsável:</span> NomeTeste1 Sobrenome Sobrenome2</div>
      </Box>

      <GridTestes />
      <Box sx={{
        marginY: {
          xs: "1em",
          sm: "3em",
        },
        marginLeft: {
          xs: "1em",
        }
      }}>
        <Botao icon={iconAddToList} text="Criar Teste" route="/painel-adm/pacientes/criar-teste" />
      </Box>

    </Box>
  );
}
