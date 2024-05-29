import { Route, Routes } from "react-router-dom";
import Registrations from "./Registrations/Registrations";
import Positions from "./Positions/Positions";
import DialogConfirmation from "../ElementsInterface/DialogConfirmation";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import { useContext } from "react";
import { AppContext } from "../../Contexts/AppContext";


function PainelAdm() {
    const {open} = useContext(AppContext);
    const width = open ? "80vw" : "95vw";

    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <div style={{ 
                display: "block",
                width: width
                }}>
                <Header />
                <Routes>
                    <Route path="/" element={<DialogConfirmation />} />
                    <Route path="pacientes" element={<DialogConfirmation />} />
                    <Route path="cargos" element={<Positions />} />
                    <Route path="cadastros" element={<Registrations />} />
                    <Route path="opcoes" element={<DialogConfirmation />} />
                </Routes>
            </div>
        </div>
    );
}

export default PainelAdm;
