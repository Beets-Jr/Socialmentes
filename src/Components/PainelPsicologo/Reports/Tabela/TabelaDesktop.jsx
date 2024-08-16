import { Check, Close } from "@mui/icons-material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

import styles from './styles/TabelaDesktop.module.css';

export const TabelaDesktop = ({ data }) => {

    return (
        <TableContainer className={styles.table_container}>
            <Table>

                <TableHead>
                    <TableRow>
                        <TableCell>Domínio</TableCell>
                        <TableCell>Nível 1 (1a - 1a 6m)</TableCell>
                        <TableCell>Nível 2 (1a 6m - 2a)</TableCell>
                        <TableCell>Nível 3 (2a - 3a)</TableCell>
                        <TableCell>Nível 4 (3a - 4a)</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {/* Passa por todas as categorias do teste */}
                    { data && Object
                        .entries(data)
                        .sort((a, b) => a - b)
                        .map( category => (
                            <TableRow key={category[0]}>
                                {/* Nome da categoria */}
                                <TableCell>{category[0]}</TableCell>

                                {/* Níveis */}
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
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );

};