import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { getPerguntasPorNivelECategoria, getDescricoesPorNivelECategoria } from "../../../../Database/Utils/functions";
import React, { useEffect, useState } from "react";

export default function Questao({ categorias, nivel, categoriaSelecionada }) {
    const [perguntas, setPerguntas] = useState([]);
    const [descricoes, setDescricoes] = useState([]);

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
                {`${categoriaSelecionada} - Nível ${nivel}`}
            </Typography>
            {perguntas.map((pergunta, index) => (
                    <Box key={index} sx={{ width: "70vw", border: "2px solid blue", marginBottom: "1rem" }}>
                        <Typography>
                            {`${index + 1}. ${pergunta}`}
                        </Typography>

                        <Typography>
                            {descricoes[index] && `${descricoes[index]}`}
                        </Typography>

                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="Adquirido" control={<Radio />} label="Adquirido" />
                                <FormControlLabel value="Parcialmente" control={<Radio />} label="Parcialmente" />
                                <FormControlLabel value="Não Adquirido" control={<Radio />} label="Não Adquirido" />
                                <FormControlLabel value="Sem oportunidade" control={<Radio />} label="Sem oportunidade" />
                            </RadioGroup>
                        </FormControl>
                    </Box>
            ))}
        </>
    );
}
