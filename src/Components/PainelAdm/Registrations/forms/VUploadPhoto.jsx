/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { Avatar, Badge, Grid, Tooltip, styled } from "@mui/material";
import { AddPhotoAlternateRounded } from "@mui/icons-material";

import avatar_empty from "../assets/avatar.svg";
import { useVFormContext } from "./VForm";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export const VUploadPhoto = ({ name, xs = 12, onChange, onFocus, onBlur }) => {

    const { getFieldValue, setFieldValue, setFocusedField, setFocusedFieldData } = useVFormContext();

    const [value, setValue] = useState(getFieldValue(name) || '');
    const [photoUrl, setPhotoUrl] = useState(value ? URL.createObjectURL(value) : undefined);

    useEffect(() => {
        setFieldValue(name, value);
    }, [value]);

    return (

        <Grid item xs={xs}>

            <Badge
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                }}
                sx={{
                    '& .MuiSvgIcon-root': {
                        transition: '.5s',
                        '&:hover': {
                            cursor: 'pointer',
                            boxShadow: `0 0 10px var(--color-blue-2)`
                        }
                    }
                }}
                badgeContent={
                    <>
                        <VisuallyHiddenInput
                            type='file'
                            accept="image/*"
                            id={name}
                            name={name}
                            onChange={ (e) => {
                                if (!e.target.files[0]) return;
                                setValue(e.target.files[0]);
                                setPhotoUrl(URL.createObjectURL(e.target.files[0]));
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
                        />
                        <Tooltip title='Adicionar foto' placement="right">
                            <AddPhotoAlternateRounded
                                sx={{
                                    width: 38,
                                    height: 38,
                                    padding: .8,
                                    marginRight: 2,
                                    marginBottom: 3,
                                    borderRadius: '50%',
                                    bgcolor: 'var(--color-gray-3)',
                                    border: '1px solid var(--color-gray-2)',
                                    color: 'white'
                                }}
                            />
                        </Tooltip>
                    </>
                }
                component="label"
                overlap="circular"
            >

                <Avatar
                    sx={{
                        width: 100, 
                        height: 100,
                        mb: 1,
                        boxShadow: `0 0 10px ${value ? 'var(--color-gray-3)' : 'var(--color-gray-2)'}`,
                        borderWidth: '2px',
                        borderStyle: 'solid',
                        borderColor: value ? 'var(--color-gray-3)' : 'var(--color-gray-2)',
                        transition: '.5s',
                        '&:hover': {
                            cursor: 'pointer'
                        }
                    }}
                    src={ photoUrl || avatar_empty }
                />

            </Badge>

        </Grid>

    );

};