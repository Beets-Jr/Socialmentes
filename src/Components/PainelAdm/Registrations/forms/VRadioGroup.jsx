/* eslint-disable react/prop-types */

import { useEffect, useRef, useState } from 'react';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, SvgIcon } from '@mui/material';

import { useVFormContext } from './VForm';

const RadioButton = ({ checked }) => (
    <SvgIcon>
        <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fontSize="24px">
            <circle
                cx="50%"
                cy="50%"
                r="11px"
                stroke="var(--color-gray-4)"
                strokeWidth="2px"
                fill="none"
            />
            {checked && (
                <circle
                    cx="50%"
                    cy="50%"
                    r="7px"
                    fill="var(--color-blue-3)"
                />
            )}
        </svg>
    </SvgIcon>
);

export const VRadioGroup = ({ name, label, categories, onChange, onFocus, onBlur, fontSize, ...rest }) => {

    const { getFieldValue, setFieldValue, setFocusedField, setFocusedFieldData } = useVFormContext();

    const inputRef = useRef(null);
    const [value, setValue] = useState(getFieldValue(name) || '');

    useEffect(() => {
        setFieldValue(name, value);
    }, [value]);

    return (
        <FormControl>
            <FormLabel id={`${name}_label`}>{label}</FormLabel>
            <RadioGroup
                ref={inputRef}
                aria-labelledby={`${name}_label`}
                onChange={e => {
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
                name={name}
                value={value}
                {...rest}
            >
                {categories.map((category, index) => (
                    <FormControlLabel
                        componentsProps={{
                            typography: {
                                fontSize: fontSize
                            }
                        }}
                        control={<Radio
                            icon={<RadioButton />}
                            checkedIcon={<RadioButton checked />}
                        />}
                        key={index}
                        value={category.value}
                        label={category.label}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );

};