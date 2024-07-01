import { useState } from "react";

import { Box, Grid, IconButton, Typography } from "@mui/material";
import { AddBoxOutlined, AddBoxRounded } from "@mui/icons-material";

import styles from './styles/DataTable.module.css';

/**
 * @description Define a estrutura de uma lista em forma de tabela, com botões de ação e botão de adicionar novo.
 * @param {array<number>} xs - contém a largura de todas as colunas da tabela, totalizando uma largura de 12. O mesmo se aplica aos argumentos: `sm`, `md`, `lg` e `xl`.
 * @param {array<string>} head - contém o label que deve ser exibido nas respectivas colunas.
 * @param {array<string>} columns - contém as funções executadas para recuperar o valor que deve ser exibido nas respectivas colunas, elas recebem como argumento o dado representado pela linha atualmente executada.
 * @param {array<Object>} body - são os dados que serão listados, os elementos da lista devem ser objetos contendo obrigatoriamente um id.
 * @param {function} onAdd - função executada ao clicar no botão de mais, caso null o botão não é exibido.
 * @param {array<Object>} actions - informa as ações que aparecerão na última coluna da tabela, cada ação é uma tupla `{ icon: SvgIcon, func: function }`
 * @param {string} emptyText - texto que aparece caso body seja uma lista vazia
 */
function DataTable({ xl, lg, md, sm, xs, head, columns, body, onAdd, actions, emptyText }) {
    
    const [focusedButton, setFocusedButton] = useState(false);

    const columns_width = (index) => { return {
        xl: xl?.[index],
        lg: lg?.[index],
        md: md?.[index],
        sm: sm?.[index],
        xs: xs?.[index]
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
                                        key={column}
                                        textAlign='left'
                                        {...columns_width(index)}
                                        sx={{
                                            pl: index === 0 ? 3 : 0,
                                            pr: 3
                                        }}
                                    >
                                        <Typography>
                                            { column(row) || '' }
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

export default DataTable;