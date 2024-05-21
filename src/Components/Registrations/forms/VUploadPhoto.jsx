import { useEffect, useState } from "react";
import { Avatar, Badge, Tooltip, styled } from "@mui/material";
import { AddPhotoAlternateRounded } from "@mui/icons-material";
import { useField } from "@unform/core"

import avatar_empty from "../assets/avatar_empty.svg";

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

export const VUploadPhoto = ({ name }) => {

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
                                bgcolor: '#ABABAB',
                                color: 'white'
                            }}
                        />
                    </Tooltip>
                </>
            }
            sx={{
                '& .MuiSvgIcon-root': {
                    '&:hover': {
                        cursor: 'pointer',
                        bgcolor: '#7DB9F0'
                    }
                }
            }}
        >
            <Avatar
                sx={{ width: 100, height: 100 }}
                src={photoUrl || avatar_empty}
            />
        </Badge>
    )

};