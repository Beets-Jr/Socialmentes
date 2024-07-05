import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Check, Close } from "@mui/icons-material";

import { PatientService } from "../../../Services/patientService";
import { TestService } from "../../../Services/testService";

import styles from './Tabela.module.css';

const user = {
    nome: "Matheus Seiji Noda",
    age: "20 ano(s) e 8 mes(ês)"
}

function Tabela() {

    const { testId } = useParams();
    const [patient, setPatient] = useState();
    const [test, setTest] = useState();

    useEffect(() => {
        TestService.getTestById(testId)
            .then( test => {
                if (test instanceof Error) {
                    console.log(test.message);
                    return;
                }
                setTest(test);
                console.log(test);
                return PatientService.getPatientById(test.patientId)
            })
            .then( data => {
                if (!data || data instanceof Error) {
                    console.log(test.message);
                    return;
                }
                setPatient(data);
                console.log(data);
            });
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
    }

    const [isLoading, setIsLoading] = useState(false);//(true);

    return (
        <Box className={styles.container_reports}>

            { isLoading ? (
                <Box className={styles.container_empty}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box>
                    <Typography className={styles.user_text}>
                        <Typography component='span'>Nome:</Typography> {patient?.children.name}
                    </Typography>
                    <Typography className={styles.user_text}>
                        <Typography component='span'>Idade:</Typography> {getAge(patient?.children.dateBirth)}
                    </Typography>
                    <Typography className={styles.legend} display='flex' alignItems='center'>
                        <Check fontSize="inherit"/>&nbsp;Adquirido&nbsp;|&nbsp;<Close fontSize="inherit" />&nbsp;Não avaliado
                    </Typography>

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
                                    { Object.keys(test.questions).map( level => {
                                        <TableRow key={level}>
                                            <TableCell>{level}</TableCell>
                                            <TableCell><Check fontSize="small"/></TableCell>
                                            <TableCell><Close fontSize="small" /></TableCell>
                                        </TableRow>
                                    })}
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