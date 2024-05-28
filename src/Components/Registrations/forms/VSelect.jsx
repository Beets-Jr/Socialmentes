import { useEffect, useRef, useState } from 'react';
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { ExpandMoreRounded } from '@mui/icons-material';

import { useVFormContext } from '.';

export const VSelect = ({ xs = 12, name, label, label_icon, placeholder, items, onChange, onFocus, onBlur, ...rest }) => {

    const { getFieldValue, setFieldValue, setFocusedField, setFocusedFieldData } = useVFormContext();

    const inputRef = useRef(null);
    const [value, setValue] = useState(getFieldValue(name) || '');
    const [labelItem, setLabelIem] = useState('');

    useEffect(() => {
        setFieldValue(name, value);
    }, [value]);

    return (

        <Grid item xs={xs}>

            <FormControl fullWidth>

                <InputLabel shrink id={name}>
                    <Box display='flex' gap={.5} pt={.3} color={value && "#5095d5"}>
                        {label_icon}
                        {label}
                    </Box>
                </InputLabel>

                <Select
                    ref={inputRef}
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
                    label={
                        <Box display='flex' gap={.5} pt={.3} color={value && "#5095d5"}>
                            {label_icon}
                            {label}
                        </Box>
                    }
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                overflow: 'auto',
                                width: '150px',
                                maxHeight: 200,
                                mt: -1.8,
                                boxShadow: 'none',
                                border: '3px solid #5095d5',
                                borderBottomLeftRadius: '15px',
                                borderBottomRightRadius: '15px',
                                borderTop: '0',
                                '& .MuiMenuItem-root': {
                                    pl: 1.3,
                                    py: .3,
                                    '&:hover': {
                                        color: '#5095d5',
                                        backgroundColor: 'white'
                                    }
                                },
                                '&::-webkit-scrollbar': {
                                    width: '4px'
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    bgcolor: '#7DB9F0',
                                    borderRadius: '10px',
                                }
                            }
                        },
                    }}
                    renderValue={(selected) => {
                        if (!selected) {
                            return (
                                <Typography
                                    sx={{
                                        fontStyle: 'italic',
                                        color: "#ABABAB"
                                    }}
                                > {placeholder} </Typography>
                            );
                        } else {
                            return labelItem;
                        }
                    }}
                    onChange={e => {
                        setValue(e.target.value);
                        setLabelIem(items.filter(item => item.value === e.target.value)[0].label);
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
                    IconComponent={ExpandMoreRounded}
                    labelId={name}
                    value={value}
                    displayEmpty
                    notched
                    {...rest}
                >

                    <MenuItem disabled value=''></MenuItem>
                    {items.map((item, index) => (

                        <MenuItem
                            key={index}
                            value={item.value}
                        >
                            <Typography
                                sx={{
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                {item.label}
                            </Typography>
                        </MenuItem>

                    ))}

                </Select>

            </FormControl>

        </Grid>

    );

};