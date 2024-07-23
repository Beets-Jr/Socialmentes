import { Box, IconButton, Typography } from '@mui/material';

import styles from './styles/DataTableMobile.module.css';
import React from 'react';

function DataTableMobile({ head, columns, body, actions, emptyText }) {

    return (
        <Box className={styles.container_table}>
            { body.length > 0 ? (
                <Box>
                    { body.map( (row, index) => (

                        // Uma linha da tabela
                        <Box key={index} className={styles.row}>

                            {/* valores das colunas textuais */}
                            <Box className={styles.row_data}>
                                { columns.map( (column, index) => (
                                    <React.Fragment key={index}>
                                        <Typography
                                            {...column.style}
                                        >
                                            <Typography component='span'>
                                                {head[index]}:&nbsp;
                                            </Typography>
                                            {column.func(row) || ''}
                                        </Typography>
                                    </React.Fragment>
                                ))}
                            </Box>

                            {/* Botões de ação */}
                            <Box className={styles.row_actions}>
                                { actions.map( (action, index) => (
                                    <IconButton
                                        key={index}
                                        onClick={() => action.func(row.id)}
                                    >
                                        {action.icon}
                                    </IconButton>
                                ))}
                            </Box>

                        </Box>
                    ))}
                </Box>
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

export default DataTableMobile;