/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

export const VMessageError = ({ message, setMessage }) => {

    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        if (message) {
            setShowMessage(true);
            const timer = setTimeout(() => {
                setShowMessage(false);
                setMessage('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <>
            {showMessage && (
                <Box
                    width='510px'
                    marginX={2}
                    position='fixed'
                    bottom={50}
                    padding={1.7}
                    bgcolor='white'
                    borderRadius={20}
                    textAlign='center'
                >
                    <Typography
                        variant="body1"
                        fontFamily='var(--font-sub)'
                    >
                        {message}
                    </Typography>
                </Box>
            )}
        </>
    );

}