import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

import styles from './styles/TabelaDesktop.module.css';
import { Check } from "@mui/icons-material";

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
                            <TableCell colSpan={4} className={styles.table_title}>{goal.nome}</TableCell>
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
                            );
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

    return (
        <Box className={styles.table_border}>
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

                    <TableBody>
                        { cronogram.map( (intervention, i) => {
                            return (
                                <TableRow key={intervention.id}>
                                    <TableCell>{intervention.hour}</TableCell>
                                    <TableCell>
                                        { intervention.day_week.find(0) && (
                                            <Check fontSize="small" />
                                        )}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>

                </Table>
            </TableContainer>
        </Box>
    );

}