import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

import styles from './styles/TabelaDesktop.module.css';

export const DominiosDesktop = ({ goals }) => {

    return goals.map( goal => (
        <Box
            key={goal.id}
            className={styles.table_border}
        >
            <TableContainer
                className={styles.table_container}
            >
                <Table>

                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={4}>{goal.nome}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Metas</TableCell>
                            <TableCell>Nível {goal.level}</TableCell>
                            <TableCell>Descrição</TableCell>
                            <TableCell>Sub metas</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        { goal.perguntas.map( (pergunta, i) => {
                            return (
                                <TableRow key={pergunta.id}>
                                    <TableCell>{i+1}</TableCell>
                                    <TableCell>{i+1} - {pergunta.pergunta}</TableCell>
                                    <TableCell>{pergunta.descricao}</TableCell>
                                    <TableCell>
                                        { pergunta.submetas.map( (submeta, index) => (
                                            <Typography key={index}>
                                                {submeta}
                                            </Typography>
                                        ))}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>

                </Table>
            </TableContainer>
        </Box>
    ));

};