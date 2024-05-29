import { useEffect, useState } from 'react';
import { Autocomplete, Box, Grid, TextField, Typography, styled } from '@mui/material';
import { ExpandMoreRounded } from '@mui/icons-material';

import { useVFormContext } from '.';

const StylizedTextField = styled(TextField)({
    '& label': {
        color: "#727272",
    },
    "& .MuiOutlinedInput-root": {
        height: 50,
        "& ::placeholder": {
            fontStyle: 'italic'
        },
        "& fieldset": {
            borderRadius: "15px",
            borderColor: "#727272",
            borderWidth: "2px",
        },
        "&:hover fieldset": {
            borderColor: "#5095D5",
        },
        "&.Mui-focused fieldset": {
            borderColor: "#5095d5",
            borderWidth: "3px",
            borderRadius: "15px",
            pointerEvents: "none"
        },
        "& .MuiOutlinedInput-input": {
            color: "#727272",
            fontFamily: "Fira Sans",
            fontSize: "16px",
        },
    }
});

export const VSelect = ({ xs = 12, name, label, label_icon, placeholder, items, onChange, onFocus, onBlur, ...rest }) => {

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
                                color: value ? "#5095d5" : "#727272",
                            },
                            "& .MuiOutlinedInput-root fieldset": {
                                borderColor: value ? "#5095d5" : "#727272"
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
                        border: '3px solid #5095d5',
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
                                color: '#5095d5'
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
                        color: (value || open) ? "#5095d5" : "#727272",
                    }}
                />}
                open={open}
                options={items}
                disableClearable
                blurOnSelect
            />

        </Grid>

    );

};