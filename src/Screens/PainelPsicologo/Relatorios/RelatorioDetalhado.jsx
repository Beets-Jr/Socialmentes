import { Box, CircularProgress, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPatient } from "../../../Services/patientService";
import { getTestByIdTest } from "../../../Services/testsPatientsService";
import ReportBtn from "../../../Components/PainelPsicologo/Reports/ChecklistComponents/ReportBtn";
import PatientData from "../../../Components/PainelPsicologo/Reports/ChecklistComponents/PatientData";
import ReportForm from "../../../Components/PainelPsicologo/Reports/ReportForm";

function RelatorioDetalhado() {
    const { testId } = useParams();
    const query = new URLSearchParams(window.location.search);
    const id = query.get('testId');

    const [loading, setLoading] = useState(true);
    const [patient, setPatient] = useState();
    const [test, setTest] = useState(null);

    useEffect(() => {
        const fetchPatientAndTest = async () => {
            try {
                // Verifique se testId está definido
                if (!id) {
                    throw new Error('ID do teste não fornecido.');
                }

                const testData = await getTestByIdTest(id); // Recupera o teste
                setTest(testData);

                // Verifique se patientId está definido
                if (!testId) {
                    throw new Error('ID do paciente não fornecido.');
                }

                const patientData = await getPatient(testId); // Encontra o paciente
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

        fetchPatientAndTest();
    }, [testId, id]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '85vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!patient  || !test ) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '85vh' }}>
                <Typography variant="h6" color="error">Dados não encontrados</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ margin: '3vw 3vw', display: 'flex', flexDirection: 'column', gap: '2vh' }}>
            {/* Título da página */}
            <Typography variant="h4" sx={{ fontFamily: 'var(--font-sub)', color: 'var(--color-blue-4)' }}>
                Relatório Avaliação Modelo Denver
            </Typography>
            {/* Informações do paciente e botão para exibir os relatórios por meses */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', mt: '1vh' }}>
                <PatientData name={patient.children.name} birthday={patient.children.dateBirth} />
                <ReportBtn name="Gerar Relatório" path={`/painel-psi/checklist/relatorio/${patient.id}?testId=${testId}`} />
            </Box>

            <Box>
                {/* Formulário */}
                <ReportForm test={test}/>
                {/* Botão já existe, procurar */}
            </Box>
        </Box>
    );
}

export default RelatorioDetalhado;
