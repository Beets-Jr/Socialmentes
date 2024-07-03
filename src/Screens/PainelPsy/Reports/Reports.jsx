import { useState } from "react";
import { Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

import styles from './Reports.module.css';
import { Check, Close } from "@mui/icons-material";

const user = {
    nome: "Matheus Seiji Noda",
    age: "20 ano(s) e 8 mes(ês)"
}

function Reports() {

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
                        <Typography component='span'>Nome:</Typography> {user.nome}
                    </Typography>
                    <Typography className={styles.user_text}>
                        <Typography component='span'>Idade:</Typography> {user.age}
                    </Typography>
                    <Typography className={styles.legend} display='flex' alignItems='center'>
                        <Check fontSize="inherit"/>&nbsp;Adquirido&nbsp;|&nbsp;<Close fontSize="inherit" />&nbsp;Não avaliado
                    </Typography>

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
                                <TableRow>
                                    <TableCell>Comunicação Receptiva</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Comunicação Expressiva</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Competências Socias:<br/>Adultos e Pares</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Cognição</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Jogo</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Competências Sociais</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}

        </Box>
    );

}

export default Reports;