import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { getPerguntasPorNivelECategoria, getDescricoesPorNivelECategoria } from "../../../../Database/Utils/functions";
import React, { useEffect, useState } from "react";

export default function Questao({ nivel, categoriaSelecionada }) {
    const [perguntas, setPerguntas] = useState([]);
    const [descricoes, setDescricoes] = useState([]);
    const [expandir, setExpandir] = useState(false);
    const [selectedValues, setSelectedValues] = useState({});

    const handleClick = () => {
        setExpandir(!expandir);
    }

    const handleChange = (index, e) => {
        const newSelectedValues = {
            ...selectedValues,
            [index]: e.target.value,
        };
        setSelectedValues(newSelectedValues);
    }

    useEffect(() => {
        console.log(selectedValues);
    }, [selectedValues]);

    useEffect(() => {
        if (nivel > 0 && categoriaSelecionada) {
            const todasPerguntas = getPerguntasPorNivelECategoria(nivel, categoriaSelecionada);
            const todasDescricoes = getDescricoesPorNivelECategoria(nivel, categoriaSelecionada);
            setPerguntas(todasPerguntas);
            setDescricoes(todasDescricoes);
        }
    }, [nivel, categoriaSelecionada]);

    return (
        <>
            <Typography>
                { categoriaSelecionada && `${categoriaSelecionada} - Nível ${nivel}`}
                <button onClick={handleClick}>Expandir</button>
            </Typography>
            { expandir && perguntas.map((pergunta, index) => (
                    <Box key={index} sx={{ width: "70vw", border: "2px solid blue", marginBottom: "1rem" }}>
                        <Typography>
                            {`${index + 1}. ${pergunta}`}
                        </Typography>

                        <Typography>
                            {descricoes[index] && `${descricoes[index]}`}
                        </Typography>

                        <FormControl >
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name={`row-radio-buttons-group-${index}`}
                                value={selectedValues[index] || ""}
                                onChange={(e) => handleChange(index, e)}
                            >
                                <FormControlLabel value={0} control={<Radio />} label="Não Adquirido" />
                                <FormControlLabel value={1} control={<Radio />} label="Sem oportunidade" />
                                <FormControlLabel value={2} control={<Radio />} label="Parcialmente" />
                                <FormControlLabel value={3} control={<Radio />} label="Adquirido" />
                            </RadioGroup>
                        </FormControl>
                    </Box>
            ))}
        </>
    );
}
