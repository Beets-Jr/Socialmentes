import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppContext } from "../Contexts/AppContext";
import { useAuth } from "../Contexts/AuthContext";
import DialogConfirmation from "../Components/ElementsInterface/DialogConfirmation";
import PermissionDeniedMessage from "../Components/ElementsInterface/PermissionDeniedMessage";
import Sidebar from "../Components/PainelAdm/Sidebar/Sidebar";
import Header from "../Components/PainelAdm/Header/Header";
import HomePsi from "../Screens/PainelPsicologo/HomePsi";
import styles from "./PainelAdm.module.css";
import PacientesInfo from "../Screens/PainelPsicologo/Pacientes/PacientesInfo";
import CreateTest from "../Screens/PainelPsicologo/Pacientes/CreateTest";
import PacientesCadastrados from "../Screens/PainelPsicologo/Pacientes/PacientesCadastrados";
import Checklist from "../Screens/PainelPsicologo/Checklist";
import Tests from "../Screens/PainelPsicologo/Tests";
import TestsGraphs from "../Screens/PainelAdm/Graphs/TestsGraphs";
import Tools from "../Screens/PainelPsicologo/Tools/Tools";
import Tabela from "../Screens/PainelPsicologo/Relatorios/Tabela";
import CriarIntervencao from "../Screens/PainelPsicologo/Relatorios/CriarIntervencao";
import RelatorioDetalhado from "../Screens/PainelPsicologo/Relatorios/RelatorioDetalhado";

function PainelPsi() {
    const { open } = useContext(AppContext);
    const width = open ? "80vw" : "95vw";
    const { user } = useAuth();

    // Verifica se user existe e se a propriedade position existe antes de acessá-la
    const isPsi = user && user.position && user.position === "Psicólogo";

    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <div className={styles.background} style={{ display: "block", width: width }}>
                <Header className={styles.noBackground} />
                {isPsi ? (
                    <Routes>
                        <Route path="/" element={<Navigate to="/painel-psi/home" />} />
                        <Route path="home" element={<HomePsi />} />
                        <Route path="pacientes" element={<PacientesCadastrados />} />
                        <Route path="pacientes/informacoes" element={<PacientesInfo />} />
                        <Route path="pacientes/informacoes/:id" element={<PacientesInfo />} />
                        <Route path="pacientes/teste/:testId" element={<CreateTest />} />
                        <Route path="relatorios" element={<Tests />} />
                        <Route path="agenda" element={<DialogConfirmation />} />
                        <Route path="checklist" element={<Checklist />}/>
                        <Route path="checklist/grafico/:testId" element={<TestsGraphs />}/>
                        <Route path="checklist/tabela/:testId" element={<Tabela />}/>
                        <Route path="checklist/relatorio/:testId" element={<RelatorioDetalhado />}/>
                        <Route path="checklist/relatorio/:testId" element={<PermissionDeniedMessage />}/>
                        <Route path="checklist/criar-intervencao" element={<CriarIntervencao />} />
                        <Route path="/instrumentos" element={<Tools />} />
                    </Routes>
                ) : (
                    <Routes>
                        <Route path="/*" element={<PermissionDeniedMessage />} />
                    </Routes>
                )}
            </div>
        </div>
    );
}


export default PainelPsi;
