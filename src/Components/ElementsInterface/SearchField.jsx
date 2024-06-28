import { InputAdornment, TextField } from "@mui/material";

import { SearchIcon } from "../../Assets/Icons/SearchIcon";

function SearchField({ placeholder }) {
    return (
        <TextField
            placeholder={placeholder}
            size="small"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start" sx={{ mr: 2 }}>
                        <SearchIcon />
                    </InputAdornment>
                )
            }}
            sx={{
                width: '60%',
                minWidth: '270px',
                "& .MuiOutlinedInput-root": {
                    '& ::placeholder': {
                        color: 'var(--color-gray-3)',
                        fontFamily: "var(--font-text)"
                    },
                    '& fieldset': {
                        borderRadius: "15px",
                        borderColor: 'var(--color-gray-2)',
                        borderWidth: "2.5px"
                    },
                    "&:hover fieldset": {
                        borderColor: "var(--color-blue-2)",
                    },
                    "&.Mui-focused fieldset": {
                        borderColor: "var(--color-blue-2)",
                        borderWidth: "3px",
                        borderRadius: "15px",
                        pointerEvents: "none",
                    },
                    "& .MuiOutlinedInput-input": {
                        color: 'var(--color-gray-4)',
                        fontFamily: "var(--font-text)",
                    }
                }
            }}
        />
    );
}

export default SearchField;