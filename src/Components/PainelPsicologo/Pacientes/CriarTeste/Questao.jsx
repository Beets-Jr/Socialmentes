import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import Expandir from "../../../../Assets/Icons/Expandir.png";
import styles from "./Styles.module.css";
import {
  getDescricoesPorNivelECategoria,
  getPerguntasPorNivelECategoria,
} from "../../../../Services/Tests/testsInfoFunctions";

export default function Questao({
  nivel,
  categoriaSelecionada,
  indiceDaCategoria,
  selectedValues,
  onSelectedValuesChange,
}) {
  const [perguntas, setPerguntas] = useState([]);
  const [descricoes, setDescricoes] = useState([]);
  const [expandir, setExpandir] = useState(false);

  const handleClick = () => {
    setExpandir(!expandir);
  };

  const handleChange = async (indiceQuestao, e) => {
    const newValue = e.target.value;
    onSelectedValuesChange(indiceQuestao, newValue);
  };

  useEffect(() => {
    if (nivel > 0 && categoriaSelecionada) {
      const todasPerguntas = getPerguntasPorNivelECategoria(
        nivel,
        categoriaSelecionada
      );
      const todasDescricoes = getDescricoesPorNivelECategoria(
        nivel,
        categoriaSelecionada
      );
      setPerguntas(todasPerguntas);
      setDescricoes(todasDescricoes);
    }
  }, [nivel, categoriaSelecionada]);

  return (
    <>
      <div className={styles.titulo2} style={{ width: "50vw" }}>
        <div>
          <img
            src={Expandir}
            style={{ marginRight: "10px", cursor: "pointer" }}
            onClick={handleClick}
            alt="Expandir"
          />
          {categoriaSelecionada && `${categoriaSelecionada} - Nível ${nivel}`}
        </div>
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
                  selectedValues?.[`level_${nivel}`]?.[
                    `category_${indiceDaCategoria}`
                  ]?.[`question_${index}`] || ""
                }
                onChange={(e) => handleChange(index, e)}
              >
                <FormControlLabel
                  value={0}
                  control={<Radio sx={{ color: "var(--color-gray-3)" }} />}
                  label="Não Adquirido"
                  className={styles.radioOptions}
                />
                <FormControlLabel
                  value={1}
                  control={<Radio sx={{ color: "var(--color-gray-3)" }} />}
                  label="Sem oportunidade"
                  className={styles.radioOptions}
                />
                <FormControlLabel
                  value={2}
                  control={<Radio sx={{ color: "var(--color-gray-3)" }} />}
                  label="Parcialmente"
                  className={styles.radioOptions}
                />
                <FormControlLabel
                  value={3}
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
