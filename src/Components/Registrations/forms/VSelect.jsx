import { useEffect, useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { useField } from '@unform/core';
import { ExpandMoreRounded } from '@mui/icons-material';

export const VSelect = ({ name, fullWidth, label, label_icon, placeholder, items, onChange, ...rest }) => {

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
                <Box display='flex' gap={.5} pt={.3} color={value && "#5095d5"}>
                    {label_icon}
                    {label}
                </Box>
            </InputLabel>
            <Select
                {...rest}
                displayEmpty
                labelId={fieldName}
                value={value}
                onChange={e => {
                    setValue(e.target.value);
                    setLabelIem(items.filter(item => item.value === e.target.value)[0].label);
                    onChange?.(e);
                }}
                renderValue={(selected) => {
                    if (!selected) {
                        return <Typography sx={{ fontStyle: 'italic', color: "#ABABAB" }}>{placeholder}</Typography>;
                    } else {
                        return labelItem;
                    }
                }}
                label={
                    <Box display='flex' gap={.5} pt={.3} color={value && "#5095d5"}>
                        {label_icon}
                        {label}
                    </Box>
                }
                sx={{
                    '& .MuiSelect-select': {
                        color: "#727272",
                        padding: 1.63
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderRadius: "15px",
                        borderColor: value ? "#5095d5" : "#727272",
                        borderWidth: "2px"
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: "#5095d5",
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: "#5095d5",
                        borderWidth: "3px"
                    },
                    '& .MuiSelect-icon': {
                        color: value ? "#5095d5" : "#727272"
                    },
                    '& .MuiSelect-iconOpen': {
                        color: "#5095d5",
                        transform: 'rotate(0deg)'
                    }
                }}
                IconComponent={ExpandMoreRounded}
                MenuProps={{
                    PaperProps: {
                        sx: {
                            width: '150px',
                            mt: -1.8,
                            boxShadow: 'none',
                            border: '3px solid #5095d5',
                            borderBottomLeftRadius: '15px',
                            borderBottomRightRadius: '15px',
                            borderTop: '0',
                            color: 'blue', // Cor do texto do menu
                            '& .MuiMenuItem-root': {
                                pl: 1.3,
                                py: .3,
                                '&:hover': {
                                    color: '#5095d5',
                                    backgroundColor: 'white'
                                },
                            }
                        },
                    },
                }}
                notched
            >
                <MenuItem disabled value=''></MenuItem>
                {items.map((item, index) => (
                    <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );

};