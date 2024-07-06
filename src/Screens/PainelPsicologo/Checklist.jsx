import { Typography, Box, Stack, CircularProgress } from "@mui/material";
import ChecklistItem from "../../Components/PainelPsicologo/Reports/ChecklistComponents/ChecklistItem";
import ReportBtn from "../../Components/PainelPsicologo/Reports/ChecklistComponents/ReportBtn";
import PatientData from "../../Components/PainelPsicologo/Reports/ChecklistComponents/PatientData"
import styles from "./Checklist.module.css";
import denver from "../../Database/denver.json";
import BottomBtn from "../../Components/PainelPsicologo/Reports/ChecklistComponents/BottomBtn";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../Database/FirebaseConfig.mjs";
import { collection, getDocs } from "firebase/firestore"

function Checklist() {
    const location = useLocation();
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(null);

    const { test } = location.state;
      
    useEffect(() => {
        const fetchPatient = async() => {
            try {
                const querySnapshot = await getDocs(collection(db, 'patients'));
                const patientData = querySnapshot.docs
                    .map(doc => ({ id: doc.id, ...doc.data() }))
                    .find(doc => doc.id === test.patientId);

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
        )
    );
}

export default Checklist;