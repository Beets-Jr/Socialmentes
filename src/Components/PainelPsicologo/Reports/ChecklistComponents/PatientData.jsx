import { Box, Typography } from "@mui/material";
import styles from "./PatientData.module.css";

function calcularIdade(dataNascimento) {
    const hoje = new Date();
    let dia, mes, ano;

    if (dataNascimento.includes('/')) {
        [dia, mes, ano] = dataNascimento.split('/').map(Number);
    } else if (dataNascimento.includes('-')) {
        [ano, mes, dia] = dataNascimento.split('-').map(Number);
    } else {
        return 'Formato de data inválido';
    }
    
    const nascimento = new Date(ano, mes - 1, dia);

    let idadeAnos = hoje.getFullYear() - nascimento.getFullYear();
    let idadeMeses = hoje.getMonth() - nascimento.getMonth();

    if (idadeMeses < 0 || (idadeMeses === 0 && hoje.getDate() < nascimento.getDate())) {
        idadeAnos--;
        idadeMeses = 12 + idadeMeses;
    }

    return `${idadeAnos} ano(s) e ${idadeMeses} mês(es)`;
}

function PatientData({name, birthday}) {    
    const idade = calcularIdade(birthday);
    return(
        <Box className={styles.patientContainer}>
            <Typography className={styles.patientData}>
                <span style={{ fontWeight: 'bold' }}>Nome:</span> {name}
            </Typography>
            <Typography className={styles.patientData}>
                <span style={{ fontWeight: 'bold' }}>Idade:</span> {idade}
            </Typography>
        </Box>
    );
}

export default PatientData;