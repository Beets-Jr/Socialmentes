import { useMemo, useState } from "react";

import { Box, Grid, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { AddBoxOutlined, AddBoxRounded } from "@mui/icons-material";

import styles from './styles/DataTable.module.css';

function DataTable({ spacing, head, body, onAdd, actions }) {

    const theme = useTheme();
    const isDownMedium = useMediaQuery(theme.breakpoints.down('md'));
    
    const numColumns = useMemo(() => {
        return isDownMedium ? 18 : 14;
    }, [isDownMedium]);
    
    const [focusedButton, setFocusedButton] = useState(false);

    return (
        <Box className={styles.container_table}>
            <Grid container>

                {/* Head */}
                <Grid container item columns={numColumns} alignItems='center' >

                    {/* Nomes das colunas */}
                    { head.map( (column, index) => (
                        <Grid item
                            key={index}
                            xs={spacing[index]}
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
                    <Grid item xs textAlign='center'>
                        <IconButton
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
                        </IconButton>
                    </Grid>

                </Grid>

                {/* Body */}
                <Grid container item gap={1}>
                    { body.map( ({id, ...data}) => (
                        <Grid container item
                            key={id}
                            columns={numColumns}
                            className={styles.row}
                        >

                            {/* Valores */}
                            { Object.entries(data).map( (cell, index) => (
                                <Grid item
                                    key={cell[0]}
                                    xs={spacing[index]}
                                    sx={{
                                        pl: index === 0 ? 3 : 0
                                    }}
                                >
                                    <Typography>
                                        {cell[1]}
                                    </Typography>
                                </Grid>
                            ))}

                            {/* Botões de ação */}
                            <Grid item xs textAlign='center'>
                                { actions.map( (action, index) => (
                                    <IconButton
                                        key={index}
                                        onClick={() => action.func(id)}
                                    >
                                        {action.icon}
                                    </IconButton>
                                ))}
                            </Grid>
                            
                        </Grid>
                    ))}
                </Grid>

            </Grid>
        </Box>

    );

}

export default DataTable;