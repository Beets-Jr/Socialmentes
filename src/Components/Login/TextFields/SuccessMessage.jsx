import React, { useState, useEffect } from "react";
import { Alert } from "@mui/material";

function SuccessMessage({ user }) {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (user) {
      setShowSuccessMessage(true);
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  return (
    <>
      {showSuccessMessage && (
        <Alert severity="success">Login bem-sucedido!</Alert>
      )}
    </>
  );
}

export default SuccessMessage;
