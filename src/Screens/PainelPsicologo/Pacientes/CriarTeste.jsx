import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import NivelSelector from "../../../Components/PainelPsicologo/Pacientes/CriarTeste/NivelSelector";
import CompetenciaSelector from "../../../Components/PainelPsicologo/Pacientes/CriarTeste/CompetenciaSelector";
import QuestoesList from "../../../Components/PainelPsicologo/Pacientes/CriarTeste/QuestoesList";
import FixedButtons from "../../../Components/PainelPsicologo/Pacientes/CriarTeste/FixedButtons";
import { useLocation } from "react-router-dom";
import {
    loadInitialDataFromLocalStorage,
    fetchCategoriasPorNivel,
    updateCategoriasSelecionadasFromTestDetails,
    updateDatabase,
    updateCategoriasSelecionadas,
} from "./CriarTesteUtils";
import { getCategoriesByLevel, getQuestionsValues } from "../../../Services/Tests/Category/GetCategorys.mjs";

export default function CriarTeste() {
    const [testId, setTestId] = useState('');
    const [nivel, setNivel] = useState(1);
    const [activeButtonIndex, setActiveButtonIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [categoriasSelecionadas, setCategoriasSelecionadas] = useState({});
    const [questionValues, setQuestionValues] = useState({});

    const location = useLocation();
    const { testDetails, testDocId } = location.state || {};

    useEffect(() => {
        console.log("Loading initial data from local storage");
        loadInitialDataFromLocalStorage(setTestId, setCategoriasSelecionadas);
    }, []);

    useEffect(() => {
        if (nivel > 0) {
            console.log("Fetching categories for level:", nivel);
            fetchCategoriasPorNivel(nivel, setCategorias);
        }
        const indicesCategorias = getCategoriesByLevel(testDetails, nivel);
        const newQuestionValues = getQuestionsValues(testDetails, indicesCategorias, nivel);
        setQuestionValues(newQuestionValues);
    }, [nivel]);

    useEffect(() => {
        console.log("Question Values:", questionValues);
    }, [questionValues]);

    useEffect(() => {
        if (categorias.length > 0) {
            console.log("Updating selected categories from test details", testDetails);
            updateCategoriasSelecionadasFromTestDetails(testDetails, nivel, categorias, setCategoriasSelecionadas);
        }
    }, [categorias]);

    useEffect(() => {
        console.log("Selected categories changed:", categoriasSelecionadas);
        localStorage.setItem('categoriasSelecionadas', JSON.stringify(categoriasSelecionadas));
        if (testId && nivel > 0 && selectedOption) {
            console.log("Updating database with selected category:", selectedOption);
            updateDatabase(testId, nivel, selectedOption, categorias);
        }
    }, [categoriasSelecionadas]);

    const handleButtonClick = (index) => {
        console.log("Button clicked, changing to level:", index + 1);
        setActiveButtonIndex(index);
        setNivel(index + 1);
        setSelectedOption("");
        setCategorias([]);
    };

    const handleChange = (event) => {
        console.log("Selected option changed:", event.target.value);
        setSelectedOption(event.target.value);
    };

    const handleAdicionarQuestao = async () => {
        try {
            if (selectedOption) {
                if (categoriasSelecionadas[nivel]?.includes(selectedOption)) {
                    alert("Essa categoria já foi selecionada para este nível.");
                    return;
                }
                console.log("Adding question to selected categories:", selectedOption);
                await updateCategoriasSelecionadas(nivel, [selectedOption], setCategoriasSelecionadas);
            }
        } catch (error) {
            console.error("Error adding question:", error);
        }
    };

    const handleEncerrar = () => {
        console.log("Encerrar Teste");
    };

    return (
        <Box sx={{ position: "sticky", marginTop: "2.5em", marginLeft: "3.75em" }}>
            <Box>
                <Box sx={{ display: "flex", gap: "20vw" }}>
                    <NivelSelector
                        activeButtonIndex={activeButtonIndex}
                        handleButtonClick={handleButtonClick}
                    />
                    <CompetenciaSelector
                        activeButtonIndex={activeButtonIndex}
                        categorias={categorias}
                        selectedOption={selectedOption}
                        handleChange={handleChange}
                    />
                </Box>
                <Box sx={{ marginTop: "5vh" }}>
                    <QuestoesList
                        nivel={nivel}
                        categoriasSelecionadas={categoriasSelecionadas}
                        testId={testId}
                        setQuestionValues={setQuestionValues}
                        questionValues={questionValues}
                    />
                </Box>
                <FixedButtons
                    handleAdicionarQuestao={handleAdicionarQuestao}
                    handleEncerrar={handleEncerrar}
                />
            </Box>
        </Box>
    );
}
