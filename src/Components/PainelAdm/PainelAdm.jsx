import { Route, Routes } from "react-router-dom";
import Registrations from "./Registrations/Registrations";
import Positions from "./Positions/Positions";
import DialogConfirmation from "../ElementsInterface/DialogConfirmation";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import { useContext } from "react";
import { AppContext } from "../../Contexts/AppContext";
import { useAuth } from "../Login/AuthContext";
import { Box, Typography } from "@mui/material";

const PermissionDeniedMessage = () => ( //provisório
    <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '85vh',
            width: '100%',
        }}
    >
        <Typography sx={{ fontFamily: 'var(--font-text)', color: 'var(--color-gray-3)' }}>
            Você não tem permissão para acessar essa página
        </Typography>
    </Box>
);

function PainelAdm() {
    const { open } = useContext(AppContext);
    const width = open ? "80vw" : "95vw";
    const { user } = useAuth();

    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <div style={{ display: "block", width: width }}>
                <Header />
                {user.position === "Administrador" ? (
                    <Routes>
                        <Route path="/" element={<DialogConfirmation />} />
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
