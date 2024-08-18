import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/dist";

import { Box, CircularProgress, createTheme, ThemeProvider, Typography, useMediaQuery } from "@mui/material";

import { getPatient } from "../../../Services/patientService";
import { getTestByIdTest } from "../../../Services/testsPatientsService"
import { TabelaPaciente } from "../../../Components/PainelPsicologo/Reports/Tabela/TabelaPaciente";
import BottomBtn from "../../../Components/PainelPsicologo/Reports/AcompanharIntervencao/BottomBtn";

import styles from './Tabela.module.css';
import { DominiosMobile } from "../../../Components/PainelPsicologo/Reports/AcompanharIntervencao/TabelaMobile";
import { DominiosDesktop } from "../../../Components/PainelPsicologo/Reports/AcompanharIntervencao/TabelaDesktop";

const dataTemp = {
    testId: 1234567,
    goals: [
        {
            id: 0,
            nome: "Comunicação Receptiva (CR)",
            level: 1,
            perguntas: [
                {
                    id: 0,
                    pergunta: "Direciona cabeça e olhar para sons vocais lúdicos como vibração da língua, ruídos e barulhos, assobios.",
                    descricao: "Identifica origem sonora, virando cabeça cabeça e olhos para o local. Demonstra-se interessado, vira os olhos e a cabeça, sorri, mantém contato visual com parceiro social.",
                    submetas: [
                        "Direciona a cabeça, olhos, sorri e mantém contato visual para a origem sonora por 2 vezes em 10 minutos.",
                        "Direciona a cabeça, olhos, sorri e mantém contato visual para a origem sonora por 2 vezes em 10 minutos.",
                        "Direciona a cabeça, olhos, sorri e mantém contato visual para a origem sonora por 2 vezes em 10 minutos."
                    ],
                },
                {
                    id: 1,
                    pergunta: "Localiza voz humana direcionando cabeça e olhos para a fonte sonora.",
                    descricao: "Identifica origem sonora, virando cabeça para o parceiro social.",
                    submetas: [
                        "Direciona a cabeça e olhos para o parceiro social 1 vez em 1 oportunidade.",
                        "Direciona a cabeça e olhos para o parceiro social 1 vez em 1 oportunidade.",
                        "Direciona a cabeça e olhos para o parceiro social 1 vez em 1 oportunidade."
                    ],
                },
            ]
        },
        {
            id: 0,
            nome: "Comunicação Expressiva (CE)",
            level: 1,
            perguntas: [
                {
                    id: 0,
                    pergunta: "Vocaliza com intenção.",
                    descricao: "Vocaliza em conjunto com o contato visual e/ou gesto (por exemplo, tentar alcançar) para pedir um item ou objeto desejado.",
                    submetas: [
                        "Vocaliza com ajuda indicando pedido por 2 vezes em 3 oportunidades.",
                        "Vocaliza com ajuda indicando pedido por 2 vezes em 3 oportunidades.",
                        "Vocaliza com ajuda indicando pedido por 2 vezes em 3 oportunidades.",
                        "Vocaliza com ajuda indicando pedido por 2 vezes em 3 oportunidades.",
                    ],
                },
                {
                    id: 1,
                    pergunta: "Exprime recusa afastando um objeto ou devolvendo o objeto à outra pessoa.",
                    descricao: "O gesto não precisa ser acompanhado pelo contato visual ou vocalizações/palavras. Pontue a outros gestos convencionais (balançar a cabeça, sinal de 'tudo feito') ou palavras ('Não').",
                    submetas: [
                        "Exprime recusa afastando 1 objeto ou devolvendo o objeto à outra pessoa em 3 oportunidades.",
                        "Exprime recusa afastando 1 objeto ou devolvendo o objeto à outra pessoa em 3 oportunidades.",
                        "Exprime recusa afastando 1 objeto ou devolvendo o objeto à outra pessoa em 3 oportunidades.",
                    ],
                },
            ]
        }
    ],
    activities: [
        {
            type_play: 'type_play',
            place: 'place',
            goals: 'goals'
        },
        {
            type_play: 'type_play 2',
            place: 'place 2',
            goals: 'goals'
        }
    ],
    cronogram: [
        {
            hour: '12:12',
            professional_id: '50',
            professional_name: 'Professional Name',
            day_week: 'terça-feira'
        },
        {
            hour: '13:13',
            professional_id: '50',
            professional_name: 'Professional Name',
            day_week: 'terça-feira'
        }
    ],
    coordinator_sr: 'Coordinator Sr',
    coordinator_jr: 'Coordinator Jr',
    start_ABA: 'startABA'
};

let theme = createTheme();
theme.typography.h2 = {
    [theme.breakpoints.up('xs')]: {
        fontSize: '24px'
    },
    [theme.breakpoints.up('sm')]: {
        fontSize: '30px'
    },
};

const Title = ({ children, component = 'h3' }) => {
    return (
        <Typography
            variant="h2"
            component={component}
            sx={{
                fontFamily: 'var(--font-sub)',
                fontWeight: component == 'h2' ? 500 : 400,
                color: 'var(--color-blue-4)',
                marginBottom: 2,
                marginTop: component == 'h3' ? 2 : 0
            }}
        >
            {children ?? ''}
        </Typography>
    );
};

function AcompanharIntervencao() {

    const { testId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [patient, setPatient] = useState();
    const [data, setData] = useState(undefined);

    const isMobile = useMediaQuery('(max-width:600px)');

    useEffect(() => {
        async function createTable() {
            try {
                // recupera o teste
                const test = await getTestByIdTest(testId);
                if (test instanceof Error) {
                    console.log(test.message);
                    return;
                }

                // seta o paciente relacionado ao teste
                const respPatient = await getPatient(test.patientId)
                if (respPatient instanceof Error) {
                    console.log(respPatient.message);
                    return;
                } else {
                    setPatient(respPatient);
                }
                
                setData(dataTemp);

                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        createTable();
    }, []);
    
    return (
        <Box className={styles.container_reports}>

            { isLoading ? (
                <Box className={styles.container_empty}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box style={{ position: 'relative' }} >

                    <ThemeProvider theme={theme}>
                        <Title component='h2'> {/* Título da página */}
                            Checklist Curriculum Modelo Intervenção Precoce em Crianças com Austismo
                        </Title>

                        <Box my={3}> {/* Dados do Paciente */}
                            <TabelaPaciente patient={patient} showCaption={false} showDateBirth />
                        </Box>

                        <Box> {/* Conteúdo */}
                            <Title component="h3">
                                Domínios Desenvolvidos
                            </Title>

                            <DominiosDesktop goals={data.goals} />

                            <Title component="h3">
                                Rotina de Atividades
                            </Title>

                            <Title component="h3">
                                Cronogramas
                            </Title>

                            {/* Coordenador */}
                            <Box className={styles.coordinators}> 
                                <Typography className={styles.user_text}>
                                    Coordenador Sênior: {data.coordinator_sr}
                                </Typography>
                                <Typography className={styles.user_text}>
                                    Coordenador Jr.: {data.coordinator_jr}
                                </Typography>
                            </Box>
                        </Box>

                        <Box> {/* Botões da parte inferior */}
                            <BottomBtn />
                        </Box>

                    </ThemeProvider>
                </Box>
            )}

        </Box>
    );

}

export default AcompanharIntervencao;