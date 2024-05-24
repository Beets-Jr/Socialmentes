import { useEffect, useState } from 'react';
import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material';
import { useField } from '@unform/core';

export const VRadioGroup = ({ name, label, categories, onChange, onKeyDown, ...rest }) => {
    
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
        <FormControl error={!!error} >
            <FormLabel id={`${fieldName}_label`}>{label}</FormLabel>
            <RadioGroup
                aria-labelledby={`${fieldName}_label`}
                value={value}
                onChange={ e => {
                    setValue(e.target.value);
                    onChange?.(e);
                }}
                onKeyDown={ e => {
                    error && clearError();
                    onKeyDown?.(e);
                }}
                name={fieldName}
                {...rest}
            >
                { categories.map( (category, index) => (
                    <FormControlLabel
                        key={index}
                        control={<Radio />}
                        value={category.value}
                        label={category.label}
                    />
                ))}
            </RadioGroup>
            <FormHelperText>{error}</FormHelperText>
        </FormControl>
    );

};