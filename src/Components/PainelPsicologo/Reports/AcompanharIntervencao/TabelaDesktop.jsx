import { useEffect, useState } from "react";

import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

import styles from './styles/TabelaDesktop.module.css';

export const DominiosDesktop = ({ goals }) => {

    const [numGoals, setNumGoals] = useState();

    useEffect(() => {
        const num = [];
        goals.forEach( goal => {
            num.push(goal.perguntas.length);
        });
        setNumGoals(num);
    }, [goals]);

    return goals.map( (goal, i) => (
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
                            <TableCell colSpan={4} className={styles.table_title}>{goal.nome}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell width={"15%"}>Metas</TableCell>
                            <TableCell width={"20%"}>Nível {goal.level}</TableCell>
                            <TableCell width={"30%"}>Descrição</TableCell>
                            <TableCell width={"35%"}>Sub metas</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        { numGoals && goal.perguntas.map( (pergunta, j) => {
                            const numGoal = numGoals?.slice(0, i).reduce((a, b) => a + b, 1) + j;
                            return (
                                <TableRow key={pergunta.id}>
                                    <TableCell>{numGoal}</TableCell>
                                    <TableCell>{numGoal} - {pergunta.pergunta}</TableCell>
                                    <TableCell>{pergunta.descricao}</TableCell>
                                    <TableCell className={styles.submetas}>
                                        { pergunta.submetas.map( (submeta, index) => (
                                            <Typography
                                                key={index}
                                                fontSize={15}
                                            >
                                                {submeta}
                                            </Typography>
                                        ))}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>

                </Table>
            </TableContainer>
        </Box>
    ));

};