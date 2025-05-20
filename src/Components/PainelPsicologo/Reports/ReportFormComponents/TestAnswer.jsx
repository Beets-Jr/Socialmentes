import { Box, Typography, Radio, RadioGroup, FormControlLabel, FormControl, Divider } from "@mui/material";
import styles from '../ChecklistComponents/ChecklistItem.module.css'


function testAnswer({ index, hability, level }) {
    return (
        <>
            <Box sx={{display:'flex', gap:'5px', justifyContent:'space-between', alignItems:'center'}}>
                <Typography variant="body1" sx={{fontFamily: 'var(--font-sub)', 
                        color: 'var(--color-gray-5)', fontWeight:'500', flex:'0 0 65%'}}>
                    {`${index} - ${hability}`}
                </Typography>

                <FormControl sx={{flex:'0 0 35%'}}>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={level}
                        className={styles.selectedLevel}
                    >
                        <FormControlLabel value='3' control={<Radio sx={{pointerEvents: 'none', '&:hover': {backgroundColor: 'transparent',}, '&.Mui-checked': {color: 'var(--color-blue-3)',}, '&.MuiSvgIcon-root': { borderColor: 'var(--color-gray-3)', },'& .MuiSvgIcon-root': {'& circle': { fill: 'var(--color-gray-3)', },},}}/>} label="Adquirido" className={styles.level}/>
                        <FormControlLabel value='2' control={<Radio sx={{pointerEvents: 'none', '&:hover': {backgroundColor: 'transparent',}, '&.Mui-checked': {color: 'var(--color-blue-3)',}, '&.MuiSvgIcon-root': { borderColor: 'var(--color-gray-3)', },'& .MuiSvgIcon-root': {'& circle': { fill: 'var(--color-gray-3)', },},}}/>} label="Parcialmente" className={styles.level}/>
                        <FormControlLabel value='0' control={<Radio sx={{pointerEvents: 'none', '&:hover': {backgroundColor: 'transparent',}, '&.Mui-checked': {color: 'var(--color-blue-3)',}, '&.MuiSvgIcon-root': { borderColor: 'var(--color-gray-3)', },'& .MuiSvgIcon-root': {'& circle': { fill: 'var(--color-gray-3)', },},}}/>} label="Não adquirido" className={styles.level}/>
                    </RadioGroup>
                </FormControl>
            </Box>
            {/* Divider entre as questões */}
            <Divider sx={{ background: 'var(--color-gray-5)', height: '1px', marginY: 1, }} />
        </>

    );
}

export default testAnswer;