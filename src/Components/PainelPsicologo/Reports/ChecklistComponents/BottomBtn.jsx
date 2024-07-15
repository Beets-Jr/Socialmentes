import { Paper, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import styles from './ReportBtn.module.css';

function BottomBtn() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    };


    return(
    <Paper 
        sx={{ 
            position: 'fixed', 
            bottom: 0, left: 0, right: 0, 
            display:'flex', 
            justifyContent:'flex-end', 
            //backgroundColor: 'transparent'
            paddingRight: '2.5vw',
            //alignItems: { xs: 'center', sm: 'flex-end' },
            flexDirection: { xs: 'column', sm: 'row' },
            paddingLeft:'15%'
            }} 
        elevation={3}
        >
        <Button 
            variant="contained" 
            disableElevation 
            onClick={handleClick} 
            className={styles.button}
            sx={{padding: '3px 25px'}}
        >
            Acompanhar Intervenção
        </Button>
        <Button 
            variant="contained" 
            disableElevation 
            onClick={handleClick} 
            className={styles.button}
            sx={{padding: '3px 50px'}}
        >
            Criar Intervenção
        </Button>
    </Paper> 
    );
}   

export default BottomBtn;