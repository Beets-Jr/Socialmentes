import { useEffect, useState } from 'react';
import { Box, TextField } from '@mui/material';
import { useField } from '@unform/core';

export const VTextField = ({ name, label, label_icon, ...rest }) => {
    
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
                rest.onChange?.(e);
            }}
            onKeyDown={(e) => {
                error && clearError();
                rest.onKeyDown?.(e);
            }}
            label={
                <Box display='flex' gap={.5} pt={.3}>
                  {label_icon}
                  {label}
                </Box>
            }
            InputLabelProps={{ shrink: true }}
        />
    );

};