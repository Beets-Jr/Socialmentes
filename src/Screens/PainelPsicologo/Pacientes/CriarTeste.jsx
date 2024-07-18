import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import NivelSelector from "../../../Components/PainelPsicologo/Pacientes/CriarTeste/NivelSelector";
import CompetenciaSelector from "../../../Components/PainelPsicologo/Pacientes/CriarTeste/CompetenciaSelector";
import QuestoesList from "../../../Components/PainelPsicologo/Pacientes/CriarTeste/QuestoesList";
import FixedButtons from "../../../Components/PainelPsicologo/Pacientes/CriarTeste/FixedButtons";
import {
    loadInitialDataFromLocalStorage,
    fetchCategoriasPorNivel,
    updateCategoriasSelecionadasFromTestDetails,
    updateCategoriasSelecionadas,
} from "./CriarTesteUtils";
import { getCategoriesByLevel, getQuestionsValues } from "../../../Services/Tests/Category/GetCategorys.mjs";
import { updateQuestionValues } from "../../../Services/Tests/testsFunctions.mjs";
import { useNavigate, useLocation } from "react-router-dom";

export default function CriarTeste() {
    const [testId, setTestId] = useState("");
    const [nivel, setNivel] = useState(1);
    const [activeButtonIndex, setActiveButtonIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [categoriasSelecionadas, setCategoriasSelecionadas] = useState({});
    const [questionValues, setQuestionValues] = useState({});
    const [unsavedChanges, setUnsavedChanges] = useState(false); // Estado para controlar mudanças não salvas

    const navigate = useNavigate();
    const location = useLocation();
    const { testDetails, testDocId } = location.state || {};

    useEffect(() => {
        if (testDocId) {
            localStorage.setItem("testId", testDocId);
            setTestId(testDocId);
        } else {
            const storedTestId = localStorage.getItem("testId");
            if (storedTestId) {
                setTestId(storedTestId);
            }
        }
    }, [testDocId]);

    useEffect(() => {
        loadInitialDataFromLocalStorage(setTestId, setCategoriasSelecionadas);
    }, []);

    useEffect(() => {
        if (nivel > 0) {
            fetchCategoriasPorNivel(nivel, setCategorias);
        }
    }, [nivel]);

    useEffect(() => {
        if (testDetails && nivel > 0) {
            const indicesCategorias = getCategoriesByLevel(testDetails, nivel);
            const newQuestionValues = getQuestionsValues(testDetails, indicesCategorias, nivel);
            setQuestionValues(newQuestionValues);
            updateCategoriasSelecionadasFromTestDetails(testDetails, nivel, categorias, setCategoriasSelecionadas);
        }
    }, [nivel, testDetails, categorias]);

    useEffect(() => {
        localStorage.setItem("categoriasSelecionadas", JSON.stringify(categoriasSelecionadas));
    }, [categoriasSelecionadas]);

    // Efeito para capturar a navegação
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (unsavedChanges) {
                const confirmation = window.confirm("Você tem alterações não salvas. Deseja sair?");
                if (confirmation) {
                    // Permitir a navegação
                    return undefined;
                } else {
                    // Bloquear a navegação
                    event.preventDefault();
                    return (event.returnValue = "Existem alterações não salvas. Deseja realmente sair?");
                }
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [unsavedChanges]);

    const handleButtonClick = (index) => {
        setActiveButtonIndex(index);
        setNivel(index + 1);
        setSelectedOption("");
        setCategorias([]);
    };

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleAdicionarQuestao = async () => {
        try {
            if (selectedOption) {
                if (categoriasSelecionadas[nivel]?.includes(selectedOption)) {
                    alert("Essa categoria já foi selecionada para este nível.");
                    return;
                }
                await updateCategoriasSelecionadas(nivel, [selectedOption], setCategoriasSelecionadas);
            }
        } catch (error) {
            console.error("Error adding question:", error);
        }
    };

    const handleEncerrar = () => {
        setUnsavedChanges(true); // Marca que há mudanças não salvas ao tentar encerrar
    };

    const handleSaveAndExit = async () => {
        try {
            await updateQuestionValues(testId, questionValues);
            setUnsavedChanges(false); // Marca as alterações como salvas
            navigate("/painel-adm/pacientes"); // Navega para outra rota após salvar e sair
        } catch (error) {
            console.error("Erro ao salvar e sair:", error);
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
                        setQuestionValues={setQuestionValues}
                        questionValues={questionValues}
                    />
                </Box>
                <FixedButtons
                    handleAdicionarQuestao={handleAdicionarQuestao}
                    handleEncerrar={handleEncerrar}
                />
            </Box>

            {/* Caixa de diálogo de confirmação, substituir pela correta e tomar cuidado para passar a função */}
            {unsavedChanges && (
                <Box
                    sx={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        padding: "2em",
                        backgroundColor: "#fff",
                        border: "1px solid #ccc",
                        zIndex: 9999,
                    }}
                >
                    <p>Você tem alterações não salvas. O que deseja fazer?</p>
                    <Button onClick={handleSaveAndExit} variant="contained" color="primary" sx={{ marginRight: "1em" }}>
                        Salvar e sair
                    </Button>
                    <Button onClick={() => setUnsavedChanges(false)} variant="contained" color="secondary">
                        Continuar na página
                    </Button>
                </Box>
            )}
        </Box>
    );
}
