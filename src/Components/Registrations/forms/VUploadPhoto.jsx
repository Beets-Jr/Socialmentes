import { useEffect, useState } from "react";
import { Avatar, Badge, Tooltip, styled, useTheme } from "@mui/material";
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

export const VUploadPhoto = ({ name, onChange }) => {

    const theme = useTheme();

    const {fieldName, registerField} = useField(name);
    const [photo, setPhoto] = useState(undefined || '');
    const [photoUrl, setPhotoUrl] = useState(undefined);

    useEffect( () => {
        registerField({
            name: fieldName,
            getValue: () => photo,
            setValue: (ref, newValue) => setPhoto(newValue)
        });
    }, [fieldName, registerField, photo]);

    return (
        <Badge
            component="label"
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
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
                                marginRight: 1,
                                marginBottom: 1,
                                borderRadius: '50%',
                                bgcolor: theme.palette.secondary.main,
                                border: '1px solid #D7D7D7',
                                color: 'white'
                            }}
                        />
                    </Tooltip>
                </>
            }
            sx={{
                '& .MuiSvgIcon-root': {
                    transition: 'background-color .5s',
                    '&:hover': {
                        cursor: 'pointer',
                        bgcolor: theme.palette.primary.light,
                        borderColor: theme.palette.primary.light
                    }
                }
            }}
        >
            <Avatar
                sx={{
                    width: 100, 
                    height: 100,
                    border: '2px solid #D7D7D7',
                    boxShadow: '0 0 10px #D7D7D7',
                    mb: 1
                 }}
                src={photoUrl || avatar_empty}
            />
        </Badge>
    )

};