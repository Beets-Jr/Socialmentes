import { SvgIcon } from "@mui/material";

export const IconCalendar = ({ sx, fontSize, color }) => {
    return (
        <SvgIcon fontSize={fontSize} sx={sx}>
            <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 10.7C0 11.72 0.78 12.5 1.8 12.5H10.2C11.22 12.5 12 11.72 12 10.7V5.9H0V10.7ZM10.2 1.7H9V1.1C9 0.74 8.76 0.5 8.4 0.5C8.04 0.5 7.8 0.74 7.8 1.1V1.7H4.2V1.1C4.2 0.74 3.96 0.5 3.6 0.5C3.24 0.5 3 0.74 3 1.1V1.7H1.8C0.78 1.7 0 2.48 0 3.5V4.7H12V3.5C12 2.48 11.22 1.7 10.2 1.7Z" fill={color} />
            </svg>
        </SvgIcon>
    )
};