import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Check, Close } from "@mui/icons-material";

import { PatientService } from "../../../Services/patientService";
import { TestService } from "../../../Services/testService";

import styles from './Tabela.module.css';

function Tabela() {

    const { testId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [denver, setDenver] = useState();
    const [test, setTest] = useState();
    const [patient, setPatient] = useState();

    useEffect(() => {
        TestService.getTestById(testId)
            .then( test => {
                if (test instanceof Error) {
                    console.log(test.message);
                    return;
                }
                setTest(test);
                return PatientService.getPatientById(test.patientId)
            })
            .then( data => {
                if (!data || data instanceof Error) {
                    console.log(test.message);
                    return;
                }
                setPatient(data);
                return fetch('/src/Database/denver.json')
            })
            .then( resp => {
                return resp.json()
            })
            .then( denver => {
                setDenver(denver);
                setIsLoading(false);
            })
            .catch( e => console.log(e) );

    }, []);

    const getAge = (date) => {
        if (!date) return;
        const now = new Date();
        const dataString = date;
        const dateBirth = new Date(
            dataString.slice(0, 4),
            Number(dataString.slice(5, 7)) - 1,
            dataString.slice(8, 10)
        );
        const years = now.getFullYear() - dateBirth.getFullYear();
        const months = now.getMonth() - dateBirth.getMonth();
        const days = now.getDate() - dateBirth.getDate();

        if (months < 0) {
            return `${years - 1} anos e ${12 + months} mes(es)`;
        } else if (months > 0) {
            return `${years} anos e ${months} mes(es)`;
        } else if (days < 0) {
            return `${years - 1} anos e ${months > 0 ? months - 1 : 11} mes(es)`;
        } else {
            return `${years} anos`;
        }
    };

    const compObjscts = (a, b) => {
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
                    <Typography className={styles.user_text}>
                        <Typography component='span'>Nome:</Typography> {patient?.children.name}
                    </Typography>
                    <Typography className={styles.user_text}>
                        <Typography component='span'>Idade:</Typography> {getAge(patient?.children.dateBirth)}
                    </Typography>
                    <Typography className={styles.legend} display='flex' alignItems='center'>
                        <Check fontSize="inherit"/>&nbsp;Adquirido&nbsp;|&nbsp;<Close fontSize="inherit" />&nbsp;Não avaliado
                    </Typography>

                        {/* Tabela */}
                        <Box className={styles.table_border}>
                        <TableContainer className={styles.table_container}>
                            <Table>

                                <TableHead>
                                    <TableRow>
                                        <TableCell>Domínio</TableCell>
                                        <TableCell>Nível 1 (1a - 1a 6m)</TableCell>
                                        <TableCell>Nível 2 (1a 6m - 2a)</TableCell>
                                        <TableCell>Nível 3 (2a - 3a)</TableCell>
                                        <TableCell>Nível 4 (3a - 4a)</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>

                                    {/* Acessa todos os levels em questions */}
                                    { test && denver && Object.keys(test.questions).sort( (a, b) => compObjscts(a, b) ).map( level => {

                                        {/* Acessa todas as categorias do level */}
                                        return Object.keys(test.questions[level]).sort( (a, b) => compObjscts(a, b) ).map( category => {

                                            const numLevel = Number(level.split('_')[1]);
                                            if (numLevel > 3) return;
                                            const numCategory = Number(category.split('_')[1]);
                                            if (numCategory > denver[numLevel]["categorias"].length - 1) return;
                                            const nameCategory = `${denver[numLevel]["categorias"][numCategory]["nome"]} - Nível ${numLevel + 1}`;

                                            return (
                                                <TableRow key={category}>
                                                    <TableCell>{nameCategory}</TableCell>
                                                    { [1, 2, 3, 4].map( ind => (
                                                        <TableCell key={ind}>
                                                            {
                                                                numLevel === ind ? (
                                                                    <Check fontSize="small"/>
                                                                ) : (
                                                                    <Close fontSize="small" />
                                                                )
                                                            }
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            );

                                        })}

                                    )}

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            )}

        </Box>
    );

}

export default Tabela;