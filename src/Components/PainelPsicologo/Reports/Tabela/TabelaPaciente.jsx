import { Check, Close } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

import styles from './styles/TabelaPaciente.module.css';

export const TabelaPaciente = ({ patient, showCaption = true, showDateBirth = false }) => {

    const getAge = (date) => {
        if (!date) return;
        const now = new Date();
        const dataString = date;
        const dateBirth = dataString[2] === '/' ?
            new Date(
                dataString.slice(6, 10),
                Number(dataString.slice(3, 5)) - 1,
                dataString.slice(0, 2)
            ) :
            new Date(
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

    const formatDate = (date) => {
        return `${date.slice(8)}/${date.slice(5, 7)}/${date.slice(0, 4)}`;
    }

    return (
        <Box>
            <Typography className={styles.user_text}>
                <Typography component='span'>Nome:</Typography> {patient?.children.name}
            </Typography>
            <Typography className={styles.user_text}>
                <Typography component='span'>Idade:</Typography> {getAge(patient?.children.dateBirth)}
            </Typography>
            { showDateBirth &&
                <Typography className={styles.user_text}>
                    <Typography component='span'>Data de Nascimento:</Typography> {formatDate(patient?.children.dateBirth)}
                </Typography>
            }
            { showCaption &&
                <Typography className={styles.legend} display='flex' alignItems='center'>
                    <Check fontSize="inherit" />&nbsp;Adquirido&nbsp;|&nbsp;<Close fontSize="inherit" />&nbsp;Não avaliado
                </Typography>
            }
        </Box>
    );

};