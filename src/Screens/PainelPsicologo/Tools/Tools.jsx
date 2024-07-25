import { useState } from "react";

import { Box, CircularProgress, IconButton, Typography } from "@mui/material";

import { denver } from "../../../Database/denver";
import { Category } from "../../../Components/PainelPsicologo/Tools/Category";
import { Levels } from "../../../Components/PainelPsicologo/Tools/Levels";
import { CloseIcon } from "../../../Assets/Icons/CloseIcon";

import styles from './Tools.module.css';

function Tools() {

    const [category, setCategory] = useState();

    return (
        <Box className={styles.tools_registrations}>

            <Box className={styles.title_close}>
                <Typography
                    className={styles.title}
                    fontSize={30}
                    fontFamily='var(--font-sub)'
                    color='var(--color-blue-4)'
                >
                    { category ? category.nome : "Competências" }
                </Typography>
                { category &&
                    <IconButton onClick={() => setCategory(null)} >
                        <CloseIcon color={'var(--color-gray-3)'} />
                    </IconButton>
                }
            </Box>

            { category ? (
                <Category category={category} />
            ) : denver ? (
                <Levels denver={denver} setCategory={setCategory} />
            ) : (
                <Box className={styles.container_empty}>
                    <CircularProgress />
                </Box>
            ) }

        </Box>
    );

}

export default Tools;