import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import Botao from "./Botao";
import iconAddToList from "../../../../Assets/Icons/add-list-icon.png";
import iconEncerrar from "../../../../Assets/Icons/check-icon.png";

export default function FixedButtons({ handleAdicionarQuestao, handleEncerrar }) {
    const isMobile = useMediaQuery('(max-width:768px)');

    return (
        <Box
            sx={{
                position: "fixed",
                bottom: 0,
                zIndex: 10,
                display: "flex",
                backgroundColor: "white",
                padding: "0.5em 0",
                alignItems: "center",
                minWidth: "85%",
                maxWidth: "90%",
                gap: !isMobile ? "1em" : "0",

            }}
        >
            <Box>
                <Botao icon={iconAddToList} text="Adicionar Questão" onClick={handleAdicionarQuestao} />
            </Box>

            <Box
                sx={{
                    display: "flex",
                    gap: isMobile ? "0" : "1em",
                    flex: !isMobile ? 1 : 0,
                    justifyContent: isMobile ? 'center' : 'flex-end'
                }}
            >
                <Botao icon={iconEncerrar} text="Salvar e sair" bgcolor="bg-blue" onClick={handleEncerrar} />
                <Botao icon={iconEncerrar} text="Encerrar" bgcolor="bg-blue" onClick={handleEncerrar} />
            </Box>
        </Box>
    );
}
