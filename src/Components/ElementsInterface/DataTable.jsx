import { useMemo, useState } from "react";

import { Box, Grid, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { AddBoxOutlined, AddBoxRounded } from "@mui/icons-material";

import styles from './styles/DataTable.module.css';

/**
 * @description Define a estrutura de uma lista em forma de tabela, com botões de ação e botão de adicionar novo.
 * @param {array<number>} xs - contém a largura (de 0 a 12) de todas as colunas (com exceção da coluna de actions), totalizando uma largura de 12. Também pode-se passar os argumentos `xl`, `sm`, `md` e `lg`.
 * @param {array<string>} columns - contém o nome dos campos que devem ser exibidos nas respectivas colunas da lista.
 * @param {array<string>} head - contém o label que deve ser exibido nas respectivas colunas.
 * @param {array<Object>} body - são os dados que serão listados, os elementos da lista devem ser objetos contendo obrigatoriamente um id.
 * @param {function} onAdd - função executada ao clicar no botão de mais, caso null o botão não é exibido.
 * @param {array<Object>} actions - informa as ações que aparecerão na última coluna da tabela, cada ação é uma tupla `{ icon: SvgIcon, func: function }`
 * @param {string} emptyText - texto que aparece caso body seja uma lista vazia
 */
function DataTable({ lg, md, sm, xl, xs, columns, head, body, onAdd, actions, emptyText }) {

    const theme = useTheme();
    const isDownMedium = useMediaQuery(theme.breakpoints.down('md'));
    
    const numColumns = useMemo(() => {
        if (isDownMedium) {
            return actions.length == 2 ? 18 : 19;
        } else {
            return actions.length == 2 ? 14 : 16;
        }
    }, [isDownMedium]);
    
    const [focusedButton, setFocusedButton] = useState(false);

    const columns_width = (index) => { return {
        lg: lg?.[index],
        md: md?.[index],
        sm: sm?.[index],
        xl: xl?.[index],
        xs: xs?.[index]
    }};

    return (
        <Box className={styles.container_table}>
            { body.length > 0 ? (

                //Container da tabela inteira
                <Grid container>

                    {/* Head */}
                    <Grid container item columns={numColumns} alignItems='center' >

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
                        <Grid item xs textAlign='center'>
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
                                columns={numColumns}
                                className={styles.row}
                            >

                                {/* Valores */}
                                { columns.map( (column, index) => (
                                    <Grid item
                                        key={column}
                                        textAlign='left'
                                        sx={{
                                            pl: index === 0 ? 3 : 0,
                                            pr: 3
                                        }}
                                        {...columns_width(index)}
                                    >
                                        <Typography>
                                            {row[column] || ''}
                                        </Typography>
                                    </Grid>
                                ))}

                                {/* Botões de ação */}
                                <Grid item xs textAlign='center'>
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

export default DataTable;