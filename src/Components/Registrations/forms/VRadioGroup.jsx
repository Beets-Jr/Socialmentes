import { useEffect, useState } from 'react';
import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material';
import { useField } from '@unform/core';

const RadioButton = ({ checked }) => (
    <svg
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        fontSize="24px">
        <circle
            cx="50%"
            cy="50%"
            r="11px"
            stroke="#727272"
            strokeWidth="2px"
            fill="none"
        />
        {checked && (
            <circle
                cx="50%"
                cy="50%"
                r="7px"
                fill="#5095D5"
            />
        )}
    </svg>
);

export const VRadioGroup = ({ name, label, categories, onChange, onKeyDown, fontSize, ...rest }) => {

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
                onChange={e => {
                    setValue(e.target.value);
                    onChange?.(e);
                }}
                onKeyDown={e => {
                    error && clearError();
                    onKeyDown?.(e);
                }}
                name={fieldName}
                {...rest}
            >
                {categories.map((category, index) => (
                    <FormControlLabel
                        componentsProps={{
                            typography: {
                                fontSize: fontSize
                            }
                        }}
                        key={index}
                        control={<Radio
                            icon={<RadioButton />}
                            checkedIcon={<RadioButton checked />}
                        />}
                        value={category.value}
                        label={category.label}
                    />
                ))}
            </RadioGroup>
            <FormHelperText>{error}</FormHelperText>
        </FormControl>
    );

};