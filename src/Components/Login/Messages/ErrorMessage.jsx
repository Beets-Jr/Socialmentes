import React, { useState, useEffect } from "react";
import { Alert } from "@mui/material";

function ErrorMessage({ condition, errorMessage }) {
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    if (condition) {
      setShowErrorMessage(true);
      const timer = setTimeout(() => {
        setShowErrorMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [condition]);

  return (
    <>
      {showErrorMessage && (
        <Alert severity="error" sx={{ marginTop: "5px" }}>
          {errorMessage}
        </Alert>
      )}
    </>
  );
}

export default ErrorMessage;
