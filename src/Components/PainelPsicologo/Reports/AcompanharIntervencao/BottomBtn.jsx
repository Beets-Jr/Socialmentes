import { useContext } from "react";
import { Paper, Button, Box, useMediaQuery } from "@mui/material";

import { AppContext } from "../../../../Contexts/AppContext";
import { useNavigate } from "react-router-dom/dist";

function BottomBtn() {

    const navigate = useNavigate();

    const { open } = useContext(AppContext);
    const widthContent = open ?  "76vw" : "90vw";

    const isMobile = useMediaQuery('(max-width:800px)');

    const propsButton = {
        fontFamily: 'var(--font-sub)',
        fontSize: isMobile ? 14 : 18,
        fontWeight: '500',
        textTransform: "none",
        py: '3px',
    };

    return(
        <Paper
            sx={{
                width: isMobile ? `calc(${widthContent} + 30px)` : widthContent,
                position: 'fixed',
                boxShadow: 0,
                marginLeft: isMobile ? -4 : -6,
                bottom: 0,
                paddingY: 2,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: "space-between",
                    pl: 5, pr: 8,
                }}
            >

                <Button 
                    variant="outlined"
                    disableElevation
                    onClick={() => navigate(-1)}
                    sx={{
                        ...propsButton,
                        color: 'var(--color-blue-4)',
                        minWidth: isMobile ? '26%' : null,
                        px: !isMobile ? '40px' : null,
                        border: '2px solid var(--color-blue-4)',
                        borderRadius: '15px',
                        '&:hover': {
                            border: '2px solid var(--color-blue-3)',
                            color: 'var(--color-blue-3)'
                        }
                    }}
                > Voltar </Button>

                <Button
                    variant="contained"
                    disableElevation
                    sx={{
                        ...propsButton,
                        minWidth: isMobile ? '30%' : null,
                        px: !isMobile ? '76px' : null,
                        border: '2px solid var(--color-blue-3)',
                        background: 'linear-gradient(to left, var(--color-blue-3), var(--color-blue-2))',
                        borderRadius: '10px',
                        '&:hover': {
                            border: '2px solid var(--color-blue-2)'
                        }
                    }}
                > PDF </Button>

            </Box>
        </Paper>
    );
}   

export default BottomBtn;