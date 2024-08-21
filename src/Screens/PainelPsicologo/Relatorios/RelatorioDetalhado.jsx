import { Box, CircularProgress, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { denver } from "../../../Database/denver";
import { getPatient } from "../../../Services/patientService";
import { getTestByIdTest } from "../../../Services/testsPatientsService";
import ReportBtn from "../../../Components/PainelPsicologo/Reports/ChecklistComponents/ReportBtn";
import PatientData from "../../../Components/PainelPsicologo/Reports/ChecklistComponents/PatientData";
import ReportForm from "../../../Components/PainelPsicologo/Reports/ReportForm";

function RelatoriDetalhado() {

    const { testId } = useParams();
    const [loading, setLoading] = useState(true);
    const [patient, setPatient] = useState();

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                //const test = await getTestByIdTest(testId); // recupera o teste

                const patientData = await getPatient(testId); // encontra o paciente do teste
                if (patientData) {
                    setPatient(patientData);
                } else {
                    console.error('Paciente não encontrado');
                }

                //const denverData = denver; // busca as informações do denver.js

            } catch (err) {
                console.error("Error fetching data ", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPatient();
    }, []);


    return(
        loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '85vh' }}>
                <CircularProgress />
            </Box>
        ) : (
            <Box sx={{margin: '3vw 3vw', display: 'flex', flexDirection: 'column', gap: '2vh'}}>
                {/* Título da página */}
                <Typography variant="h4" sx={{ fontFamily: 'var(--font-sub)', color: 'var(--color-blue-4)' }}>
                    Relatório Avaliação Modelo Denver
                </Typography>
                {/* Informações do paciente e botão para exibir os relatorios por meses */}
                <Box sx={{display:'flex', justifyContent:'space-between', flexDirection:'row', alignItems:'center', mt:'1vh'}}>
                    <PatientData name={patient.children.name} birthday={patient.children.dateBirth} />
                    <ReportBtn name="Gerar Relatório" path={`/painel-psi/checklist/relatorio/`} /> {/* Concertar o path */}
                </Box>

                <Box>
                    <Typography sx={{ fontFamily: 'var(--font-sub)', color: 'var(--color-blue-4)', fontWeight:'500'}}>
                        HISTÓRICO
                    </Typography>
                    {/* Fomulário */}
                    <ReportForm/>
                    {/* Botão já existe, procurar */}
                </Box>
            </Box>
        )
    );
}

export default RelatoriDetalhado;