import { useState } from "react";

import { Box, Grid, IconButton, Typography } from "@mui/material";
import { AddBoxOutlined, AddBoxRounded } from "@mui/icons-material";

import styles from './styles/DataTable.module.css';

function DataTable({ spacing, head, body, onAdd, actions }) {

    const [focusedButton, setFocusedButton] = useState(false);

    return (
        <Box>
            <Grid container>
                <Grid container item columns={14}>
                    { head.map( (column, index) => (
                        <Grid item key={index} xs={spacing[index]}>
                            <Typography
                                className={styles.column_name}
                                sx={{ fontSize: 30 }}
                            >
                                {column}
                            </Typography>
                        </Grid>
                    ))}
                    <Grid item xs textAlign='center'>
                        <IconButton
                            onMouseLeave={() => setFocusedButton(false)}
                            onMouseOver={() => setFocusedButton(true)}
                            onClick={() => onAdd()}
                            sx={{ '&:hover': {
                                backgroundColor: 'white'
                            }}}
                        >
                            { focusedButton ? (
                                <AddBoxRounded
                                    fontSize="large"
                                    sx={{
                                        color: "var(--color-blue-4)"
                                    }}
                                />
                            ) : (
                                <AddBoxOutlined
                                    fontSize="large"
                                    sx={{
                                        color: "var(--color-blue-4)"
                                    }}
                                />
                            )}
                        </IconButton>
                    </Grid>
                </Grid>
                { body.map( ({id, ...data}) => (
                    <Grid key={id} container item columns={14} className={styles.row}>
                        { Object.entries(data).map( (cell, index) => (
                            <Grid item key={cell[0]} xs={spacing[index]}>
                                <Typography>
                                    {cell[1]}
                                </Typography>
                            </Grid>
                        ))}
                        { actions.map( (action, index) => (
                            <Grid item key={index} xs textAlign='center'>
                                <IconButton onClick={() => action.func(id)}>
                                    {action.icon}
                                </IconButton>
                            </Grid>
                        ))}
                    </Grid>
                ))}
            </Grid>
        </Box>

    );

}

export default DataTable;