import React, { useState, useEffect } from "react";
import { Alert } from "@mui/material";

function ErrorMessage( {error}) {
  const [showErrorMessage, setShowErrorMessage] = useState(false);

    useEffect(() => {
      if (error) {
        setShowErrorMessage(true);
        const timer = setTimeout(() => {
          setShowErrorMessage(false);
        }, 2000);
        return () => clearTimeout(timer);
      }
    }, [error]);

  return (
    <>
      {showErrorMessage && (
        <Alert severity="error">{"E-mail ou senha incorretos!"}</Alert>
      )}
    </>
  );
}

export default ErrorMessage;
