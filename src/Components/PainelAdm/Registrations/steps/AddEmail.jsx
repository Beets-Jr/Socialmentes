/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { Box, Button, Grid, IconButton } from "@mui/material";
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
        const emailsNew = emails.filter( (_, i) => i !== index);
        setEmails(emailsNew);
    }

    // 'var(--color-blue-3)' : 'var(--color-gray-4)',

    const field_props = (index) => {
        const value = emails[index];
        return {
            sx: {
                '& label': {
                    color: value ? 'var(--color-blue-3)' : 'var(--color-gray-4)',
                },
                "& .MuiOutlinedInput-root fieldset": {
                    borderColor: value ? 'var(--color-blue-3)' : 'var(--color-gray-4)',
                }
            },
            label: (
                <Box display='flex' gap={.5} pt={.3}>
                    <IconEmail
                        fontSize='inherit'
                        color={(value || index === focusedIndex) ? 'var(--color-blue-3)' : 'var(--color-gray-4'}
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
            { emails.slice(1).map( (_, index) => (
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
                        color: 'var(--color-blue-4)'
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