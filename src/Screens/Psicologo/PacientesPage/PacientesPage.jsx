import React from "react";
import { Box, Button, Typography } from "@mui/material";
import GridTestes from "../../../Components/Psicologo/PacientesPage/GridTestes";


export default function PacientesPage() {
  return (
    <Box sx={{ margin: "2em" }}>
        <Box>
            <h1>Informações do(a) paciente</h1>
            <h2>Nome: NomeTeste1 Sobrenome Sobrenome2</h2>
            <h2>Idade: 13 anos e 5 meses</h2>
            <h2>Responsável: NomeTeste1 Sobrenome Sobrenome2</h2>
        </Box>

        <GridTestes />

        <Button sx={{ marginTop: "5vh"}} > Criar Teste</Button>
    </Box>
  );
}
