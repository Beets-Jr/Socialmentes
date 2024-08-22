import { useEffect, useState } from "react";

import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

import styles from './styles/TabelaDesktop.module.css';
import { Check, Close } from "@mui/icons-material";

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
            <TableContainer className={styles.table_container}>
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

export const AtividadesDesktop = ({ activities }) => {

    return (
        <Box className={styles.table_border}>
            <TableContainer
                className={styles.table_container}
            >
                <Table>

                    <TableHead>
                        <TableRow>
                            <TableCell>Atividade</TableCell>
                            <TableCell>Brincadeira</TableCell>
                            <TableCell>Metas</TableCell>
                            <TableCell>Local</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        { activities.map( (activity, i) => {
                            return (
                                <TableRow key={activity.id}>
                                    <TableCell>{i+1}</TableCell>
                                    <TableCell>{activity.type_play}</TableCell>
                                    <TableCell>
                                        { activity.goals.map( (goal, index) => (
                                            <Typography
                                                key={index}
                                                fontSize={15}
                                            >
                                                {index+1} - {goal}
                                            </Typography>
                                        ))}
                                    </TableCell>
                                    <TableCell>{activity.place}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>

                </Table>
            </TableContainer>
        </Box>
    );

};

export const CronogramaDesktop = ({ cronogram }) => {

    return cronogram.map( intervention => (
        <Box key={intervention.id} className={styles.table_border}>
            <TableContainer
                className={styles.table_container}
            >
                <Table>

                    <TableHead>
                        <TableRow>
                            <TableCell>Horário</TableCell>
                            <TableCell>Segunda-feira</TableCell>
                            <TableCell>Terça-feira</TableCell>
                            <TableCell>Quarta-feira</TableCell>
                            <TableCell>Quinta-feira</TableCell>
                            <TableCell>Sexta-feira</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody className={styles.cronogram}>
                        <TableRow key={intervention.id}>
                            <TableCell>{intervention.hour}</TableCell>
                            { [0, 1, 2, 3, 4].map( j => (
                                <TableCell key={j}>
                                    { intervention.day_week.some( day => day == j ) && (
                                        <Close fontSize="small" />
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                        <TableRow>
                            <TableCell>Terapeuta</TableCell>
                            <TableCell
                                colSpan={5}
                                className={styles.professional}
                            >
                                {intervention.professional_name}
                            </TableCell>
                        </TableRow>
                    </TableBody>

                </Table>
            </TableContainer>
        </Box>
    ));

}