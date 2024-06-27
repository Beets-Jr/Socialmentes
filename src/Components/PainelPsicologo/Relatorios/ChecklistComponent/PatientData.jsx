import { Box, Typography } from "@mui/material";
import styles from "./PatientData.module.css";

function calcularIdade(dataNascimento) {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);

    let idadeAnos = hoje.getFullYear() - nascimento.getFullYear();
    let idadeMeses = hoje.getMonth() - nascimento.getMonth();

    if (idadeMeses < 0 || (idadeMeses === 0 && hoje.getDate() < nascimento.getDate())) {
        idadeAnos--;
        idadeMeses = 12 + idadeMeses;
    }

    return `${idadeAnos} ano(s) e ${idadeMeses} mês(es)`;
}

function PatientData({name, birthday}) {
    return(
        <Box className={styles.patientContainer}>
            <Typography className={styles.patientData}>
                <span style={{ fontWeight: 'bold' }}>Nome:</span> {name}
            </Typography>
            <Typography className={styles.patientData}>
                <span style={{ fontWeight: 'bold' }}>Idade:</span> {calcularIdade(birthday)}
            </Typography>
        </Box>
    );
}

export default PatientData;