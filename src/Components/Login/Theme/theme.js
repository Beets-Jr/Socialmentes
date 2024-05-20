import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
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
