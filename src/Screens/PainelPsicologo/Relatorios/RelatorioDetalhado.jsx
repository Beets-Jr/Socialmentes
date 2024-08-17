import { Box, CircularProgress, Typography } from "@mui/material";
import { useState } from "react";
import ReportBtn from "../../../Components/PainelPsicologo/Reports/ChecklistComponents/ReportBtn";
import PatientData from "../../../Components/PainelPsicologo/Reports/ChecklistComponents/PatientData";

function RelatoriDetalhado() {
    const [loading, setLoading] = useState(false);

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
                    <PatientData name='Fubango' birthday='10/10/2010' />
                    <ReportBtn name="Gerar Relatório" path={`/painel-psi/checklist/relatorio/`} /> {/* Concertar o path */}
                </Box>
            </Box>
        )
    );
}

export default RelatoriDetalhado;