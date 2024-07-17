import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppContext } from "../Contexts/AppContext";
import { useAuth } from "../Contexts/AuthContext";
import DialogConfirmation from "../Components/ElementsInterface/DialogConfirmation";
import PermissionDeniedMessage from "../Components/ElementsInterface/PermissionDeniedMessage";
import Sidebar from "../Components/PainelAdm/Sidebar/Sidebar";
import Header from "../Components/PainelAdm/Header/Header";
import Registrations from "../Screens/PainelAdm/Registrations/Registrations";
import Positions from "../Screens/PainelAdm/Positions/Positions";
import styles from "./PainelAdm.module.css";

function PainelAdm() {
    const { open } = useContext(AppContext);
    const width = open ? "80vw" : "95vw";
    const { user } = useAuth();

    // Verifica se user existe e se a propriedade position existe antes de acessá-la
    const isAdmin = user && user.position && user.position === "Administrador";

    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <div className={styles.background} style={{ display: "block", width: width }}>
                <Header className={styles.noBackground}/>
                {isAdmin ? (
                    <Routes>
                        <Route path="/" element={<Navigate to="/painel-adm/pacientes" />} />
                        <Route path="pacientes" element={<DialogConfirmation />} />
                        <Route path="cargos" element={<Positions />} />
                        <Route path="cadastros" element={<Registrations />} />
                        <Route path="opcoes" element={<DialogConfirmation />} />
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


export default PainelAdm;