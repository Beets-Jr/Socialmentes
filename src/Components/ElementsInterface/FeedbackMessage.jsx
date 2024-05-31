import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Alert } from "@mui/material";

function FeedbackMessage({ condition, message }) {
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        setShowMessage(true);
        const timer = setTimeout(() => {
            setShowMessage(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {showMessage && (
                <Alert severity={condition}>
                    {message}
                </Alert>
            )}
        </>
    );
}

FeedbackMessage.propTypes = {
    condition: PropTypes.oneOf(['success', 'error']).isRequired,
    message: PropTypes.string.isRequired
};

export default FeedbackMessage;
