import { Box, Grid } from "@mui/material";
import styles from "./GridTestes.module.css";
import React, { useEffect, useState } from "react";
import BlueLine from "../../../../Assets/Icons/BlueLine";
import { useNavigate } from "react-router-dom";
import { getByTestSerialId } from "../../../../Services/Tests/GetByTestSerialId.mjs";

export default function GridTestes({ testsInfo }) {
    const navigate = useNavigate();
    const [testInfo, setTestInfo] = useState([]);

    const formatDate = (isoString) => {
        const date = new Date(isoString.trim());
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const goToTest = (testId, testDetails) => {
        localStorage.setItem('testId', testId);
        navigate(`/painel-adm/pacientes/teste/${testId}`, { state: { testDetails } });
    };

    useEffect(() => {
        const fetchTestInfo = async (testId) => {
            try {
                const test = await getByTestSerialId(testId);
                if (test) {
                    console.log('Dados do teste:', test);
                    setTestInfo(testInfo => [...testInfo, test]);
                } else {
                    console.error('O teste não foi encontrado com o ID fornecido:', testId);
                }
            } catch (error) {
                console.error('Erro ao obter teste pelo ID:', error);
            }
        };

        testsInfo.forEach((test) => {
            fetchTestInfo(test.id);
        });
    }, [testsInfo]);

    return (
        <div>
            <Box className={styles.containerTestes} sx={{ flexGrow: "1" }}>
                <p className={styles.titulo}>Testes</p>
                <BlueLine />
                <Grid
                    container
                    rowGap={2}
                    columnGap={3}
                    className={styles.gridContainer}
                >
                    {testInfo.map((test, index) => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3.75}
                            sx={{ display: "flex" }}
                            onClick={() => goToTest(test.id, test)}
                            className={styles.gridItem}
                            key={index}
                        >
                            <div className={styles.cardHalf}>
                                <span>{test.id}</span>
                            </div>

                            <div className={styles.cardHalf}>
                                <p>{formatDate(test.timestamp)}</p>
                                <p>{test.testType}</p>
                                <p noWrap className={styles.statusTeste}>
                                    {test.situation === '0' ? (
                                        <p>Não finalizado</p>
                                    ) : (
                                        <p>Finalizado</p>
                                    )}
                                </p>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    );
}
