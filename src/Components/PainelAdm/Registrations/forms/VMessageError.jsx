/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

export const VMessageError = ({ message, setMessage, isMobile }) => {

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
                    width={isMobile ? '70%' : '510px'}
                    marginX={2}
                    position='fixed'
                    bottom={48}
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