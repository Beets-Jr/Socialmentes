import { Box, Typography } from '@mui/material';
import RadioGroupQuestion from './ReportFormComponents/RadioGroupQuestion';
import TextfieldQuestion from './ReportFormComponents/TextfieldQuestion';
import { useForm, Controller } from 'react-hook-form';
import CheckboxQuestion from './ReportFormComponents/CheckboxQuestion';

function ReportForm() {
    const { handleSubmit, control } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return(
        <Box onSubmit={handleSubmit(onSubmit)} sx={{display:'flex', flexDirection:'column'}}>
            <Typography sx={{ fontFamily: 'var(--font-sub)', color: 'var(--color-blue-3)', fontWeight:'bold'}}>
                HISTÓRICO
            </Typography>
            {/* Gestação */}
            <RadioGroupQuestion
                labelId="pregnancy"
                label="Gestação:"
                name="pregnancy"
                options={[
                { value: 0, label: 'Desejada e planejada' },
                { value: 1, label: 'Não planejada, mas desejada' },
                { value: 2, label: 'Indesejada' },
                ]}
                control={control}
            />

            <RadioGroupQuestion
                labelId="dataProvidedBy"
                label="Dados fornecidos por:"
                name="dataProvidedBy"
                options={[
                { value: 'pais', label: 'Pais' },
                { value: 'mae', label: 'Mãe' },
                { value: 'pai', label: 'Pai' },
                ]}
                control={control}
            />

            <RadioGroupQuestion
                labelId="withIntercurrences"
                label="Gestação mostrou-se:"
                name="pregnancyWithIntercurrences"
                options={[
                { value: 0, label: 'Sem intercorrência' },
                { value: 1, label: 'Com intercorrência' },
                ]}
                control={control}
            />

            <TextfieldQuestion 
                label="Descrição de possíveis intercorrências:"
                name="pregnancyDescription"
                control={control}
            />

            <TextfieldQuestion 
                label="Tempo de gestação (semanas):"
                name="timeWeeks"
                type="number"
                control={control}
                required
            />
            {/* Amamentação */}
            <RadioGroupQuestion
                labelId="breastfeeding"
                label="Amamentação:"
                name="breastfeedingWithDifficulty"
                options={[
                { value: 0, label: 'Sem dificuldade' },
                { value: 1, label: 'Com dificuldade' },
                ]}
                control={control}
            />

            <TextfieldQuestion 
                label="Amamentado até (meses):"
                name="timeMonths"
                type="number"
                control={control}
                required
            />

            <TextfieldQuestion 
                label="Observações sobre o período:"
                name="breastfeedingObservations"
                control={control}
            />

            {/* Introdução alimentar */}
            <RadioGroupQuestion
                labelId="withIntercurrences"
                label="Introdução alimentar mostrou-se:"
                name="foodIntroductionWithIntercurrences"
                options={[
                { value: 0, label: 'Sem intercorrência' },
                { value: 1, label: 'Com intercorrência' },
                ]}
                control={control}
            />

            <RadioGroupQuestion
                labelId="acceptsFood"
                label="Aceita alimentos:"
                name="foodIntroductionAcceptsFood"
                options={[
                { value: 0, label: 'Aceita variação' },
                { value: 1, label: 'Oscila' },
                { value: 2, label: 'Não aceita' },
                ]}
                control={control}
            />

            <TextfieldQuestion 
                label="Observações sobre o período de alimentação:"
                name="foodIntroductionObservations"
                control={control}
            />

            {/* Sentar, engatinhar e andar */}
            <RadioGroupQuestion
                labelId="period"
                label="Sentar, engatinhar e andar ocorreram:"
                name="sittingCrawlingWalkingPeriod"
                options={[
                { value: 0, label: 'Na idade esperada' },
                { value: 1, label: 'Leve atraso' },
                { value: 2, label: 'Atraso significativo' },
                ]}
                control={control}
            />

            <TextfieldQuestion 
                label="Observações sobre o desenvolvimento de habilidades motoras:"
                name="sittingCrawlingWalkingObservations"
                control={control}
            />

            {/* Desfralde */}
            <RadioGroupQuestion
                labelId="occured"
                label="Desfralde diurno:"
                name="toiletTrainingDaytimeOccured"
                options={[
                { value: 0, label: 'Ocorreu' },
                { value: 1, label: 'Não ocorreu' },
                ]}
                control={control}
            />

            <TextfieldQuestion 
                label="Se ocorreu, com quantos anos foi o desfralde diurno:"
                name="toiletTrainingDaytimeAge"
                type="number"
                control={control}
            />

            <RadioGroupQuestion
                labelId="occured"
                label="Desfralde noturno:"
                name="toiletTrainingNighttimeOccured"
                options={[
                { value: 0, label: 'Ocorreu' },
                { value: 1, label: 'Não ocorreu' },
                ]}
                control={control}
            />

            <TextfieldQuestion 
                label="Se ocorreu, com quantos anos foi o desfralde noturno:"
                name="toiletTrainingNighttimeAge"
                type="number"
                control={control}
            />

            {/* Autonomia */}
            <TextfieldQuestion 
                label="Observações sobre habilidades de autonomia:"
                name="autmonomyObservations"
                control={control}
            />

            <CheckboxQuestion
                control={control}
                name="acquiredSkills"
                label="Habilidades adquiridas:"
                options={[
                    { value: 1, label: 'Alimentar-se' },
                    { value: 2, label: 'Vestir-se' },
                    { value: 3, label: 'Andar pela casa' },
                    { value: 4, label: 'Brincar sozinho' },
                    { value: 5, label: 'Toma banho' },
                    { value: 6, label: 'Escovar os dentes' },
                    { value: 7, label: 'Penteia cabelo' },
                    { value: 8, label: 'Ajuda/carrega própria mochila ou bolsa' },
                    { value: 9, label: 'Coopera/guarda brinquedos após usá-los' },
                    { value: 10, label: 'Coopera com rotina de casa (coloca mesa, arruma cama)' },
                ]}
            />
            {/* Olhar se as habilidades adquiridas e as com dificuldade podem ter as mesmas marcações */}
            <CheckboxQuestion
                control={control}
                name="skillsWithDifficulty"
                label="Habilidades com dificuldade:"
                options={[
                    { value: 1, label: 'Alimentar-se' },
                    { value: 2, label: 'Vestir-se' },
                    { value: 3, label: 'Andar pela casa' },
                    { value: 4, label: 'Brincar sozinho' },
                    { value: 5, label: 'Toma banho' },
                    { value: 6, label: 'Escovar os dentes' },
                    { value: 7, label: 'Penteia cabelo' },
                    { value: 8, label: 'Ajuda/carrega própria mochila ou bolsa' },
                    { value: 9, label: 'Coopera/guarda brinquedos após usá-los' },
                    { value: 10, label: 'Coopera com rotina de casa (coloca mesa, arruma cama)' },
                ]}
            />

            {/* Relação com brinquedos */}
            <RadioGroupQuestion
                labelId="toyRelationship"
                label="Em relação às brincadeiras:"
                name="toyRelationship"
                options={[
                { value: 0, label: 'Uso funcional' },
                { value: 1, label: 'Nem sempre' },
                { value: 2, label: 'Não faz' },
                ]}
                control={control}
            />
            <RadioGroupQuestion
                labelId="skillsSuitableSymbolicPlay"
                label="Habilidade para jogo simbólico:"
                name="skillsSuitableSymbolicPlay"
                options={[
                { value: 0, label: 'Adequada para idade' },
                { value: 1, label: 'Indadequada para idade' },
                ]}
                control={control}
            />
            <RadioGroupQuestion
                labelId="socialSkills"
                label="Habilidades sociais:"
                name="socialSkills"
                options={[
                { value: 0, label: 'Na idade esperada' },
                { value: 1, label: 'Leve atraso' },
                { value: 2, label: 'Atraso significativo' },
                ]}
                control={control}
            />

            {/* Habilidades de brincar */}
            <Typography sx={{ fontFamily: 'var(--font-sub)', color: 'var(--color-blue-3)', fontWeight:'bold'}}>
                POSSÍVEIS COMENTÁRIOS REFERENTE A HABILIDADE DE BRINCAR DA CRIANÇA:
            </Typography>
            <TextfieldQuestion 
                label="A aquisição das habilidades sociais encontra adequada/inadequada/oscilante para a sua idade:"
                name="acquisitionSocialSkills"
                control={control}
            />
            <TextfieldQuestion 
                label="A criança demonstra habilidade para manipular brinquedos simples como empilhar blocos, encaixar peças ou inserir formas em espaço relacionado:"
                name="toyManipulation"
                control={control}
            />
            <TextfieldQuestion 
                label="A criança demonstra habilidade para seguir instruções de uma, duas ou mais etapas na brincadeira:"
                name="followInstructions"
                control={control}
            />
            <TextfieldQuestion 
                label="A criança demonstra habilidade para reproduzir ações de uma duas e três etapas na brincadeira com bonecos, como dar comida, tomar banho ou escovar os dentes, manipulando objetos em miniatura:"
                name="playActions"
                control={control}
            />
            <TextfieldQuestion 
                label="A criança utiliza outros objetos com função simbólica em uma brincadeira como por exemplo um barbante que pode virar macarrão ou controle remoto que serve como telefone:"
                name="symbolicObjects"
                control={control}
            />
            <TextfieldQuestion 
                label="A criança projeta os bonecos como seres animados e finge que eles interagem entre si, com falas e sequência de histórias:"
                name="dollsAnimated"
                control={control}
            />
            <TextfieldQuestion 
                label="A criança realiza jogos imaginários durante a brincadeira, faz mímicas e “finge” realizar uma ação sem usar objetos ou brinquedos:"
                name="imaginaryGames"
                control={control}
            />
            <TextfieldQuestion 
                label="A criança cria um roteiro de história em brincadeira como festa de aniversário, compras no mercado ou hora de dormir da boneca:"
                name="storyScript"
                control={control}
            />
            <TextfieldQuestion 
                label="A criança demonstra habilidade para realizar trocas e reciprocidade, sugere e aceita novas ideias durante brincadeiras de interação social:"
                name="reciprocitySkills"
                control={control}
            />
            <TextfieldQuestion 
                label="Criança demonstra preferência por brincar sozinho, com suas próprias regras/brincar em grupo, flexibilizando atividades:"
                name="playAlone"
                control={control}
            />
            <TextfieldQuestion 
                label="Criança aceitou interação social com avaliadora e beneficiou-se de dicas e instruções simples:"
                name="socialInteractionWithEvaluator"
                control={control}
            />
            <TextfieldQuestion 
                label="A criança realiza/aceita brincadeira de esconde-esconde, cócegas, rodar e balançar:"
                name="acceptPlay"
                control={control}
            />
            <TextfieldQuestion 
                label="Comentários sobre habilidade de brincar da criança:"
                name="commentsPlay"
                control={control}
            />

            {/* Habilidades sociais e emocionais */}
            <Typography sx={{ fontFamily: 'var(--font-sub)', color: 'var(--color-blue-3)', fontWeight:'bold'}}>
                OBSERVAÇÕES REFERENTE AS HABILIDADES SOCIAIS E EMOCIONAIS:
            </Typography>
            <TextfieldQuestion 
                label="A criança busca contato espontâneo com o/a mãe/pai, o/a terapeuta ou outras crianças:"
                name="spontaneousContact"
                control={control}
            />
            <TextfieldQuestion 
                label="A criança demonstra afeto sorrindo, chorando, abraçando, beijando, solicitando colo, “fazendo bico”, cruzando os braços, verbalizando “eca”:"
                name="showsAffection"
                control={control}
            />
            <TextfieldQuestion 
                label="Criança sorri para parceiro social, atende quando chamado o seu nome, direciona e sustenta contato visual, responde a sons vocais:"
                name="smileAndAnswerByName"
                control={control}
            />
            <TextfieldQuestion 
                label="A criança observa o comportamento de outras crianças utilizando brinquedos ou realizando ações:"
                name="observersBehavior"
                control={control}
            />
            <TextfieldQuestion 
                label="A criança realiza imitação de gestos realizados por adultos e segue instruções de 1, 2 ou 3 passos:"
                name="imitationOfGestures"
                control={control}
            />
            <TextfieldQuestion 
                label="Criança olha para objeto, locais ou pessoas de seu interesse de forma independente. A criança olha para objetos, locais ou pessoas de seu interesse quando direcionado através do apontar:"
                name="lookForInterest"
                control={control}
            />
            <TextfieldQuestion 
                label="Criança inicia e mantém contato interpessoal com adulto e pares:"
                name="interpersonalContact"
                control={control}
            />
            <TextfieldQuestion 
                label="A criança identifica e verbaliza sentimentos como triste, feliz, bravo, raiva e nojo, incluindo expressões faciais relacionadas ao evento descrito:"
                name="identifiesAndVerbalizesFeelings"
                control={control}
            />
            <TextfieldQuestion 
                label="A criança demonstra habilidade para realizar trocas e reciprocidade, sugere e aceita novas ideias durante brincadeiras de interação social:"
                name="understandEmotions"
                control={control}
            />
            <TextfieldQuestion 
                label="A criança compreende emoções de outras pessoas relacionadas a situações vivenciadas como por exemplo, se uma criança cai e se machuca, ela sente dor e chora, precisa de ajuda:"
                name="understandRelationships"
                control={control}
            />
            <TextfieldQuestion 
                label="Comentários sobre habilidades sociais e emocinais:"
                name="commentsSocialEmotionalSkills"
                control={control}
            />


            {/* Habilidades de fala e linguagem */}
            <RadioGroupQuestion
                labelId="speechAndLanguage"
                label="Habilidade de fala e linguagem:"
                name="speechAndLanguage"
                options={[
                { value: 0, label: 'Adequada' },
                { value: 1, label: 'Oscila' },
                { value: 2, label: 'Inadequada'}
                ]}
                control={control}
            />
            <CheckboxQuestion
                control={control}
                name="acquiredSkills"
                label="Habilidades adquiridas:"
                options={[
                    { value: 1, label: 'Contato visual diante do parceiro social' },
                    { value: 2, label: 'Balbucio com frequência' },
                    { value: 3, label: 'Forma variedade de sílabas' },
                    { value: 4, label: 'Palavras e frases' },
                    { value: 5, label: 'Realiza pedidos a partir de palavras' },
                    { value: 6, label: 'Coordenando olhar e gestos com parceiro de comunicação' },
                    { value: 7, label: 'Aponta para itens' }
                ]}
            />
            <CheckboxQuestion
                control={control}
                name="skillsWithDifficulty"
                label="Habilidades com dificuldade:"
                options={[
                    { value: 1, label: 'Contato visual diante do parceiro social' },
                    { value: 2, label: 'Balbucio com frequência' },
                    { value: 3, label: 'Forma variedade de sílabas' },
                    { value: 4, label: 'Palavras e frases' },
                    { value: 5, label: 'Realiza pedidos a partir de palavras' },
                    { value: 6, label: 'Coordenando olhar e gestos com parceiro de comunicação' },
                    { value: 7, label: 'Aponta para itens' }
                ]}
            />
            <Typography sx={{ fontFamily: 'var(--font-sub)', color: 'var(--color-blue-3)', fontWeight:'bold'}}>
                OBSERVAÇÕES REFERENTE AS HABILIDADES FALA E LINGUAGEM:
            </Typography>
            <TextfieldQuestion 
                label="Criança verbaliza/não verbaliza pedidos simples coordenando olhar e gestos. A criança pede brinquedos ou brincadeiras, água ou alimentos, usar banheiro:"
                name="simpleRequests"
                control={control}
            />
            <TextfieldQuestion 
                label="A criança descreve ações realizadas (“estou jogando bola”), imagens de livros ou situações (como por exemplo, “o cachorro está comendo”):"
                name="describesActions"
                control={control}
            />
            <TextfieldQuestion 
                label="Criança relata/não relata histórias vivenciadas e responde perguntas simples:"
                name="tellsStories"
                control={control}
            />
            <TextfieldQuestion 
                label="A criança faz comentários sobre a brincadeira, situações ou comportamento de outras pessoas:"
                name="commentsGameSituationsBehavior"
                control={control}
            />
            <TextfieldQuestion 
                label="A criança faz perguntas sobre temas trazidos por um parceiro social, demonstra iniciativa na continuidade da conversa:"
                name="questionTopics"
                control={control}
            />
            <TextfieldQuestion 
                label="Criança relata/não relata vivências e pergunta sobre assuntos trazidos pela terapeuta ou outras crianças:"
                name="reportsExperiences"
                control={control}
            />
            <TextfieldQuestion 
                label="Comentário sobre habilidades de fala e linguagem:"
                name="commentsSpeechAndLanguage"
                control={control}
            />

            {/* Domínios */}
            <CheckboxQuestion
                control={control}
                name="levelOneDomains"
                label="Domínios dentro do nível 1:"
                options={[
                    { value: 1, label: 'Comunicação Receptiva' },
                    { value: 2, label: 'Comunicação Expressiva' },
                    { value: 3, label: 'Competências sociais' },
                    { value: 4, label: 'Imitação' },
                    { value: 5, label: 'Cognição' },
                    { value: 6, label: 'Cognição' },
                    { value: 7, label: 'Motricidade Fina' },
                    { value: 8, label: 'Motricidade Grossa' },
                    { value: 9, label: 'Comportamento' },
                    { value: 10, label: 'Independência pessoal' },
                ]}
            />
            <CheckboxQuestion
                control={control}
                name="levelTwoDomains"
                label="Domínios dentro do nível 2:"
                options={[
                    { value: 1, label: 'Comunicação Receptiva' },
                    { value: 2, label: 'Comunicação Expressiva' },
                    { value: 3, label: 'Atenção Conjunta'},
                    { value: 4, label: 'Competências Socias: Adultos ou pares' },
                    { value: 5, label: 'Competências Sociais com Pares' },
                    { value: 6, label: 'Imitação' },
                    { value: 7, label: 'Motricidade Fina' },
                    { value: 8, label: 'Motricidade Grossa' },
                    { value: 9, label: 'Jogo' },
                    { value: 10, label: 'Jogo Independente' },
                    { value: 11, label: 'Cognição' },
                    { value: 12, label:'Independência Pessoal' }
                ]}
            />
            <CheckboxQuestion
                control={control}
                name="levelThreeDomains"
                label="Domínios dentro do nível 3:"
                options={[
                    { value: 1, label: 'Comunicação Receptiva' },
                    { value: 2, label: 'Comunicação Expressiva' },
                    { value: 3, label: 'Competências sociais' },
                    { value: 4, label: 'Motricidade Fina' },
                    { value: 5, label: 'Motricidade Grossa' },
                    { value: 6, label: 'Jogo' },
                    { value: 7, label: 'Cognição' },
                    { value: 8, label: 'Independência pessoal' }
                ]}
            />
            <CheckboxQuestion
                control={control}
                name="levelFourDomains"
                label="Domínios dentro do nível 4:"
                options={[
                    { value: 1, label: 'Comunicação Receptiva' },
                    { value: 2, label: 'Comunicação Expressiva' },
                    { value: 3, label: 'Competências sociais' },
                    { value: 4, label: 'Motricidade Fina' },
                    { value: 5, label: 'Motricidade Grossa' },
                    { value: 6, label: 'Jogo' },
                    { value: 7, label: 'Cognição' },
                    { value: 8, label: 'Independência pessoal' }
                ]}
            />
{/*SALTEI AS QUESTOES QUE VEM DIRETO DO TESTE EM QUESTAO*/}
            {/* Perguntas específicas do questionário em questão */}
            
            {/* Habilidades sociais e afetivas dificuldade */}
            <Typography sx={{ fontFamily: 'var(--font-sub)', color: 'var(--color-blue-3)', fontWeight:'bold'}}>
                Habilidades sociais e afetivas que demonstra dificuldade
            </Typography>
            <TextfieldQuestion 
                label="Atenção compartilhada:"
                name="sharedAttention"
                control={control}
            />
            <TextfieldQuestion 
                label="Realizar imitação motora:"
                name="imitation"
                control={control}
            />
            <TextfieldQuestion 
                label="Horas por semana recebido:"
                name="weeklyHours"
                control={control}
            />
            <RadioGroupQuestion
                labelId="professional"
                label="Qual profissional vai assinar esse relatório?"
                name="professional"
                options={[
                
                { value: 1, label: 'Amanda Nucci Carrara' },
                { value: 2, label: 'Ana Luisa Polizel Libardi' },
                { value: 3, label: 'Giovanna Moreira' },
                { value: 4, label: 'Renata Coradi Leme' },
                { value: 5, label: 'Rafaela Lopes' },
                { value: 6, label: 'Aline Ribeiro Lopes' },
                { value: 7, label: 'Anna Paula Badelino' },
                { value: 0, label: 'Outra profissional' },
                ]}
                control={control}
            />
            <TextfieldQuestion 
                label="Nome do profissional:"
                name="professionalName"
                control={control}
                
            />
            <TextfieldQuestion 
                label="Registro do conselho:"
                name="register"
                type="number"
                control={control}
            /> {/** Pensar em validação!!!! Os números */}
            <TextfieldQuestion 
                label="Outras informações:"
                name="otherInformations"
                control={control}
            />
        </Box>
    );
}

export default ReportForm;