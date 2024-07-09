import { Box, List, ListItem, ListItemText } from "@mui/material";

import styles from './styles/Category.module.css';
import { useEffect, useState } from "react";

export const Category = ({ category }) => {

    const [cat, setCat] = useState();

    useEffect(() => {
        setTimeout(() => setCat(category), 10);
    }, []);

    return (
        <List sx={{ mt: '5px' }}>
            { cat && cat.perguntas.map( pergunta => (
                <Box key={pergunta.id}>
                    <ListItem className={styles.question} >
                        <ListItemText
                            primary={`- ${pergunta.pergunta}`}
                            primaryTypographyProps={{
                                fontFamily: 'var(--font-text)',
                                fontWeight: 600,
                                fontSize: 15
                            }}
                        />
                    </ListItem>
                    <ListItem className={styles.description} >
                        <ListItemText
                            primary={pergunta.descricao}
                            primaryTypographyProps={{
                                fontFamily: 'var(--font-text)',
                                fontSize: 15
                            }}
                        />
                    </ListItem>
                </Box>
            ))}
        </List>
    );

};