import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box, CircularProgress, useMediaQuery } from "@mui/material";

import { denver } from "../../../Database/denver";
import { getPatient } from "../../../Services/patientService";
import { getTestByIdTest } from "../../../Services/testsPatientsService"
import { TabelaPaciente } from "../../../Components/PainelPsicologo/Reports/Tabela/TabelaPaciente";
import { TabelaDesktop } from "../../../Components/PainelPsicologo/Reports/Tabela/TabelaDesktop";
import { TabelaMobile } from "../../../Components/PainelPsicologo/Reports/Tabela/TabelaMobile";

import styles from './Tabela.module.css';

function Tabela() {

    const { testId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [patient, setPatient] = useState();
    const [data, setData] = useState();

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

                // busca as informações do arquivo denver.js
                const denverData = denver;

                // cria um objeto para ser iterado na exibição da tabela
                let dataTemp = {};
                Object
                    .keys( test.questions )
                    .sort( (a, b) => compObjects(a, b) )
                    .map( level => {
                        Object
                            .entries(test.questions[level])
                            .sort((a, b) => compObjects(a[0], b[0]))
                            .map( category => {

                                const numLevel = Number(level.split('_')[1]);
                                const numCategory = Number(category[0].split('_')[1]);
                                if (numCategory >= denverData[numLevel - 1]["categorias"].length) return;
                                const nameCategory = denverData[numLevel - 1]["categorias"][numCategory]["nome"];

                                const evaluated = Object
                                    .values( category[1] )
                                    .some( value => value == 2 || value == 3 );

                                if (!dataTemp[nameCategory] && evaluated)
                                    dataTemp[nameCategory] = [false, false, false, false];
                                if (evaluated)
                                    dataTemp[nameCategory][numLevel - 1] = true;

                            })
                        });

                setData(dataTemp);
                setIsLoading(false);

            } catch (error) {
                console.log(error);
            }
        }
        createTable();
    }, []);

    const compObjects = (a, b) => {
        return Number(a.split('_')[1]) - Number(b.split('_')[1]);
    };

    return (
        <Box className={styles.container_reports}>

            { isLoading ? (
                <Box className={styles.container_empty}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box>

                    {/* Exibe o nome, idade do paciente e a legenda da tabela */}
                    <TabelaPaciente patient={patient} />

                    {/* Tabela */}
                    <Box className={styles.table_border}>

                        { isMobile ? (
                            <TabelaMobile data={data} />
                        ) : (
                            <TabelaDesktop data={data} />
                        )}

                    </Box>
                </Box>
            )}

        </Box>
    );

}

export default Tabela;