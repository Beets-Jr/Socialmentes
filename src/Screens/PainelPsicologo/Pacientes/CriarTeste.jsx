import React, { useEffect, useState } from "react";
import { getCategoriaNomesPorNivel } from "../../../Database/Utils/testsInfoFunctions";
import { Box } from "@mui/material";
import NivelSelector from "../../../Components/PainelPsicologo/Pacientes/CriarTeste/NivelSelector";
import CompetenciaSelector from "../../../Components/PainelPsicologo/Pacientes/CriarTeste/CompetenciaSelector";
import QuestoesList from "../../../Components/PainelPsicologo/Pacientes/CriarTeste/QuestoesList";
import FixedButtons from "../../../Components/PainelPsicologo/Pacientes/CriarTeste/FixedButtons";
import { getTestById } from "../../../Database/Utils/testsFunctions";

export default function CriarTeste() {
    const [nivel, setNivel] = useState(1);
    const [activeButtonIndex, setActiveButtonIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [categoriasSelecionadas, setCategoriasSelecionadas] = useState({});
    const [testInfo, setTestInfo] = useState({});
    const [questionValues, setQuestionValues] = useState('');

    /** Montar os componentes com as informações do banco de dados */
    useEffect(() => {
        console.log('Current Test Info:', testInfo);

        /** Passo 1: passar pelos leveis */

        /** Passo 2: passar pelas categorys */
        /**         -  atualizar o vetor categoriasSelecionadas */

        /** Passo 3: passar sobre as questions */
        /**         -  atualizar o vetor questionValues */

        console.log(`Categorias do nível:`, categorias);
        console.log(`Categorias já selecionadas:`, categoriasSelecionadas);
        
    }, [testInfo, categorias, categoriasSelecionadas]);

    /** Buscar as informações do teste a partir do banco de dados */
    async function fetchTestInfo(testId) {
        try {
            const testInfo = await getTestById(testId);
            if (testInfo) {
                setTestInfo(testInfo);
            } else {
                console.log('Test information could not be retrieved.');
            }
        } catch (error) {
            console.error('Error fetching test info:', error);
        }
    }

    useEffect(() => {
        const testId = 'E3ssWQUAx0iRiHr7T4ei';
        
        async function loadTestInfo() {
            await fetchTestInfo(testId);
        }

        loadTestInfo();
    }, []);

    /** Atualizar as categorias com base no nível selecionado, lidar com mudança de nível e categoria selecionada */
    useEffect(() => {
        if (nivel > 0) {
            const categorias = getCategoriaNomesPorNivel(nivel);
            setCategorias(categorias);
        }
    }, [nivel]);

    /** Ativa o nível */
    const handleButtonClick = (index) => {
        setActiveButtonIndex(index);
        setNivel(index + 1);
        setSelectedOption("");
    };

    /** Ativa a categoria atual */
    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    /** Adiciona uma questao com base na categoria selecionada e atualiza o vetor de categoriasSelecionadas */
    const handleAdicionarQuestao = () => {
        if (selectedOption) {
            if (categoriasSelecionadas[nivel]?.includes(selectedOption)) {
                alert("Essa categoria já foi selecionada para este nível.");
                return;
            }

            const updatedCategoriasSelecionadas = {
                ...categoriasSelecionadas,
                [nivel]: [...(categoriasSelecionadas[nivel] || []), selectedOption],
            };
            setCategoriasSelecionadas(updatedCategoriasSelecionadas);
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
