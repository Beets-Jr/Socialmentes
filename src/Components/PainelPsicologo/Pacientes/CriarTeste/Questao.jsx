import React, { useEffect, useState } from "react";
import { Box, FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import TrashIcon from "../../../../Assets/Icons/trash-icon.png";
import useMediaQuery from '@mui/material/useMediaQuery';
import styles from "./Styles.module.css";
import { getDescricoesPorNivelECategoria, getPerguntasPorNivelECategoria } from "../../../../Services/Tests/testsInfoFunctions";

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
  const isMobile = useMediaQuery('(max-width:768px)');
  return (
    <>
      <Box className={styles.titulo2} sx={{ width: "70vw", marginBottom: "1rem" }}>
        <Box sx={{
          display: "flex", alignItems: "center", justifyContent: {
            xs: "space-between",
            sm: "flex-start"
          }
        }}>
          <KeyboardArrowDownOutlinedIcon
            onClick={handleClick}
            className={expandir ? styles.iconExpand : styles.iconCollapse}
            sx={{ cursor: "pointer", marginRight: "10px", fontSize: 50 }}
          />

          {categoriaSelecionada && `${categoriaSelecionada} - Nível ${nivel}`}
          <Box onClick={() => onRemotion(nivel, indiceCategoriaGeral)} sx={{ cursor: "pointer", marginLeft: "30vw"}}>
            <img src={TrashIcon} alt="Remover" />
          </Box>
        </Box>
      </Box>

      {expandir &&
        perguntas.map((pergunta, index) => (
          <Box key={index} sx={{ width: { xs: "75vw", sm: "70vw" }, marginBottom: "1rem" }}>
            <div className={styles.titulo3}>
              {`${index + 1}. ${pergunta}`}
            </div>
            <div className={styles.texto}>
              {descricoes[index] && `${descricoes[index]}`}
            </div>
            <FormControl>
              <RadioGroup
                row={!isMobile}
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
