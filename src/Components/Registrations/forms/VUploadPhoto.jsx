import { useEffect, useState } from "react";
import { Avatar, Badge, CircularProgress, Grid, Tooltip, styled, useTheme } from "@mui/material";
import { AddPhotoAlternateRounded } from "@mui/icons-material";
import { useField } from "@unform/core"

import avatar_empty from "../assets/avatar.svg";

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

export const VUploadPhoto = ({ name, xs = 12, defaultValue, onChange }) => {

    const theme = useTheme();

    const {fieldName, registerField} = useField(name);

    const [photo, setPhoto] = useState(defaultValue || '');
    const [photoUrl, setPhotoUrl] = useState(defaultValue ? URL.createObjectURL(defaultValue) : undefined);

    useEffect( () => {
        registerField({
            name: fieldName,
            getValue: () => photo,
            setValue: (ref, newValue) => setPhoto(newValue)
        });
    }, [fieldName, registerField, photo]);

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
                            boxShadow: `0 0 10px ${theme.palette.primary.light}`
                        }
                    }
                }}
                badgeContent={
                    <>
                        <VisuallyHiddenInput
                            type='file'
                            accept="image/*"
                            id={fieldName}
                            name={fieldName}
                            onChange={ (e) => {
                                if (!e.target.files[0]) return;
                                setPhoto(e.target.files[0]);
                                setPhotoUrl(URL.createObjectURL(e.target.files[0]));
                                onChange?.(e);
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
                                    bgcolor: theme.palette.secondary.main,
                                    border: '1px solid #D7D7D7',
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
                        boxShadow: `0 0 10px ${photo ? '#A5A5A5' : '#D7D7D7'}`,
                        borderWidth: "2px",
                        borderStyle: 'solid',
                        borderColor: photo ? "#ABABAB" : "#D7D7D7",
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