import { useEffect, useState } from "react";
import { InputAdornment, TextField } from "@mui/material";
import { SearchIcon } from "../../Assets/Icons/SearchIcon"; // Certifique-se de que o ícone está sendo importado corretamente

/**
 * @description É usado para criar um campo de filtro.
 * @param {string} placeholder - texto exibido no placeholder do input.
 * @param {array<Object>} data - a lista contendo a lista completa dos itens que serão filtrados.
 * @param {string} field - o nome do campo que será usado para realizar a filtragem.
 * @param {function} setFilteredData - função usada para setar os dados filtrados.
 */
function SearchField({ placeholder, data, field, setFilteredData }) {
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const regex = new RegExp(`^.*${filter.toLowerCase()}.*$`, 'i');
        const filteredData = data.filter((value) => {
            // Verificar se a propriedade field existe e é uma string
            return value[field] && typeof value[field] === 'string' && value[field].toLowerCase().match(regex);
        });
        setFilteredData(filteredData);
    }, [filter, data, field, setFilteredData]);

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
            onChange={e => setFilter(e.target.value)}
            value={filter}
        />
    );
}

export default SearchField;
