import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box, CircularProgress, useMediaQuery } from "@mui/material";

import { PatientService } from "../../../Services/patientService";
import { TestService } from "../../../Services/testService";
import { TabelaPaciente } from "../../../Components/PainelPsicologo/Relatorios/TabelaPaciente";
import { TabelaDesktop } from "../../../Components/PainelPsicologo/Relatorios/TabelaDesktop";
import { TabelaMobile } from "../../../Components/PainelPsicologo/Relatorios/TabelaMobile";

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
                const test = await TestService.getTestById(testId);
                if (test instanceof Error) {
                    console.log(test.message);
                    return;
                }

                // seta o paciente relacionado ao teste
                const respPatient = await PatientService.getPatientById(test.patientId)
                if (respPatient instanceof Error) {
                    console.log(respPatient.message);
                    return;
                } else {
                    setPatient(respPatient);
                }

                // busca as informações do arquivo denver.json
                const denverJson = await fetch('/src/Database/denver.json');
                const denverData = await denverJson.json();

                // cria um objeto para ser iterado na exibição da tabela
                let dataTemp = {};
                Object
                    .keys( test.questions )
                    .sort( (a, b) => compObjects(a, b) )
                    .map( level => {
                        Object
                            .keys(test.questions[level])
                            .sort((a, b) => compObjects(a, b))
                            .map( category => {

                                const numLevel = Number(level.split('_')[1]);
                                if (numLevel > 3) return;
                                const numCategory = Number(category.split('_')[1]);
                                if (numCategory > denverData[numLevel]["categorias"].length - 1) return;
                                const nameCategory = denverData[numLevel]["categorias"][numCategory]["nome"];

                                if (!dataTemp[nameCategory])
                                    dataTemp[nameCategory] = [false, false, false, false];
                                dataTemp[nameCategory][numLevel] = true;

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