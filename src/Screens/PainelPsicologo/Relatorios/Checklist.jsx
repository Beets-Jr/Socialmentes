import { Typography, Box, Stack } from "@mui/material";
import ChecklistItem from "../../../Components/PainelPsicologo/Relatorios/ChecklistComponent/ChecklistItem";
import ReportBtn from "../../../Components/PainelPsicologo/Relatorios/ChecklistComponent/ReportBtn";
import PacientData from "../../../Components/PainelPsicologo/Relatorios/ChecklistComponent/PatientData"
import styles from "./Checklist.module.css";

function Checklist({name, birthday}) {
    return(
        <div>
            <Typography variant="h4" className={styles.checklistTitle}>
                Checklist Currículo Modelo de Intervenção Precoce Finalizado
            </Typography>
            
            <Box className={styles.menuContainer}>
                <PacientData name={name} birthday={birthday}/>
                <Stack direction="row" spacing={2}>
                    <ReportBtn name="Gráfico" path="/"></ReportBtn> {/*Colocar o path certo*/}
                    <ReportBtn name="Tabela" path="" />
                    <ReportBtn name="Relatório" path="" />
                </Stack>
            </Box>

            <Typography variant="h5" className={styles.checklistTitle}>
                Comunicação Receptiva - Nível 1
            </Typography>

            <ChecklistItem
                index={1}
                hability="Habilidade A"
                description="Descrição da Habilidade A."
                level="Adquirido"
            />
            <ChecklistItem
                index={2}
                hability="Localiza os sons direcionando cabeça e olhos para a fonte sonora"
                description="Identifica origem sonora, virando cabeça e olhos para o local."
                level="Parcialmente"
            />
        </div>
    );
}

export default Checklist;