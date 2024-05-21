import { SvgIcon } from "@mui/material";

export const IconPosition = ({ sx, fontSize, color }) => {
    return (
        <SvgIcon fontSize={fontSize} sx={sx}>
            <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 2.60526H7V1.55263C7 0.968421 6.555 0.5 6 0.5H4C3.445 0.5 3 0.968421 3 1.55263V2.60526H1C0.445 2.60526 0.005 3.07368 0.005 3.65789L0 9.44737C0 10.0316 0.445 10.5 1 10.5H9C9.555 10.5 10 10.0316 10 9.44737V3.65789C10 3.07368 9.555 2.60526 9 2.60526ZM6 2.60526H4V1.55263H6V2.60526Z" fill={color} />
            </svg>
        </SvgIcon>
    );
};