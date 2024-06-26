/* eslint-disable react/prop-types */

import { useEffect, useRef, useState } from 'react';
import { Box, Grid, TextField, styled } from '@mui/material';

import { useVFormContext } from '.';

export const StylizedTextField = styled(TextField)({
    '& label': {
        color: 'var(--color-gray-4)',
    },
    "& .MuiOutlinedInput-root": {
        height: 50,
        "& ::placeholder": {
            fontStyle: 'italic'
        },
        "& fieldset": {
            borderRadius: "15px",
            borderColor: 'var(--color-gray-4)',
            borderWidth: "2px",
        },
        "&:hover fieldset": {
            borderColor: "var(--color-blue-3)",
        },
        "&.Mui-focused fieldset": {
            borderColor: "var(--color-blue-3)",
            borderWidth: "3px",
            borderRadius: "15px",
            pointerEvents: "none",
        },
        "& .MuiOutlinedInput-input": {
            color: 'var(--color-gray-4)',
            fontFamily: "var(--font-text)",
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
                        color: value ? "var(--color-blue-3)" : 'var(--color-gray-4)',
                    },
                    "& .MuiOutlinedInput-root fieldset": {
                        borderColor: value ? "var(--color-blue-3)" : 'var(--color-gray-4)',
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