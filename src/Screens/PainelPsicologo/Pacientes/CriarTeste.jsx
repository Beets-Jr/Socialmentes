import React, { useEffect, useState } from "react";
import { getCategoriaNomesPorNivel } from "../../../Database/Utils/testsInfoFunctions";
import { Box } from "@mui/material";
import NivelSelector from "../../../Components/PainelPsicologo/Pacientes/CriarTeste/NivelSelector";
import CompetenciaSelector from "../../../Components/PainelPsicologo/Pacientes/CriarTeste/CompetenciaSelector";
import QuestoesList from "../../../Components/PainelPsicologo/Pacientes/CriarTeste/QuestoesList";
import FixedButtons from "../../../Components/PainelPsicologo/Pacientes/CriarTeste/FixedButtons";
import { useLocation } from "react-router-dom";
import { getCategoriesByLevel } from "../../../Services/Tests/Category/GetCategorys.mjs";

export default function CriarTeste() {
    const [testId, setTestId] = useState('');
    const [nivel, setNivel] = useState(1);
    const [activeButtonIndex, setActiveButtonIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [categoriasSelecionadas, setCategoriasSelecionadas] = useState({});
    const [questionValues, setQuestionValues] = useState('');

    const location = useLocation();
    const { testDetails } = location.state || {};

    useEffect(() => {
        setTestId(testDetails.id);
    }, []);

    function getCategoriasByIndices(categorias, indices) {
        return indices.map(index => categorias[index]);
    }

    function updateCategoriasSelecionadas(nivel, categoriasJaSelecionadas) {
        if (categoriasJaSelecionadas && categoriasJaSelecionadas.length > 0) {
            setCategoriasSelecionadas(prevState => ({
                ...prevState,
                [nivel]: categoriasJaSelecionadas
            }));
        }
    }

    useEffect(() => {
        if (testDetails) {
            const indicesCategorias = getCategoriesByLevel(testDetails, nivel);
            const categoriasJaSelecionadas = getCategoriasByIndices(categorias, indicesCategorias);
            updateCategoriasSelecionadas(nivel, categoriasJaSelecionadas);
            console.log(testDetails);
        }
    }, [testDetails, categorias, nivel]);

    useEffect(() => {
        if (nivel > 0) {
            const fetchedCategorias = getCategoriaNomesPorNivel(nivel);
            setCategorias(fetchedCategorias);
        }
    }, [nivel]);

    useEffect(() => {
        console.log('Categorias já selecionadas: ', categoriasSelecionadas);
    }, [categoriasSelecionadas]);

    const handleButtonClick = (index) => {
        setActiveButtonIndex(index);
        setNivel(index + 1);
        setSelectedOption("");
    };

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleAdicionarQuestao = () => {
        if (selectedOption) {
            if (categoriasSelecionadas[nivel]?.includes(selectedOption)) {
                alert("Essa categoria já foi selecionada para este nível.");
                return;
            }

            updateCategoriasSelecionadas(nivel, [selectedOption]);
        }
    };

    const handleEncerrar = () => {
        console.log("click");
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
