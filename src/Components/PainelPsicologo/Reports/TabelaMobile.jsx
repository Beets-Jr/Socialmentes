import React from "react";

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Check, Close } from "@mui/icons-material";

import styles from './styles/TabelaMobile.module.css';

export const TabelaMobile = ({ data }) => {

    return (
        <TableContainer className={styles.table_container}>
            <Table>

                <TableHead>
                    <TableRow>
                        <TableCell>Nível 1<br />(1a - 1a 6m)</TableCell>
                        <TableCell>Nível 2<br />(1a 6m - 2a)</TableCell>
                        <TableCell>Nível 3<br />(2a - 3a)</TableCell>
                        <TableCell>Nível 4<br />(3a - 4a)</TableCell>
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