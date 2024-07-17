import { Grid } from "@mui/material";
import React from "react";

/**
 * Encapsula os elmentos de uma linha do form
 * @param {boolean} param0 se true existe apenas um campo na linha
 */
export const VRow = ({ children, unique, isMobile }) => {

    const row_props = unique || isMobile ? {
        textAlign: 'center'
    } : {
        direction: 'row',
        justifyContent: 'space-between'
    };

    if (isMobile) {
        return (
            React.Children.map(children, (comp) => (
                <Grid container item {...row_props}>
                    {comp}
                </Grid>
            ))
        );
    } else {
        return (
            <Grid container item {...row_props}>
                {children}
            </Grid>
        );
    }

};