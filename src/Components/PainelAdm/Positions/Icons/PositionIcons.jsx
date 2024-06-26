import WorkIcon from '@mui/icons-material/Work';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import GroupIcon from '@mui/icons-material/Group';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const positionIconStyle ={
    mr: 1,
    mb: 0.2,
    color: "var(--color-gray-3)",
    fontSize: 18
};


const PositionIcons = {
    "Paciente": <PersonOutlineIcon sx={positionIconStyle} />,
    "Responsável": <GroupIcon sx={positionIconStyle} />,
    "Administrador": <AdminPanelSettingsIcon sx={positionIconStyle} />,
    "Psicólogo": <WorkIcon sx={positionIconStyle} />
}

export default PositionIcons;