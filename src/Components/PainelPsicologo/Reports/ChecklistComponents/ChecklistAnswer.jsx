import { denver } from "../../../../Database/denver.mjs";
import ChecklistItem from "./ChecklistItem";
import { Typography, Box } from "@mui/material";

function ChecklistAnswer({ test, checkedQuestions, handleCheckChange }) {
  const getLevelDescription = (level) => {
    switch (level) {
      case 0:
        return "Não adquirido";
      case 1:
        return "Sem oportunidade";
      case 2:
        return "Parcialmente";
      case 3:
        return "Adquirido";
      default:
        return "Não adquirido";
    }
  };

  return (
    <Box>
      {denver.map((nivel) => (
        <Box key={`nivel-${nivel.nivel}`}>
          {nivel.categorias.map((categoria) => {
            const perguntasComResposta = categoria.perguntas.filter((p) => {
              const resposta = test.questions[`level_${nivel.nivel}`]?.[`category_${categoria.id}`]?.[`question_${p.id}`];
              return resposta !== undefined;
            });

            if (perguntasComResposta.length > 0) {
              let formattedTitle = `${categoria.nome} - Nível ${nivel.nivel}`;
              return (
                <Box key={`categoria-${categoria.id}`}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h5"
                      sx={{
                        fontFamily: 'var(--font-sub)',
                        color: 'var(--color-blue-4)',
                        marginY: '1.5vh'
                      }}>
                      {formattedTitle}
                    </Typography>
                    <Typography variant="h8"
                      sx={{
                        fontFamily: 'var(--font-sub)',
                        marginTop: '3.5vh',
                      }}>
                      Intervenção
                    </Typography>
                  </Box>

                  {perguntasComResposta.map((p) => {
                    const resposta = test.questions[`level_${nivel.nivel}`]?.[`category_${categoria.id}`]?.[`question_${p.id}`];
                    const levelDescription = getLevelDescription(resposta);
                    return (
                      <ChecklistItem
                        key={`pergunta-${p.id}`}
                        index={p.id + 1}
                        hability={p.pergunta}
                        description={p.descricao}
                        level={levelDescription}
                        handleCheckChange={handleCheckChange}
                        checkedQuestions={checkedQuestions}
                        questionTitle={formattedTitle}
                      />
                    );
                  })}
                </Box>
              );
            }

            return null; // Se não há questões respondidas
          })}
        </Box>
      ))}
    </Box>
  );
}

export default ChecklistAnswer;
