import { Typography, Box, Stack } from "@mui/material";
import ChecklistItem from "../../Components/PainelPsicologo/Reports/ChecklistComponents/ChecklistItem";
import ReportBtn from "../../Components/PainelPsicologo/Reports/ChecklistComponents/ReportBtn";
import PacientData from "../../Components/PainelPsicologo/Reports/ChecklistComponents/PatientData"
import styles from "./Checklist.module.css";
import denver from "../../Database/denver.json";
import BottomBtn from "../../Components/PainelPsicologo/Reports/ChecklistComponents/BottomBtn";

function Checklist({name, birthday}) {
    return(
        <div className={styles.checklistContainer} style={{position:'relative'}}>
            <Typography variant="h4" className={styles.checklistTitle}>
                Checklist Currículo Modelo de Intervenção Precoce Finalizado
                (Somente Leitura)
            </Typography>
            
            <Box className={styles.menuContainer}>
                <PacientData name={name} birthday={birthday}/>
                <Stack direction="row" spacing={2}>
                    <ReportBtn name="Gráfico" path="/grafico"/> {/*Colocar o path certo*/}
                    <ReportBtn name="Tabela" path="/tabela" />
                    <ReportBtn name="Relatório" path="/relatorio" />
                </Stack>
            </Box>
            <Box>
                {
                    denver.map((nivel) => (
                        <Box key={nivel.nivel}>
                            {
                                nivel.categorias.map((categoria) => (
                                    <Box key={categoria.id}>
                                        <Typography variant="h5" className={styles.checklistTitle}>
                                            {categoria.nome} - Nível {nivel.nivel}
                                            {
                                                categoria.perguntas.map((p) => (
                                                    <ChecklistItem
                                                        key={p.id}
                                                        index={p.id + 1}
                                                        hability= {p.pergunta}
                                                        description={p.descricao}
                                                        level="Adquirido" // puxar do BD
                                                    />
                                                ))
                                            }
                                        </Typography>
                                    </Box>
                                ))
                            }
                        </Box>
                    ))
                }
            </Box>
            <BottomBtn/>
        </div>
    );
}

export default Checklist;