import { Box, List, ListItem, ListItemText } from "@mui/material";

import styles from './styles/Levels.module.css';

export const Levels = ({ denver, setCategory }) => {

    return (
        <List>
            { denver && denver.map(level => (
                <Box key={level.nivel}>
                    <ListItem
                        className={styles.level}
                        sx={{ py: 0, px: 3 }}
                    >
                        <ListItemText
                            primary={`Nível ${level.nivel}`}
                            primaryTypographyProps={{
                                fontFamily: 'var(--font-sub)',
                                fontSize: 24
                            }}
                        />
                    </ListItem>
                    { level.categorias.map(cat => (
                        <ListItem
                            key={cat.id}
                            className={styles.category}
                            sx={{ py: 1.3, px: 3 }}
                            onClick={() => setCategory(cat)}
                        >
                            <ListItemText
                                primary={cat.nome}
                                primaryTypographyProps={{
                                    fontFamily: 'var(--font-text)',
                                    fontWeight: 600,
                                    fontSize: 15
                                }}
                            />
                        </ListItem>
                    ))}
                </Box>
            ))}
        </List>
    );

};