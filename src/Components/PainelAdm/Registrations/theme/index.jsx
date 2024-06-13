import { createTheme } from "@mui/material";

import '../../../../Styles/variables.css';

export const theme = createTheme({
    typography: {
        h2: {
            fontFamily: ['"Ubuntu"', 'sans-serif'].join(','),
            fontSize: 32,
            fontWeight: 400,
            color: '#3575B1'
        },
        h3: {
            fontFamily: ['"Ubuntu"', 'sans-serif'].join(','),
            fontSize: 20,
            fontWeight: 400,
            color: '#727272'
        },
        body1: {
            fontFamily: ['"Fira Sans"', 'sans-serif'].join(','),
            fontSize: 16,
            fontWeight: 400,
            color: '#727272'
        },
        body2: {
            fontFamily: ['"Fira Sans"', 'sans-serif'].join(','),
            fontSize: 15,
            fontWeight: 400,
            color: '#727272'
        }
    }
});