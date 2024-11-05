import React, { useContext } from "react";
import { Box, useMediaQuery } from "@mui/material";
import Botao from "./Botao";
import iconAddToList from "../../../../Assets/Icons/add-list-icon.png";
import iconEncerrar from "../../../../Assets/Icons/check-icon.png";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { AppContext } from "../../../../Contexts/AppContext";

export default function FixedButtons({ handleAddQuestion, handleEncerrar, handleSaveAndExit }) {
    const isMobile = useMediaQuery('(max-width:768px)');
    const { open: isSidebarExpanded } = useContext(AppContext); // Get the sidebar state from context
    const sidebarWidth = isSidebarExpanded ? '20vw' : '5vw'; // Adjust according to your sidebar width

    return (
        <Box
            sx={{
                position: "fixed",
                bottom: 0,
                right: 0,
                zIndex: 10,
                display: "flex",
                width: `calc(100% - ${sidebarWidth})`,
                height: { sm: "8vh", md: "7.5vh", lg: "10vh"},
                backgroundColor: "white",
                padding: "0.5em 0",
                alignItems: "center",
                justifyContent: "space-between",
                gap: !isMobile ? "1em" : "0",
                transition: 'width 0.5s ease',
            }}
        >
            <Box sx={{
                marginLeft: {
                    xs: "2.75em",
                    sm: "3.75em"
                }
            }} >
                <Botao icon={iconAddToList} text="Adicionar Questão" onClick={handleAddQuestion} />
            </Box>

            <Box
                sx={{
                    display: "flex",
                    gap: isMobile ? "0" : "1em",
                    position: "absolute",
                    right: isMobile ? "1em" : "5em",
                }}
            >
                <Botao icon={<ExitToAppIcon fontSize="large" />} text="Salvar e sair" onClick={handleSaveAndExit} customClass="save-exit"/>
                <Botao icon={iconEncerrar} text="Finalizar" bgcolor="bg-blue" onClick={handleEncerrar} />
            </Box>
        </Box>
    );
}
