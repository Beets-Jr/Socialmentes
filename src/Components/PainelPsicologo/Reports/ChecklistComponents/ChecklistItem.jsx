import { Box, Typography, Radio, RadioGroup, FormControlLabel, FormControl } from "@mui/material";

import styles from "./ChecklistItem.module.css";

function ChecklistItem({ index, hability, description, level}) {

    return (
        <>
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
                        <FormControlLabel value="Adquirido" control={<Radio sx={{'&:hover': {backgroundColor: 'transparent',}, '&.Mui-checked': {color: 'var(--color-blue-3)',}, '&.MuiSvgIcon-root': { borderColor: 'var(--color-gray-3)', },'& .MuiSvgIcon-root': {'& circle': { fill: 'var(--color-gray-3)', },},}}/>} label="Adquirido" className={styles.level}/>
                        <FormControlLabel value="Parcialmente" control={<Radio />} label="Parcialmente" className={styles.level}/>
                        <FormControlLabel value="Não Adquirido" control={<Radio />} label="Não Adquirido" className={styles.level}/>
                        <FormControlLabel value="Sem oportunidade" control={<Radio />} label="Sem oportunidade" className={styles.level}/>
                    </RadioGroup>
                </FormControl>
            </Box>
        </>
    )
}

export default ChecklistItem