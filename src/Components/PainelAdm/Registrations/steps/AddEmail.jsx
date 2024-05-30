import { useEffect, useState } from "react";
import { Box, Button, Grid, IconButton, useTheme } from "@mui/material";
import { AddCircleOutlineRounded, RemoveCircleOutlineRounded } from "@mui/icons-material";

import { IconEmail } from "../assets/icons";
import { StylizedTextField, VFormContent, VRow, VUploadPhoto } from "../forms";

export const AddEmail = ({ disabledForm, setDisabledButton, emails, setEmails }) => {

    const [focusedIndex, setFocusedIndex] = useState();

    useEffect(() => {
        if (emails[0]) {
            setDisabledButton(false);
        } else {
            setDisabledButton(true);
        }
    }, [emails])

    const setEmail = (index, value) => {
        const emailsNew = emails.map( (email, i) => {
            if (i === index) {
                return value;
            } else {
                return email;
            }
        })
        if (index === emailsNew.length) {
            emailsNew.push(value);
        }
        setEmails(emailsNew);
    }

    const removeEmail = (index) => {
        const emailsNew = emails.filter( (email, i) => i !== index);
        setEmails(emailsNew);
    }

    const theme = useTheme();
    const darkGray = theme.palette.secondary.dark;
    const blue = theme.palette.primary.main;

    const field_props = (index) => {
        const value = emails[index];
        return {
            sx: {
                '& label': {
                    color: value ? "#5095d5" : "#727272",
                },
                "& .MuiOutlinedInput-root fieldset": {
                    borderColor: value ? "#5095d5" : "#727272",
                }
            },
            label: (
                <Box display='flex' gap={.5} pt={.3}>
                    <IconEmail
                        fontSize='inherit'
                        color={(value || index === focusedIndex) ? blue : darkGray}
                        sx={{ mt: .3 }}
                    />
                    {`email ${index+1}`}
                </Box>
            ),
            InputLabelProps: {
                shrink: true
            },
            onChange: (e) => {
                setEmail(index, e.target.value);
            },
            onFocus: () => {
                setFocusedIndex(index);
            },
            onBlur: () => {
                setFocusedIndex();
            },
            variant: 'outlined',
            value: value,
            fullWidth: true
        }
    }

    return (
        <VFormContent>
            <VRow unique>
                <VUploadPhoto
                    name='photo'
                    disabled={disabledForm}
                />
            </VRow>
            <VRow unique>
                <StylizedTextField
                    {...field_props(0)}
                />
            </VRow>
            { emails.slice(1).map( (email, index) => (
                <VRow key={index+1}>
                    <Grid item xs={10}>
                        <StylizedTextField
                            {...field_props(index+1)}
                        />
                    </Grid>
                    <Grid item xs={1.7} display='flex' justifyContent='center' alignItems='center'>
                        <IconButton onClick={() => removeEmail(index+1)}>
                            <RemoveCircleOutlineRounded />
                        </IconButton>
                    </Grid>
                </VRow>
            ))}
            <VRow unique>
                <Button
                    sx={{
                        textTransform: 'none',
                        fontSize: 16,
                        color: '#3575B1'
                    }}
                    onClick={() => {
                        setEmail(emails.length, '');
                    }}
                    disabled={disabledForm || !emails[emails.length-1]}
                    size="small"
                >
                    <AddCircleOutlineRounded sx={{ mr: .5 }} />
                    Adicionar outro email
                </Button>
            </VRow>
        </VFormContent>
    );
}