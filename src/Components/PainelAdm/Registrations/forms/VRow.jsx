import { Grid } from "@mui/material";

/**
 * Encapsula os elmentos de uma linha do form
 * @param {boolean} param0 se true existe apenas um campo na linha
 */
export const VRow = ({ children, unique }) => {

    const row_props = unique ? {
        textAlign: 'center'
    } : {
        direction: 'row',
        justifyContent: 'space-between'
    };

    return (
        <Grid container item {...row_props}>
            {children}
        </Grid>
    );
};