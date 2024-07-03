import { Button } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import styles from "./Test.module.css";

import { useNavigate } from "react-router-dom"; 

function Test({ index, createdAt, type, status, patient}) {
    const navigate = useNavigate();

    const date = new Date(createdAt).toLocaleDateString('pt-BR'); // Formatar a data 
    const time = new Date(createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }); // Formatar o horário

    const handleClick = () => {
        navigate('/checklist');
    }

    return (
        <>
            <Button 
                endIcon={<ArrowForwardIosIcon sx={{color:'var(--color-gray-5)'}}/>}
                variant="outlined"
                className={styles.test}
                onClick={handleClick} // Evento para abrir a página de checklist do teste
            >
                {`${index} | Criado: ${date} às ${time} | Tipo: ${type} |  ${status} | ${patient}`}
            </Button>
        </>
    )
}

export default Test