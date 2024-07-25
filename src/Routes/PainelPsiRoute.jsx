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
                <Header className={styles.noBackground}/>
                { isPsi ? (
                    <Routes>
                        <Route path="/" element={<Navigate to="/painel-psi/home" />} />
                        <Route path="home" element={<HomePsi />} />
                        <Route path="pacientes" element={<DialogConfirmation />} />
                        <Route path="relatorios" element={<DialogConfirmation />} />
                        <Route path="agenda" element={<DialogConfirmation />} />
                        <Route path="instrumentos" element={<DialogConfirmation />} />
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
