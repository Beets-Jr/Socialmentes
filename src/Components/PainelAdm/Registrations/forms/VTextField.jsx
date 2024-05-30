import { useEffect, useRef, useState } from 'react';
import { Box, Grid, TextField, styled } from '@mui/material';

import { useVFormContext } from '.';

export const StylizedTextField = styled(TextField)({
    '& label': {
        color: "#727272",
    },
    "& .MuiOutlinedInput-root": {
        height: 50,
        "& ::placeholder": {
            fontStyle: 'italic'
        },
        "& fieldset": {
            borderRadius: "15px",
            borderColor: "#727272",
            borderWidth: "2px",
        },
        "&:hover fieldset": {
            borderColor: "#5095D5",
        },
        "&.Mui-focused fieldset": {
            borderColor: "#5095d5",
            borderWidth: "3px",
            borderRadius: "15px",
            pointerEvents: "none",
        },
        "& .MuiOutlinedInput-input": {
            color: "#727272",
            fontFamily: "Fira Sans",
            fontSize: "16px",
        },
    }
});

export const VTextField = ({ xs = 12, name, label, label_icon, onChange, onFocus, onBlur, ...rest }) => {

    const { getFieldValue, setFieldValue, setFocusedField, setFocusedFieldData } = useVFormContext();

    const inputRef = useRef(null);
    const [value, setValue] = useState(getFieldValue(name) || '');

    useEffect(() => {
        setFieldValue(name, value);
    }, [value]);

    return (
        <Grid item xs={xs}>
            <StylizedTextField
                ref={inputRef}
                sx={{
                    '& label': {
                        color: value ? "#5095d5" : "#727272",
                    },
                    "& .MuiOutlinedInput-root fieldset": {
                        borderColor: value ? "#5095d5" : "#727272",
                    }
                }}
                label={
                    <Box display='flex' gap={.5} pt={.3}>
                        {label_icon}
                        {label}
                    </Box>
                }
                InputLabelProps={{
                    shrink: true
                }}
                onChange={ (e) => {
                    setValue(e.target.value);
                    setFocusedFieldData(e.target.value);
                    onChange?.(e);
                }}
                onFocus={(e) => {
                    setFocusedField(name);
                    onFocus?.(e);
                }}
                onBlur={(e) => {
                    setFocusedField('');
                    onBlur?.(e);
                }}
                variant='outlined'
                value={value}
                fullWidth
                {...rest}
            />
        </Grid>
    );

};