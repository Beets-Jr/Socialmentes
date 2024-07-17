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
    const [categoryIndex, setCategoryIndex] = useState(null);

    const location = useLocation();
    const { testDetails, testDocId } = location.state || {};

    useEffect(() => {
        if (testDocId) {
            localStorage.setItem('testId', testDocId);
            setTestId(testDocId);
        } else {
            const storedTestId = localStorage.getItem('testId');
            if (storedTestId) {
                setTestId(storedTestId);
            }
        }
    }, [testDocId]);

    useEffect(() => {
        console.log("Loading initial data from local storage");
        loadInitialDataFromLocalStorage(setTestId, setCategoriasSelecionadas);
    }, []);

    useEffect(() => {
        if (nivel > 0) {
            console.log("Fetching categories for level:", nivel);
            fetchCategoriasPorNivel(nivel, setCategorias);
        }
    }, [nivel]);

    useEffect(() => {
        if (testDetails && nivel > 0) {
            console.log("Updating question values and selected categories for level:", nivel);
            const indicesCategorias = getCategoriesByLevel(testDetails, nivel);
            const newQuestionValues = getQuestionsValues(testDetails, indicesCategorias, nivel);
            setQuestionValues(newQuestionValues);
            updateCategoriasSelecionadasFromTestDetails(testDetails, nivel, categorias, setCategoriasSelecionadas);
        }
    }, [nivel, testDetails, categorias]);

    useEffect(() => {
        console.log("Question Values:", questionValues);
    }, [questionValues]);

    useEffect(() => {
        console.log("Selected categories changed:", categoriasSelecionadas);
        localStorage.setItem('categoriasSelecionadas', JSON.stringify(categoriasSelecionadas));
    }, [categoriasSelecionadas, testId, nivel, selectedOption]);

    useEffect(() => {
        if (selectedOption && categorias.length > 0) {
            const index = categorias.indexOf(selectedOption);
        }
    }, [selectedOption, categorias]);

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
                if (testId && nivel > 0 && selectedOption) {
                    console.log("Updating database with selected category:", selectedOption);
                    const newIndex = await updateDatabase(testId, nivel, selectedOption, categorias);
                    console.log("Received category index from updateDatabase:", newIndex);
                    setCategoryIndex(newIndex);  // Atualiza o estado com o índice da categoria
                }
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
                        categoryIndex={categoryIndex}  // Passa o categoryIndex como prop
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