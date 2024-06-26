/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react';
import { Autocomplete, Box, Grid, Typography } from '@mui/material';
import { ExpandMoreRounded } from '@mui/icons-material';

import { StylizedTextField, useVFormContext } from '.';

export const VSelect = ({ xs = 12, name, label, label_icon, placeholder, items, onChange, onFocus, onBlur }) => {

    const { getFieldValue, setFieldValue, setFocusedField, setFocusedFieldData } = useVFormContext();

    const [value, setValue] = useState(getFieldValue(name) || '');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setFieldValue(name, value);
    }, [value]);

    return (

        <Grid item xs={xs}>

            <Autocomplete
                renderInput={({ InputLabelProps, ...params }) => (
                    <StylizedTextField
                        sx={{
                            '& label': {
                                color: value ? "var(--color-blue-3)" : 'var(--color-gray-4)',
                            },
                            "& .MuiOutlinedInput-root fieldset": {
                                borderColor: value ? "var(--color-blue-3)" : 'var(--color-gray-4)'
                            },
                            "& .MuiOutlinedInput-root": {
                                "&.Mui-focused fieldset": {
                                    borderBottomLeftRadius: open && 0,
                                    borderBottomRightRadius: open && 0,
                                    borderBottom: open && 0,
                                    marginBottom: open && -5
                                }
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
                        placeholder={placeholder}
                        variant='outlined'
                        value={value}
                        fullWidth
                        {...params}
                    />
                )}
                ListboxProps={{
                    sx: {
                        maxHeight: 160,
                        border: '3px solid var(--color-blue-3)',
                        borderBottomLeftRadius: '15px',
                        borderBottomRightRadius: '15px',
                        borderTop: '0',
                        '& .MuiAutocomplete-option': {
                            padding: .3,
                            paddingLeft: 1,
                            '& p': {
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                            },
                            '&:hover p': {
                                color: 'var(--color-blue-3)'
                            }
                        },
                        '&::-webkit-scrollbar': {
                            width: '4px'
                        },
                        '&::-webkit-scrollbar-thumb': {
                            bgcolor: 'var(--color-blue-2)',
                            borderRadius: '10px',
                        }
                    }
                }}
                renderOption={(props, option) => (
                    <li {...props} key={option.value}>
                        <Typography>{option.label}</Typography>
                    </li>
                )}
                onChange={(event, newValue) => {
                    setValue(newValue.value);
                    setFocusedFieldData(newValue);
                    onChange?.(event, newValue);
                }}
                onFocus={(e) => {
                    setFocusedField(name);
                    onFocus?.(e);
                }}
                onBlur={(e) => {
                    setFocusedField('');
                    onBlur?.(e);
                }}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                popupIcon={<ExpandMoreRounded
                    sx={{
                        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                        color: (value || open) ? "var(--color-blue-3)" : 'var(--color-gray-4)',
                    }}
                />}
                open={open}
                options={items}
                disableClearable
            />

        </Grid>

    );

};