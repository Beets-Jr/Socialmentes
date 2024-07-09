import { Button } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import styles from "./Test.module.css";

import { useNavigate } from "react-router-dom"; 

function Test({ test }) {
    const navigate = useNavigate();

    const date = new Date(test.timestamp).toLocaleDateString('pt-BR'); // Formatar a data 
    const time = new Date(test.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }); // Formatar o horário

    const handleClick = () => {
        navigate('/painel-adm/checklist', {state: {test: test}});
    }

    const status = test.situation === 0 ? "Finalizado" : "Não Terminado";

    return (
        <>
            <Button 
                endIcon={<ArrowForwardIosIcon sx={{color:'var(--color-gray-5)'}}/>}
                variant="outlined"
                className={styles.test}
                onClick={handleClick} // Evento para abrir a página de checklist do teste
                sx={{margin: '5px auto', width:'100%'}}
            >
                {`${test.id} | Criado: ${date} às ${time} | Tipo: ${test.testType} |  ${status} | ${test.patientName}`}
            </Button>
        </>
    )
}

export default Test