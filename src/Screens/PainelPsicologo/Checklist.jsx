import { Typography, Box, Stack, CircularProgress } from "@mui/material";
import ReportBtn from "../../Components/PainelPsicologo/Reports/ChecklistComponents/ReportBtn";
import PatientData from "../../Components/PainelPsicologo/Reports/ChecklistComponents/PatientData";
import ChecklistAnswer from "../../Components/PainelPsicologo/Reports/ChecklistComponents/ChecklistAnswer";
import BottomBtn from "../../Components/PainelPsicologo/Reports/ChecklistComponents/BottomBtn";
import styles from "./Checklist.module.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import { fetchPatientById } from "../../Services/testService";

function Checklist() {
    const location = useLocation();
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [checkedQuestions, setCheckedQuestions] = useState([]);
    const bottomBtnRef = useRef(null);

    const { test } = location.state;

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const patientData = await fetchPatientById(test.patientId); //não é melhor usar o param id?
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


    const handleCheckChange = useCallback((formattedName) => {
        setCheckedQuestions(prevCheckedQuestions => {
            if (prevCheckedQuestions.includes(formattedName)) {
                return prevCheckedQuestions.filter((question) => question !== formattedName);
            } else {
                return [...prevCheckedQuestions, formattedName];
            }
        });
    }, []);

    return (
        loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '85vh' }}>
                <CircularProgress />
            </Box>
        ) : (
            <div className={styles.checklistContainer} style={{ position: 'relative' }}>
                <Typography variant="h4" sx={{ fontFamily: 'var(--font-sub)', color: 'var(--color-blue-4)' }}>
                    Checklist Currículo Modelo de Intervenção Precoce Finalizado
                    (Somente Leitura)
                </Typography>

                <Box className={styles.menuContainer}>
                    <PatientData name={patient.children.name} birthday={patient.children.dateBirth} />
                    <Stack direction="row" spacing={2} className={styles.stackContainer}>
                        <ReportBtn name="Gráfico" path={`/painel-psi/checklist/grafico/${test.id}`} />
                        <ReportBtn name="Tabela" path={`/painel-psi/checklist/tabela/${test.id}`} />
                        <ReportBtn name="Relatório" path={`/painel-psi/checklist/relatorio/${patient.id}`} />
                    </Stack>
                </Box>
                <ChecklistAnswer test={test} checkedQuestions={checkedQuestions} handleCheckChange={handleCheckChange} />
                <div ref={bottomBtnRef}>
                    <BottomBtn checkedQuestions={checkedQuestions} patient={patient} test={test} />
                </div>
            </div>
        )
    );
}

export default Checklist;