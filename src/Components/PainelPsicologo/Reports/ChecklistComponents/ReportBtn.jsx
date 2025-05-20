import { Button, useMediaQuery, useTheme } from '@mui/material';
import ReportBtnIcons from './ReportBtnIcons';
import { useNavigate } from 'react-router-dom';
import styles from './ReportBtn.module.css';
import PropTypes from 'prop-types';

function getReportBtnIcon(name) {
    return ReportBtnIcons[name];
}

function ReportBtn({ name, path }) {

    const navigate = useNavigate();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClick = () => {
        navigate(path);
    };

    return(
        <Button 
            variant="contained" 
            disableElevation 
            onClick={handleClick} 
            className={styles.button}
            startIcon={isSmallScreen ? null : getReportBtnIcon(name)}
        >
            {name}
        </Button>
    );
}
ReportBtn.propTypes = {
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
};

export default ReportBtn;