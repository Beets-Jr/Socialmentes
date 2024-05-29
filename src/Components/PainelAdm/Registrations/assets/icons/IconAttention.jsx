import { SvgIcon } from "@mui/material";

export const IconAttention = ({ sx, fontSize, color }) => {
    return (
        <SvgIcon fontSize={fontSize} sx={sx}>
            <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 0.5C2.688 0.5 0 3.188 0 6.5C0 9.812 2.688 12.5 6 12.5C9.312 12.5 12 9.812 12 6.5C12 3.188 9.312 0.5 6 0.5ZM6 9.5C5.67 9.5 5.4 9.23 5.4 8.9V6.5C5.4 6.17 5.67 5.9 6 5.9C6.33 5.9 6.6 6.17 6.6 6.5V8.9C6.6 9.23 6.33 9.5 6 9.5ZM6.6 4.7H5.4V3.5H6.6V4.7Z" fill={color} />
            </svg>
        </SvgIcon>
    )
};