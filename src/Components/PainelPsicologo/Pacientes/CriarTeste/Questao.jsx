import React, { useEffect, useState, useContext, useRef } from "react";
import { Box, FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import TrashIcon from "../../../../Assets/Icons/trash-icon.png";
import useMediaQuery from "@mui/material/useMediaQuery";
import styles from "./Styles.module.css";
import { getDescricoesPorNivelECategoria, getPerguntasPorNivelECategoria } from "../../../../Services/Tests/testsInfoFunctions";
import { AppContext } from "../../../../Contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

export default function Questao({
  nivel,
  categoriaSelecionada,
  indiceDaCategoria,
  indiceCategoriaGeral,
  selectedValues,
  onSelectedValuesChange,
  onRemotion,
}) {
  const { open: isSidebarExpanded } = useContext(AppContext);
  const expandedSidebarWidth = "20vw";
  const collapsedSidebarWidth = "5vw";
  const sidebarWidth = isSidebarExpanded ? expandedSidebarWidth : collapsedSidebarWidth;

  const [perguntas, setPerguntas] = useState([]);
  const [descricoes, setDescricoes] = useState([]);
  const [expandir, setExpandir] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => setExpandir((prev) => !prev);

  const handleChange = async (indiceQuestao, e) => {
    if (!hasChanges) {
      setHasChanges(true);
    }

    const newValue = e.target.value;
    onSelectedValuesChange(indiceQuestao, newValue);
  };

  useEffect(() => {
    // Armazena o estado original
    const originalState = window.history.state;
  
    // Substitui o estado atual no histórico
    window.history.pushState(originalState, null, window.location.pathname);
  
    const handlePopstate = (event) => {
        const shouldNavigate = window.confirm(
            "É possível que as alterações feitas não sejam salvas. Deseja realmente sair da página?"
        );
  
        if (!shouldNavigate) {
            // Restaura o estado no histórico para que o usuário permaneça na página
            window.history.replaceState(originalState, null, window.location.pathname);
        } else {
            // Remove o listener antes de navegar
            window.removeEventListener("popstate", handlePopstate);

            // Volta para o estado anterior, removendo o estado adicionado com replaceState
            window.history.back();
            
            // Após o estado anterior ser restaurado, navega para a rota desejada
            setTimeout(() => {
                navigate('/painel-psi/pacientes/informacoes', { replace: true });
            }, 0);
        }
    };
  
    // Adiciona o listener para popstate
    window.addEventListener("popstate", handlePopstate);
  
    // Remove o listener quando o componente desmontar
    return () => {
        window.removeEventListener("popstate", handlePopstate);
    };
}, [navigate]);
  
  useEffect(() => {
    if (nivel > 0 && categoriaSelecionada) {
      const fetchData = async () => {
        const perguntas = getPerguntasPorNivelECategoria(nivel, categoriaSelecionada);
        const descricoes = getDescricoesPorNivelECategoria(nivel, categoriaSelecionada);
        setPerguntas(perguntas);
        setDescricoes(descricoes);
      };
      fetchData();
    }
  }, [nivel, categoriaSelecionada]);

  const isMobile = useMediaQuery("(max-width:768px)");
  return (
    <>
      <Box
        className={styles.titulo2}
        sx={{ width: "70vw", marginBottom: "1rem", position: "relative" }}
      >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <KeyboardArrowDownOutlinedIcon
            onClick={handleClick}
            className={expandir ? styles.iconExpand : styles.iconCollapse}
            sx={{ cursor: "pointer", marginRight: { xl: "10px" }, fontSize: 50, marginLeft: "-10px" }}
          />

          <Box
            sx={{
              flexGrow: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {categoriaSelecionada && `${categoriaSelecionada} - Nível ${nivel}`}
          </Box>

          <Box
            onClick={() => onRemotion(nivel, indiceCategoriaGeral)}
            sx={{
              position: "absolute",
              right: {
                xs: "-25px",
                sm: "10px",
                md: "15px",
                lg: "20px",
                xl: `calc(${sidebarWidth} - 20vw)`,
              },
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              transition: "right 0.5s ease",
            }}
          >
            <img src={TrashIcon} alt="Remover" />
          </Box>
        </Box>
      </Box>

      {expandir &&
        perguntas.map((pergunta, index) => (
          <Box key={index} sx={{ width: { xs: "75vw", sm: "70vw" }, marginBottom: "1rem" }}>
            <div className={styles.titulo3}>{`${index + 1}. ${pergunta}`}</div>
            <div className={styles.texto}>{descricoes[index] && `${descricoes[index]}`}</div>
            <FormControl>
              <RadioGroup
                row={!isMobile}
                value={selectedValues?.[`level_${nivel}`]?.[`category_${indiceCategoriaGeral}`]?.[`question_${index}`]?.toString() || ""}
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
