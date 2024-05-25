import { useState, useEffect } from "react";
import { Box } from "@mui/material";

function VMessageError({ message, setMessage }) {

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
                <Box>
                    {message}
                </Box>
            )}
        </>
    );

}

export default VMessageError;