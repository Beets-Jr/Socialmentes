import { SvgIcon } from "@mui/material"

export const SearchIcon = ({ color }) => {
    return (
        <SvgIcon fontSize="small">
            <svg width="17" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M17 8.08789C17 12.5547 13.4396 16.1758 9.0477 16.1758C8.12774 16.1758 7.24427 16.0169 6.42236 15.7247L3.57431 20.1103C2.98128 21.0235 1.77267 21.2748 0.874789 20.6717C-0.0230868 20.0686 -0.270218 18.8393 0.322808 17.9261L3.17228 13.5383C1.88218 12.1006 1.09539 10.1877 1.09539 8.08789C1.09539 3.62107 4.65576 0 9.0477 0C13.4396 0 17 3.62107 17 8.08789ZM13.8191 8.08789C13.8191 10.768 11.6829 12.9406 9.0477 12.9406C6.41253 12.9406 4.27631 10.768 4.27631 8.08789C4.27631 5.4078 6.41253 3.23515 9.0477 3.23515C11.6829 3.23515 13.8191 5.4078 13.8191 8.08789Z" fill={color || "#D9D9D9"} />
            </svg>
        </SvgIcon>
    )
}