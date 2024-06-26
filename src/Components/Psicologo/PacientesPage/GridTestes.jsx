import { Box, Grid, Typography } from '@mui/material'
import styles from '../PacientesPage/GridTestes.module.css'
import React from 'react'

export default function GridTestes() {
  return (
    <div>
        <Box className="container-testes" sx={{ flexGrow: "1" }}>
            <Typography sx={{ marginTop: "5vh" }}>Testes</Typography>
            <Grid container columnSpacing={3} rowSpacing={2} className={styles.gridContainer}>
                
                <Grid item xs={3} sx={{ display: "flex" }}>
                    <Box sx={{ width: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid red" }}>
                        1
                    </Box>
                    <Box sx={{ width: "50%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "1px solid red", padding: "1em" }}>
                       <Typography>05/09/2024</Typography>
                       <Typography>Denver</Typography>
                       <Typography noWrap>Não finalizado</Typography> 
                    </Box>
                </Grid>
                <Grid item xs={3} sx={{ display: "flex" }}>
                    <Box sx={{ width: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid red" }}>
                        1
                    </Box>
                    <Box sx={{ width: "50%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "1px solid red", padding: "1em" }}>
                       <Typography>05/09/2024</Typography>
                       <Typography>Denver</Typography>
                       <Typography noWrap>Não finalizado</Typography> 
                    </Box>
                </Grid>
                <Grid item xs={3} sx={{ display: "flex" }}>
                    <Box sx={{ width: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid red" }}>
                        1
                    </Box>
                    <Box sx={{ width: "50%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "1px solid red", padding: "1em" }}>
                       <Typography>05/09/2024</Typography>
                       <Typography>Denver</Typography>
                       <Typography noWrap>Não finalizado</Typography> 
                    </Box>
                </Grid>
                <Grid item xs={3} sx={{ display: "flex" }}>
                    <Box sx={{ width: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid red" }}>
                        1
                    </Box>
                    <Box sx={{ width: "50%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "1px solid red", padding: "1em" }}>
                       <Typography>05/09/2024</Typography>
                       <Typography>Denver</Typography>
                       <Typography noWrap>Não finalizado</Typography> 
                    </Box>
                </Grid>
                <Grid item xs={3} sx={{ display: "flex" }}>
                    <Box sx={{ width: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid red" }}>
                        1
                    </Box>
                    <Box sx={{ width: "50%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "1px solid red", padding: "1em" }}>
                       <Typography>05/09/2024</Typography>
                       <Typography>Denver</Typography>
                       <Typography noWrap>Não finalizado</Typography> 
                    </Box>
                </Grid>
                <Grid item xs={3} sx={{ display: "flex" }}>
                    <Box sx={{ width: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid red" }}>
                        1
                    </Box>
                    <Box sx={{ width: "50%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "1px solid red", padding: "1em" }}>
                       <Typography>05/09/2024</Typography>
                       <Typography>Denver</Typography>
                       <Typography noWrap>Não finalizado</Typography> 
                    </Box>
                </Grid>
            </Grid>
        </Box>

    </div>
  )
}
