import { Grid } from "@mui/material";

import { useVFormContext } from "./VForm";
import { useDebounce } from "../hooks";

export const VFormContent = ({ children, onChange }) => {

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
            pl={8}
            pr={8}
        >
            {children}
        </Grid>
    );

}