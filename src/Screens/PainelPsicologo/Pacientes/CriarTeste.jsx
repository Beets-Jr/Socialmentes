import React, { useEffect, useState } from "react";
import { getCategoriaNomesPorNivel } from "../../../Database/Utils/testsInfoFunctions";
import { Box } from "@mui/material";
import NivelSelector from "../../../Components/PainelPsicologo/Pacientes/CriarTeste/NivelSelector";
import CompetenciaSelector from "../../../Components/PainelPsicologo/Pacientes/CriarTeste/CompetenciaSelector";
import QuestoesList from "../../../Components/PainelPsicologo/Pacientes/CriarTeste/QuestoesList";
import FixedButtons from "../../../Components/PainelPsicologo/Pacientes/CriarTeste/FixedButtons";
import { useLocation } from "react-router-dom";
import { getCategoriesByLevel } from "../../../Services/Tests/Category/GetCategorys.mjs";
import { addCategoryToLevel } from "../../../Database/Utils/testsFunctions.mjs";

export default function CriarTeste() {
    const [testId, setTestId] = useState('');
    const [nivel, setNivel] = useState(1);
    const [activeButtonIndex, setActiveButtonIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [categoriasSelecionadas, setCategoriasSelecionadas] = useState({});

    const location = useLocation();
    const { testDetails, testDocId } = location.state || {};

    useEffect(() => {
        console.log("Loading initial data from local storage");
        loadInitialDataFromLocalStorage();
    }, []);

    useEffect(() => {
        if (nivel > 0) {
            console.log("Fetching categories for level:", nivel);
            fetchCategoriasPorNivel();
        }
    }, [nivel]);

    useEffect(() => {
        if (categorias.length > 0) {
            console.log("Updating selected categories from test details");
            updateCategoriasSelecionadasFromTestDetails();
        }
    }, [categorias]);

    useEffect(() => {
        console.log("Selected categories changed:", categoriasSelecionadas);
        localStorage.setItem('categoriasSelecionadas', JSON.stringify(categoriasSelecionadas));
        if (testId && nivel > 0 && selectedOption) {
            console.log("Updating database with selected category:", selectedOption);
            updateDatabase();
        }
    }, [categoriasSelecionadas]);

    const loadInitialDataFromLocalStorage = () => {
        const storedTestId = localStorage.getItem('testId');
        const storedCategoriasSelecionadas = localStorage.getItem('categoriasSelecionadas');

        if (storedTestId) {
            console.log("Loaded test ID from local storage:", storedTestId);
            setTestId(storedTestId);
        }

        if (storedCategoriasSelecionadas) {
            console.log("Loaded selected categories from local storage");
            setCategoriasSelecionadas(JSON.parse(storedCategoriasSelecionadas));
        }
    };

    const fetchCategoriasPorNivel = async () => {
        try {
            const fetchedCategorias = await getCategoriaNomesPorNivel(nivel);
            console.log("Fetched categories:", fetchedCategorias);
            setCategorias(fetchedCategorias);
        } catch (error) {
            console.error("Error fetching categories by level:", error);
        }
    };

    const updateCategoriasSelecionadasFromTestDetails = () => {
        if (testDetails) {
            const indicesCategorias = getCategoriesByLevel(testDetails, nivel);
            const categoriasJaSelecionadas = getCategoriasByIndices(categorias, indicesCategorias);
            updateCategoriasSelecionadas(nivel, categoriasJaSelecionadas);
        }
    };

    const getCategoriasByIndices = (categorias, indices) => {
        return indices.map(index => categorias[index]);
    };

    const updateCategoriasSelecionadas = (nivel, novasCategorias) => {
        setCategoriasSelecionadas(prevState => {
            const categoriasAtuais = prevState[nivel] || [];
            const categoriasAtualizadas = [...new Set([...categoriasAtuais, ...novasCategorias])];
            console.log("Updated selected categories for level:", nivel, categoriasAtualizadas);
            return {
                ...prevState,
                [nivel]: categoriasAtualizadas
            };
        });
    };

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

    const handleAdicionarQuestao = () => {
        if (selectedOption) {
            if (categoriasSelecionadas[nivel]?.includes(selectedOption)) {
                alert("Essa categoria já foi selecionada para este nível.");
                return;
            }
            console.log("Adding question to selected categories:", selectedOption);
            updateCategoriasSelecionadas(nivel, [selectedOption]);
        }
    };

    const handleEncerrar = () => {
        console.log("Encerrar Teste");
    };

    const updateDatabase = async () => {
        try {
            const categoryIndex = categorias.indexOf(selectedOption);
            await addCategoryToLevel(testId, nivel, categoryIndex);
            console.log("Database updated successfully");
        } catch (error) {
            console.error("Error updating database:", error);
        }
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
