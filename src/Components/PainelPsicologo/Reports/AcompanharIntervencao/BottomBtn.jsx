import { useContext } from "react";
import { Paper, Button, Box } from "@mui/material";

import { AppContext } from "../../../../Contexts/AppContext";
import { useNavigate } from "react-router-dom/dist";

function BottomBtn() {

    const { open } = useContext(AppContext);
    const widthContent = open ? "76vw" : "90vw";

    const navigate = useNavigate();

    return(
        <Paper
            sx={{
                width: widthContent,
                position: 'fixed',
                boxShadow: 0,
                marginLeft: -6,
                bottom: 0,
                paddingY: 2,
                flexDirection: {
                    xs: 'column',
                    sm: 'row'
                }
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: "space-between",
                    pl: 5,
                    pr: 8,
                }}
            >
                <Button 
                    variant="outlined"
                    disableElevation
                    onClick={() => navigate(-1)}
                    sx={{
                        fontFamily: 'var(--font-sub)',
                        fontSize: 18,
                        fontWeight: '500',
                        color: 'var(--color-blue-4)',
                        textTransform: "none",
                        padding: '4px 50px',
                        border: '2px solid var(--color-blue-4)',
                        borderRadius: '15px',
                        '&:hover': {
                            border: '2px solid var(--color-blue-3)',
                            color: 'var(--color-blue-3)'
                        }
                    }}
                >
                    Voltar
                </Button>
                <Button 
                    variant="contained"
                    disableElevation
                    sx={{
                        fontFamily: 'var(--font-sub)',
                        fontSize: 18,
                        fontWeight: '500',
                        padding: '4px 76px',
                        border: '2px solid var(--color-blue-3)',
                        background: 'linear-gradient(to left, var(--color-blue-3), var(--color-blue-2))',
                        borderRadius: '10px',
                        '&:hover': {
                            border: '2px solid var(--color-blue-2)'
                        }
                    }}
                >
                    PDF
                </Button>
            </Box>
        </Paper>
    );
}   

export default BottomBtn;