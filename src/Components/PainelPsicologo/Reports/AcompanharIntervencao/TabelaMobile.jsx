import React from "react";

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Check, Close } from "@mui/icons-material";

import styles from './styles/TabelaMobile.module.css';

export const DominiosMobile = ({ goals }) => {

    const goal = goals[0];

    return (
        <TableContainer className={styles.table_container}>
            <Table>

                <TableHead>
                    <TableRow>
                        <TableCell>goal.nome</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {/* Passa por todas as categorias do teste */}
                    { data && Object
                        .entries(data)
                        .sort((a, b) => a - b)
                        .map( category => (
                            <React.Fragment key={category[0]}>

                                {/* Nome da categoria */}
                                <TableRow className={styles.category}>
                                    <TableCell colSpan={4}>
                                        {category[0]}
                                    </TableCell>
                                </TableRow>

                                {/* Níveis */}
                                <TableRow>
                                    { category[1].map( (level, index) => (
                                        <TableCell key={index}>
                                            {
                                                level ? (
                                                    <Check fontSize="small" />
                                                ) : (
                                                    <Close fontSize="small" />
                                                )
                                            }
                                        </TableCell>
                                    ))}
                                </TableRow>

                            </React.Fragment>
                        ))
                    }
                </TableBody>

            </Table>
        </TableContainer>
    );

}