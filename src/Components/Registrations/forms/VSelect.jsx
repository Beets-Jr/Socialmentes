import { useEffect, useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { useField } from '@unform/core';

export const VSelect = ({ name, fullWidth, label, label_icon, placeholder, items, ...rest }) => {

    const { fieldName, registerField, defaultValue, error, clearError } = useField(name);

    const [value, setValue] = useState(defaultValue || '');
    const [labelItem, setLabelIem] = useState(defaultValue || '');

    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => value,
            setValue: (ref, newValue) => setValue(newValue)
        });
    }, [registerField, fieldName, value]);

    return (
        <FormControl fullWidth={fullWidth}>
            <InputLabel shrink id={fieldName}>
                <Box display='flex' gap={.5} pt={.3}>
                    {label_icon}
                    {label}
                </Box>
            </InputLabel>
            <Select
                displayEmpty
                labelId={fieldName}
                value={value}
                onChange={e => {
                    setValue(e.target.value);
                    setLabelIem( items.filter( item => item.value === e.target.value )[0].label );
                    rest.onChange?.(e);
                }}
                onKeyDown={(e) => {
                    error && clearError();
                    rest.onKeyDown?.(e);
                }}
                renderValue={ (selected) => {
                    if (!selected) {
                        return <Typography sx={{ fontStyle: 'italic', fontSize: '.9em' }}>{placeholder}</Typography>;
                    } else {
                        return labelItem;
                    }
                }}
                label={
                    <Box display='flex' gap={.5} pt={.3}>
                        {label_icon}
                        {label}
                    </Box>
                }
                notched
            >
                <MenuItem disabled value=''></MenuItem>
                {items.map( (item, index) => (
                    <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );

};