/* eslint-disable react/prop-types */

import { Grid } from "@mui/material";

import { useVFormContext } from "./VForm";
import { useDebounce } from "../../../../Hooks";

export const VFormContent = ({ children, onChange, isMobile = false }) => {

    const { getData, focusedField, focusedFieldData } = useVFormContext();

    useDebounce( () => {
        const data = getData();
        if (data) {
            onChange?.(data);
        }
    }, [focusedField, focusedFieldData], 500, true);

    return (
        <Grid container
            flex-direction='column'
            gap={2.5}
            pl={isMobile ? 1 : 8}
            pr={isMobile ? 1 : 8}
        >
            {children}
        </Grid>
    );

}