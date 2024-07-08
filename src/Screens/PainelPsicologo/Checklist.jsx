import { Typography, Box, Stack, CircularProgress } from "@mui/material";
import ReportBtn from "../../Components/PainelPsicologo/Reports/ChecklistComponents/ReportBtn";
import PatientData from "../../Components/PainelPsicologo/Reports/ChecklistComponents/PatientData";
import ChecklistAnswer from "../../Components/PainelPsicologo/Reports/ChecklistComponents/ChecklistAnswer";
import BottomBtn from "../../Components/PainelPsicologo/Reports/ChecklistComponents/BottomBtn";
import styles from "./Checklist.module.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { fetchPatientById } from "../../Services/testService";

function Checklist() {
    const location = useLocation();
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true); 
    const bottomBtnRef = useRef(null);

    const { test } = location.state;

    useEffect(() => {
        const fetchPatient = async () => {
            try {
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
        };

        fetchPatient();
    }, [test.patientId]);

    useEffect(() => {
        if (bottomBtnRef.current) {
            bottomBtnRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [patient]);

    return (
        loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '85vh' }}>
                <CircularProgress />
            </Box>
        ) : (
            <div className={styles.checklistContainer} style={{ position: 'relative' }}>
                <Typography variant="h4" className={styles.checklistTitle}>
                    Checklist Currículo Modelo de Intervenção Precoce Finalizado
                    (Somente Leitura)
                </Typography>
                
                <Box className={styles.menuContainer}>
                    <PatientData name={patient.children.name} birthday={patient.children.dateBirth} />
                    <Stack direction="row" spacing={2}>
                        <ReportBtn name="Gráfico" path="/grafico" /> {/* Colocar o path certo */}
                        <ReportBtn name="Tabela" path="/tabela" />
                        <ReportBtn name="Relatório" path="/relatorio" />
                    </Stack>
                </Box>
                <ChecklistAnswer test={test} />
                <div ref={bottomBtnRef}>
                    <BottomBtn />
                </div>
            </div>
        )
    );
}

export default Checklist;