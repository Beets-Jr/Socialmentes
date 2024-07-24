import React, { useEffect, useState } from "react";
import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import Expandir from "../../../../Assets/Icons/Expandir.png";
import styles from "./Styles.module.css";
import { getDescricoesPorNivelECategoria, getPerguntasPorNivelECategoria } from "../../../../Services/Tests/testsInfoFunctions";
import TrashIcon from "../../../../Assets/Icons/trash-icon.png";

export default function Questao({
  nivel,
  categoriaSelecionada,
  indiceDaCategoria,
  indiceCategoriaGeral,
  selectedValues,
  onSelectedValuesChange,
  onRemotion
}) {
  const [perguntas, setPerguntas] = useState([]);
  const [descricoes, setDescricoes] = useState([]);
  const [expandir, setExpandir] = useState(false);

  const handleClick = () => setExpandir(prev => !prev);

  const handleChange = async (indiceQuestao, e) => {
    const newValue = e.target.value;
    onSelectedValuesChange(indiceQuestao, newValue);
  };

  useEffect(() => {
    if (nivel > 0 && categoriaSelecionada) {
      const fetchData = async () => {
        const todasPerguntas = await getPerguntasPorNivelECategoria(nivel, categoriaSelecionada);
        const todasDescricoes = await getDescricoesPorNivelECategoria(nivel, categoriaSelecionada);
        setPerguntas(todasPerguntas);
        setDescricoes(todasDescricoes);
      };
      fetchData();
    }
  }, [nivel, categoriaSelecionada]);

  return (
    <>
      <div className={styles.titulo2} style={{ width: "75vw" }}>
        <Box sx={{ display: "flex" }} >
          <img
            src={Expandir}
            style={{ marginRight: "15px", cursor: "pointer", height: "20px", marginTop: "0.5%" }}
            onClick={handleClick}
            alt="Expandir"
          />
          {categoriaSelecionada && `${categoriaSelecionada} - Nível ${nivel}`}
          <Box onClick={() => onRemotion(nivel, indiceCategoriaGeral)} sx={{ cursor: "pointer", marginLeft: "3vw" }}>
            <img src={TrashIcon} alt="Remover" />
          </Box>
        </Box>
      </div>

      {expandir &&
        perguntas.map((pergunta, index) => (
          <Box key={index} sx={{ width: "70vw", marginBottom: "1rem" }}>
            <div className={styles.titulo3}>{`${index + 1}. ${pergunta}`}</div>
            <div className={styles.texto}>
              {descricoes[index] && `${descricoes[index]}`}
            </div>
            <FormControl>
              <RadioGroup
                row
                value={
                  selectedValues?.[`level_${nivel}`]?.[`category_${indiceCategoriaGeral}`]?.[`question_${index}`]?.toString() || ""
                }
                onChange={(e) => handleChange(index, e)}
              >
                <FormControlLabel
                  value="0"
                  control={<Radio sx={{ color: "var(--color-gray-3)" }} />}
                  label="Não Adquirido"
                  className={styles.radioOptions}
                />
                <FormControlLabel
                  value="1"
                  control={<Radio sx={{ color: "var(--color-gray-3)" }} />}
                  label="Sem oportunidade"
                  className={styles.radioOptions}
                />
                <FormControlLabel
                  value="2"
                  control={<Radio sx={{ color: "var(--color-gray-3)" }} />}
                  label="Parcialmente"
                  className={styles.radioOptions}
                />
                <FormControlLabel
                  value="3"
                  control={<Radio sx={{ color: "var(--color-gray-3)" }} />}
                  label="Adquirido"
                  className={styles.radioOptions}
                />
              </RadioGroup>
            </FormControl>
          </Box>
        ))}
    </>
  );
}
