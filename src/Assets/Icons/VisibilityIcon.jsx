import { SvgIcon } from "@mui/material"

export const VisibilityIcon = ({ color }) => {
    return (
        <SvgIcon>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.20057 12.7844C2.93314 12.2954 2.93314 11.7045 3.20058 11.2154C4.9 8.10803 8.20336 6 12 6C15.7966 6 19.1 8.10809 20.7994 11.2156C21.0669 11.7046 21.0669 12.2956 20.7994 12.7846C19.1 15.892 15.7966 18 12 18C8.20336 18 4.89997 15.8919 3.20057 12.7844Z" stroke={color || "#454545"} strokeWidth="1.5" />
                <circle cx="12" cy="12" r="3" stroke={color || "#454545"} strokeWidth="1.5" />
            </svg>
        </SvgIcon>
    );
};