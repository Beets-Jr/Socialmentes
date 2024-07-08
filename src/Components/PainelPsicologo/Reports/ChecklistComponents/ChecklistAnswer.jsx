import { denver } from "../../../../Database/denver.mjs";
import ChecklistItem from "./ChecklistItem";
import { Typography, Box } from "@mui/material";

function ChecklistAnswer({ test }) {

  console.log("Objeto test:", test); // Log do objeto test para verificar sua estrutura

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
              //console.log(`Nivel: ${nivel.nivel}, Categoria: ${categoria.id}, Pergunta ID: ${p.id}, Resposta: ${getLevelDescription(resposta)}`);
              return resposta !== undefined;
            });

            console.log(`Categoria: ${categoria.nome}, Perguntas com resposta: ${perguntasComResposta.length}`);

            // Only render the category if there are answered questions
            if (perguntasComResposta.length > 0) {
              return (
                <Box key={`categoria-${categoria.id}`}>
                  <Typography variant="h5" sx={{ fontFamily: 'var(--font-sub)', color: 'var(--color-blue-4)' }}>
                    {`${categoria.nome} - Nível ${nivel.nivel}`}
                  </Typography>
                  <Box>
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
                        />
                      );
                    })}
                  </Box>
                </Box>
              );
            }

            return null; // Return null if there are no answered questions
          })}
        </Box>
      ))}
    </Box>
  );
}

export default ChecklistAnswer;
