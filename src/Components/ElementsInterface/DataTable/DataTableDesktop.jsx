import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import { Box, Grid, IconButton, Typography } from "@mui/material";
import { AddBoxOutlined, AddBoxRounded } from "@mui/icons-material";

import styles from './styles/DataTableDesktop.module.css';

function DataTableDesktop({ xl, lg, md, sm, xs, head, columns, body, onAdd, actions, emptyText }) {

    const [focusedButton, setFocusedButton] = useState(false);

    const columns_width = (index) => { return {
        xl: xl?.[index],
        lg: lg?.[index],
        md: md?.[index],
        sm: sm?.[index],
        xs: xs?.[index],
    }};

    return (
        <Box className={styles.container_table}>
            { body.length > 0 ? (

                //Container da tabela inteira
                <Grid container>

                    {/* Head */}
                    <Grid container item alignItems='center' >

                        {/* Nomes das colunas */}
                        { head.map( (column, index) => (
                            <Grid item
                                key={index}
                                textAlign='left'
                                {...columns_width(index)}
                            >
                                <Typography
                                    className={styles.column_name}
                                    sx={{
                                        fontSize: 30,
                                        ml: index === 0 ? 3 : 0
                                    }}
                                >
                                    {column}
                                </Typography>
                            </Grid>
                        ))}

                        {/* Botão de adicionar novo */}
                        <Grid item
                            {...columns_width(head.length)}
                            textAlign='center'
                        >
                            { onAdd && <IconButton
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
                                            fontSize: 40,
                                            color: "var(--color-blue-4)"
                                        }}
                                    />
                                ) : (
                                    <AddBoxOutlined
                                        sx={{
                                            fontSize: 40,
                                            color: "var(--color-blue-4)"
                                        }}
                                    />
                                )}
                            </IconButton> }
                        </Grid>

                    </Grid>

                    {/* Body */}
                    <Grid container item gap={1}>
                        { body.map( row => (

                            // Linha da tabela
                            <Grid container item
                                key={row.id}
                                className={styles.row}
                            >

                                {/* Valores */}
                                { columns.map( (column, index) => (
                                    <Grid item
                                        key={index}
                                        textAlign='left'
                                        {...columns_width(index)}
                                        sx={{
                                            pl: index === 0 ? 3 : 0,
                                            pr: 3
                                        }}
                                    >
                                        <Typography {...column.style}>
                                            { column.func(row) || '' }
                                        </Typography>
                                    </Grid>
                                ))}

                                {/* Botões de ação */}
                                <Grid item
                                    {...columns_width(head.length)}
                                    textAlign='center'
                                >
                                    { actions.map( (action, index) => (
                                        <IconButton
                                            key={index}
                                            onClick={() => action.func(row.id)}
                                        >
                                            {action.icon}
                                        </IconButton>
                                    ))}
                                </Grid>
                                
                            </Grid>

                        ))}
                    </Grid>

                </Grid>

            ) : (

                <Typography
                    sx={{
                        marginTop: '30vh',
                        fontFamily: 'var(--font-sub)',
                        fontSize: '2rem',
                        color: 'var(--color-gray-3)'
                    }}
                >
                    {emptyText}
                </Typography>

            )}
        </Box>

    );

}

export default DataTableDesktop;