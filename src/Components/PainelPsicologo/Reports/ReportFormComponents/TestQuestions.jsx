import { denver } from "../../../../Database/denver.mjs";
import TestAnswer from "./TestAnswer";
import TextfieldQuestion from "./TextfieldQuestion";
import { Typography, Box, Divider } from "@mui/material";

function TestQuestions({ test, control }) {

      return (
        <Box>
          {denver.map((nivel) => (
            <Box key={`nivel-${nivel.nivel}`}>
              {nivel.categorias.map((categoria) => {
                const perguntasComResposta = categoria.perguntas.filter((p) => {
                  const resposta = test.questions[`level_${nivel.nivel}`]?.[`category_${categoria.id}`]?.[`question_${p.id}`];
                  return (resposta !== undefined && resposta !== 1);
                });
    
                if (perguntasComResposta.length > 0) {
                  return (
                    <Box key={`categoria-${categoria.id}`}>
                        <Box sx={{mb:'1vh'}}>
                            <Typography variant="h5" sx={{ fontFamily: 'var(--font-sub)', color: 'var(--color-blue-4)', fontWeight:'500' }}>
                                {`${categoria.nome} - Nível ${nivel.nivel}`}
                            </Typography>
                            <Divider sx={{background:'var(--color-blue-4)', my: '1'}}/>
                        </Box>


                        <TextfieldQuestion 
                            label= {`Escreva o nome de 2 habilidades adquiridas ou parcialmente adquiridas de ${categoria.nome}:`}
                            name={`${categoria.nome}Ability1`}
                            control={control}
                        />
                        <TextfieldQuestion 
                            name={`${categoria.nome}Ability2`}
                            control={control}
                        />

                        <TextfieldQuestion 
                            label= {`Escreva o nome de 2 habilidades não adquiridas de ${categoria.nome}:`}
                            name={`${categoria.nome}NonAcquiredAbility1`}
                            control={control}
                        />
                        <TextfieldQuestion 
                            name={`${categoria.nome}NonAcquiredAbility2`}
                            control={control}
                        />   

                        {perguntasComResposta.map((p) => {
                            return (
                            <TestAnswer
                                key={`pergunta-${p.id}`}
                                index={p.id + 1}
                                hability={p.pergunta}
                                description={p.descricao}
                                level={test.questions[`level_${nivel.nivel}`]?.[`category_${categoria.id}`]?.[`question_${p.id}`]}
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

export default TestQuestions;