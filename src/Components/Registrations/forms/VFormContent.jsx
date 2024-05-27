import { Grid } from "@mui/material";
import { useVFormContext } from "./VForm";
import { useDebounce } from "../hooks";

export const VFormContent = ({ children, onChange }) => {

    const { data, focusedFieldData } = useVFormContext();

    useDebounce( () => {
        if (data) {
            onChange?.(data);
        }
    }, [focusedFieldData], 500, true);

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