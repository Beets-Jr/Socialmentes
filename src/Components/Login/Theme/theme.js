import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          display: "flex",
          width: "100%",
          padding: "10px 20px",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          borderRadius: "10px",
          border: "1px solid #65AAEA",
          background: "linear-gradient(90deg, #7DB9F0 0%, #5095D5 100%)",
          boxShadow: "0px 2px 4px 0px rgba(153, 198, 239, 0.59)",
          color: "#EFF7FF",
          fontFamily: "Poppins",
          fontSize: "16px",
          fontStyle: "normal",
          fontWeight: "600",
          lineHeight: "normal",
          "&:hover": {
            background: "linear-gradient(90deg, #5095D5 0%, #7DB9F0 100%)", // exemplo de hover
          },
          "&.Mui-disabled": {
            background: "linear-gradient(90deg, #7DB9F0 0%, #5095D5 100%)", // manter o gradiente quando desativado
            opacity: 0.7,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: "100%",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderRadius: "15px",
              borderColor: "#727272",
              borderWidth: "2px",
            },
            "&:hover fieldset": {
              borderColor: "#5095D5",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#5095d5",
              borderWidth: "3px",
              borderRadius: "15px",
              pointerEvents: "none",
            },
            "& .MuiOutlinedInput-input": {
              color: "#727272",
              fontFamily: "Fira Sans",
              fontSize: "16px",
              fontWeight: "500",
              lineHeight: "normal",
            },
          },
        },
      },
    },
  },
});

export default theme;
