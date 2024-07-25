import { Box, Typography, Radio, RadioGroup, FormControlLabel, FormControl } from "@mui/material";

import styles from "./ChecklistItem.module.css";

function ChecklistItem({ index, hability, description, level}) {

    return (
        <Box className={styles.container}>
            <Box className={styles.question}> 
                <Typography variant="body1" className={styles.title}>
                    {`${index} - ${hability}`}
                </Typography>
                <Typography variant="body2" className={styles.subtitle}>
                    {description}
                </Typography>
            </Box>
            <FormControl className={styles.radioGroupContainer}>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={level}
                    className={styles.selectedLevel}
                >
                    <FormControlLabel value="Adquirido" control={<Radio sx={{pointerEvents: 'none', '&:hover': {backgroundColor: 'transparent',}, '&.Mui-checked': {color: 'var(--color-blue-3)',}, '&.MuiSvgIcon-root': { borderColor: 'var(--color-gray-3)', },'& .MuiSvgIcon-root': {'& circle': { fill: 'var(--color-gray-3)', },},}}/>} label="Adquirido" className={styles.level}/>
                    <FormControlLabel value="Parcialmente" control={<Radio sx={{pointerEvents: 'none', '&:hover': {backgroundColor: 'transparent',}, '&.Mui-checked': {color: 'var(--color-blue-3)',}, '&.MuiSvgIcon-root': { borderColor: 'var(--color-gray-3)', },'& .MuiSvgIcon-root': {'& circle': { fill: 'var(--color-gray-3)', },},}}/>} label="Parcialmente" className={styles.level}/>
                    <FormControlLabel value="Não adquirido" control={<Radio sx={{pointerEvents: 'none', '&:hover': {backgroundColor: 'transparent',}, '&.Mui-checked': {color: 'var(--color-blue-3)',}, '&.MuiSvgIcon-root': { borderColor: 'var(--color-gray-3)', },'& .MuiSvgIcon-root': {'& circle': { fill: 'var(--color-gray-3)', },},}}/>} label="Não adquirido" className={styles.level}/>
                    <FormControlLabel value="Sem oportunidade" control={<Radio sx={{pointerEvents: 'none', '&:hover': {backgroundColor: 'transparent',}, '&.Mui-checked': {color: 'var(--color-blue-3)',}, '&.MuiSvgIcon-root': { borderColor: 'var(--color-gray-3)', },'& .MuiSvgIcon-root': {'& circle': { fill: 'var(--color-gray-3)', },},}}/>} label="Sem oportunidade" className={styles.level}/>
                </RadioGroup>
            </FormControl>
        </Box>
    )
}

export default ChecklistItem