import { SvgIcon } from "@mui/material";

export const IconEmail = ({ sx, fontSize, color }) => {
    return (
        <SvgIcon fontSize={fontSize} sx={sx} >
            <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 1.67531V1.33333C0 1.11232 0.0856024 0.900358 0.237976 0.744078C0.390349 0.587797 0.597012 0.5 0.8125 0.5H12.1875C12.403 0.5 12.6097 0.587797 12.762 0.744078C12.9144 0.900358 13 1.11232 13 1.33333V1.67531L6.5 5.84198L0 1.67531ZM6.71531 6.68677C6.65073 6.72811 6.57613 6.75003 6.5 6.75003C6.42387 6.75003 6.34927 6.72811 6.28469 6.68677L0 2.65802V9.66667C0 9.88768 0.0856024 10.0996 0.237976 10.2559C0.390349 10.4122 0.597012 10.5 0.8125 10.5H12.1875C12.403 10.5 12.6097 10.4122 12.762 10.2559C12.9144 10.0996 13 9.88768 13 9.66667V2.65802L6.71531 6.68677Z" fill={color} />
            </svg>
        </SvgIcon>
    )
};