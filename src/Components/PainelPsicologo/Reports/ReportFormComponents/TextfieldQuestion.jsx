import React, { useState } from 'react';
import { FormControl, FormLabel, OutlinedInput } from '@mui/material';
import { useController } from 'react-hook-form';

function TextfieldQuestion({ label, name, control, type = 'text', required = false }) {
    const {
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
    } = useController({
        name,
        control,
        rules: { required },
        defaultValue: '',
    });

    return (
        <FormControl variant="outlined" fullWidth error={!!error}>
            <FormLabel
                htmlFor={name}
                sx={{
                    fontFamily: 'var(--font-sub)',
                    color: error ? 'red' : 'var(--color-gray-4)', // Cor padrão para o label
                    '&.Mui-focused': {
                        color: 'var(--color-blue-3)', // Cor quando focado
                    },
                    '&.Mui-error': {
                        color: 'red', // Cor quando há erro
                    },
                }}
            >
                {label}
            </FormLabel>
            <OutlinedInput
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                inputRef={ref}
                required={required}
                fullWidth
                sx={{
                    marginTop: '8px',
                    color: 'var(--color-gray-3)',
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: error ? 'red' : 'var(--color-gray-4)', // Cor padrão
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'var(--color-blue-3)', // Cor quando focado
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'var(--color-blue-3)', // Cor ao passar o mouse
                    },
                    borderRadius: '12px',
                }}
            />
            {error && <p style={{ color: 'red' }}>{error.message}</p>}
        </FormControl>
    );
}

export default TextfieldQuestion;
