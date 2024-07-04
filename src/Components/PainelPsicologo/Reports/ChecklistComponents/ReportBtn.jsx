import { Button } from '@mui/material';
import ReportBtnIcons from './ReportBtnIcons';
import { useNavigate } from 'react-router-dom';
import styles from './ReportBtn.module.css';

function getReportBtnIcon(name) {
    return ReportBtnIcons[name];
}

function ReportBtn({ name, path }) {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(path);
    };

    return(
        <Button 
            variant="contained" 
            disableElevation 
            onClick={handleClick} 
            className={styles.button}
            startIcon={getReportBtnIcon(name)}
        >
            {name}
        </Button>
    );
}

export default ReportBtn