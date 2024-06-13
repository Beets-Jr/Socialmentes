import { createTheme } from "@mui/material";

import '../../../../Styles/variables.css';

export const theme = createTheme({
    typography: {
        h2: {
            fontFamily: 'var(--font-sub)',
            fontSize: 32,
            fontWeight: 400,
            color: 'var(--color-blue-4)'
        },
        h3: {
            fontFamily: 'var(--font-sub)',
            fontSize: 20,
            fontWeight: 400,
            color: 'var(--color-gray-4)'
        },
        body1: {
            fontFamily: 'var(--font-text)',
            fontSize: 16,
            fontWeight: 400,
            color: 'var(--color-gray-4)'
        },
        body2: {
            fontFamily: 'var(--font-text)',
            fontSize: 15,
            fontWeight: 400,
            color: 'var(--color-gray-4)'
        }
    }
});