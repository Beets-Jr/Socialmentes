import { SvgIcon } from "@mui/material"

export const IconListAdd = ({ sx, fontSize, color }) => {
    return (
        <SvgIcon fontSize={fontSize} sx={sx}>
            <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="a" fill="#fff">
                    <path d="M0 2a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v19a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2Z" />
                </mask>
                <path d="M-2 2a4 4 0 0 1 4-4h18a4 4 0 0 1 4 4H-2Zm26 21H0h24ZM2 23a4 4 0 0 1-4-4V2a4 4 0 0 1 4-4v25ZM24 0v23V0Z" fill={color} mask="url(#a)" />
                <rect x="4" y="5" width="3" height="3" rx="1" fill={color} /><rect x="9" y="5" width="11" height="3" rx="1" fill={color} />
                <rect x="9" y="15" width="5" height="3" rx="1" fill={color} /><rect x="9" y="10" width="11" height="3" rx="1" fill={color} />
                <rect x="4" y="15" width="3" height="3" rx="1" fill={color} /><rect x="4" y="10" width="3" height="3" rx="1" fill={color} />
                <path d="M1.5 3C1.5 2 2 1.5 3 1.5M22.5 3c0-1-.5-1.5-1.5-1.5M1.5 20c0 1 .5 1.5 1.5 1.5" stroke={color} />
                <circle cx="21" cy="20" r="5" stroke={color} strokeWidth="2" />
                <path fill={color} d="M17 21h3v3h-3zM20 23h2v1h-2zM24 19h1v2h-1zM17 19h1v2h-1zM20 16h2v1h-2zM17 16h3v3h-3zM22 16h3v3h-3zM22 21h3v3h-3zM22 2h2v11h-2zM2 21h12v2H2z" />
            </svg>
        </SvgIcon>
    )
}