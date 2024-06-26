import { Button } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import styles from "./Test.module.css";

function Test({ key, createdAt, type, status, patient}) {
    const date = new Date(createdAt).toLocaleDateString('pt-BR'); // Formatar a data 
    const time = new Date(createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }); // Formatar o horário

    return (
        <>
            <Button 
                endIcon={<ArrowForwardIosIcon sx={{color:'var(--color-gray-5)'}}/>}
                variant="outlined"
                className={styles.test}
            >
                {`${key} | Criado: ${date} às ${time} | Tipo: ${type} |  ${status} | ${patient}`}
            </Button>
        </>
    )
}

export default Test