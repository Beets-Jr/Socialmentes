import { Box, Typography, Radio, RadioGroup, FormControlLabel, FormControl, Checkbox } from "@mui/material";

import styles from "./ChecklistItem.module.css";
import { memo } from "react";

const ChecklistItem = memo(({ index, hability, description, level, handleCheckChange, checkedQuestions, questionTitle }) => {
    const formattedName = `${index} - ${hability}`;

    return (
        <Box className={styles.container}>
            <Box className={styles.question}>
                <Typography variant="body1" className={styles.title}>
                    {formattedName}
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
                    {['Adquirido', 'Parcialmente', 'Não adquirido', 'Sem oportunidade'].map((option) => (
                        <FormControlLabel
                            key={option}
                            value={option}
                            control={<Radio sx={{ pointerEvents: 'none' }} />}
                            label={option}
                            className={styles.level}
                        />
                    ))}
                </RadioGroup>
            </FormControl>
            <FormControl>
                <Checkbox
                    checked={checkedQuestions.includes(`${questionTitle}#${formattedName}`)}
                    onChange={() => handleCheckChange(`${questionTitle}#${formattedName}`)}
                />
            </FormControl>
        </Box>
    );
});

export default ChecklistItem