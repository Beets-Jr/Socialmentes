import { useEffect, useState } from 'react';
import { Box, TextField } from '@mui/material';
import { useField } from '@unform/core';

export const VTextField = ({ name, label, label_icon, onChange, onKeyDown, ...rest }) => {

    const { fieldName, registerField, defaultValue, error, clearError } = useField(name);

    const [value, setValue] = useState(defaultValue || '');

    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => value,
            setValue: (ref, newValue) => setValue(newValue)
        });
    }, [registerField, fieldName, value]);

    return (
        <TextField
            {...rest}
            error={!!error}
            helperText={error}
            defaultValue={defaultValue}
            value={value}
            onChange={e => {
                setValue(e.target.value);
                onChange?.(e);
            }}
            onKeyDown={(e) => {
                error && clearError();
                onKeyDown?.(e);
            }}
            label={
                <Box display='flex' gap={.5} pt={.3}>
                    {label_icon}
                    {label}
                </Box>
            }
            InputLabelProps={{ shrink: true }}
            sx={{
                '& label': {
                    color: value ? "#5095d5" : "#727272",
                },
                "& .MuiOutlinedInput-root": {
                    height: 50,
                    "& ::placeholder": {
                        fontStyle: 'italic'
                    },
                    "& fieldset": {
                        borderRadius: "15px",
                        borderColor: value ? "#5095d5" : "#727272",
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
            }}
        />
    );

};