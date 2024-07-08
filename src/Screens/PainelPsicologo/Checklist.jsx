import { Typography, Box, Stack, CircularProgress } from "@mui/material";
import ReportBtn from "../../Components/PainelPsicologo/Reports/ChecklistComponents/ReportBtn";
import PatientData from "../../Components/PainelPsicologo/Reports/ChecklistComponents/PatientData"
import styles from "./Checklist.module.css";
import BottomBtn from "../../Components/PainelPsicologo/Reports/ChecklistComponents/BottomBtn";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ChecklistAnswer from "../../Components/PainelPsicologo/Reports/ChecklistComponents/ChecklistAnswer";
import { fetchPatientById } from "../../Services/testService";

function Checklist() {
    const location = useLocation();
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(null);

    const { test } = location.state;
      
    useEffect(() => {
        const fetchPatient = async() => {
            try {
                setLoading(true);
                const patientData = await fetchPatientById(test.patientId);
                if (patientData) {
                    setPatient(patientData);
                } else {
                    console.error('Paciente não encontrado');
                }
            } catch (err) {
                console.error("Error fetching data ", err);
            } finally {
                setLoading(false);
            }
        }

        fetchPatient();
    }, [test.patientId]);


    return(
        loading ? (
        <Box sx={{ display:'flex', justifyContent:'center', alignItems:'center', height: '85vh'}}>
            <CircularProgress />
          </Box>
        ) : ( 
        <div className={styles.checklistContainer} style={{position:'relative'}}>
            <Typography variant="h4" className={styles.checklistTitle}>
                Checklist Currículo Modelo de Intervenção Precoce Finalizado
                (Somente Leitura)
            </Typography>
            
            <Box className={styles.menuContainer}>
                {patient && (
                    <PatientData name={patient.children.name} birthday={patient.children.dateBirth} />
                )}
                <Stack direction="row" spacing={2}>
                    <ReportBtn name="Gráfico" path="/grafico"/> {/*Colocar o path certo*/}
                    <ReportBtn name="Tabela" path="/tabela" />
                    <ReportBtn name="Relatório" path="/relatorio" />
                </Stack>
            </Box>
            <ChecklistAnswer test = { test }/>
            <BottomBtn/>
        </div>
        )
    );
}

export default Checklist;