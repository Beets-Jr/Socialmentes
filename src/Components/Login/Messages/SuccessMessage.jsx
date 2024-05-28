import React, { useState, useEffect } from "react";
import { Alert } from "@mui/material";

function SuccessMessage({ condition, successMessage }) {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (condition) {
      setShowSuccessMessage(true);
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [condition]);

  return (
    <>
      {showSuccessMessage && (
        <Alert severity="success" >{successMessage}</Alert>
      )}
    </>
  );
}

export default SuccessMessage;
