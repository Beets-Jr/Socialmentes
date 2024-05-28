import { SvgIcon } from "@mui/material";

export const IconClose = ({ sx, fontSize, color }) => {
    return (
        <SvgIcon fontSize={fontSize} sx={sx}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3L14 14M14 14L25 25M14 14L25 3M14 14L3 25" stroke={color} strokeWidth="6" strokeLinecap="round" />
            </svg>
        </SvgIcon>
    )
};