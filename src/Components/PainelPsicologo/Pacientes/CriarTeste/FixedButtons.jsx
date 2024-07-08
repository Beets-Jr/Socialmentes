import React from "react";
import { Box } from "@mui/material";
import Botao from "./Botao";
import iconAddToList from "../../../../Assets/Icons/add-list-icon.png";
import iconEncerrar from "../../../../Assets/Icons/check-icon.png";

export default function FixedButtons({ handleAdicionarQuestao }) {
    return (
        <Box
            sx={{
                position: "fixed", bottom: 0, zIndex: 10, display: "flex", backgroundColor: "white", padding: "0.5em",
                alignItems: "center", minWidth: "75%", maxWidth: "90%",
            }}
        >
            <Box>
                <Botao icon={iconAddToList} text="Adicionar Questão" onClick={handleAdicionarQuestao} />
            </Box>
            <Box sx={{ width: "52.5%" }}></Box>
            <Box sx={{ right: "1em" }}>
                <Botao icon={iconEncerrar} text="Encerrar" bgcolor="bg-blue" />
            </Box>
        </Box>
    );
}
