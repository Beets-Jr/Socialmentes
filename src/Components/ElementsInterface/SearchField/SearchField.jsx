import { useEffect, useState } from "react";

import { Box, IconButton, InputAdornment, TextField, useMediaQuery } from "@mui/material";
import { AddBoxOutlined, AddBoxRounded } from "@mui/icons-material";

import { SearchIcon } from "../../../Assets/Icons/SearchIcon";

import styles from './SearchField.module.css';

/**
 * @description É usado para criar um campo de filtro.
 * @param {string} placeholder - texto exibido no placeholder do input.
 * @param {array<Object>} data - a lista contendo a lista completa dos itens que serão filtrados.
 * @param {function} getValue - função usada para recuperar o valor usado para filtrar uma linha.
 * @param {function} setFilteredData - função usada para setar os dados filtrados.
 */
function SearchField({ placeholder, data, getValue, setFilteredData, onAdd, isMobile }) {

    const [filter, setFilter] = useState('');
    const [focusedButton, setFocusedButton] = useState(false);

    useEffect( () => {
        const regex = new RegExp(`^.*${filter.toLowerCase()}.*$`);
        const filteredData = data.filter( (value) => {
            return getValue(value).toLowerCase().match(regex);
        });
        setFilteredData(filteredData);
    }, [filter]);

    return (
        <Box className={styles.container_input}>
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
                    flex: isMobile ? '1' : '.6',
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
                onChange={ e => setFilter(e.target.value) }
                value={filter}
            />
            { onAdd && isMobile && <IconButton
                onMouseLeave={() => setFocusedButton(false)}
                onMouseOver={() => setFocusedButton(true)}
                onClick={() => onAdd()}
                sx={{ '&:hover': {
                    backgroundColor: 'white',
                }}}
            >
                { focusedButton ? (
                    <AddBoxRounded
                        sx={{
                            fontSize: 48,
                            color: "var(--color-blue-4)"
                        }}
                    />
                ) : (
                    <AddBoxOutlined
                        sx={{
                            fontSize: 48,
                            color: "var(--color-blue-4)"
                        }}
                    />
                )}
            </IconButton> }
        </Box>
    );

}

export default SearchField;