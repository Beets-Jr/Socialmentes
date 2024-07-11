import { Grid, Typography, Box, CircularProgress } from "@mui/material";
import { useState, useEffect } from 'react';
import { getLastThreeTests, getLastThreeFinalizedReports, getLastThreePatients } from "../../Services/homePsiService";
import HomeDataCard from "../../Components/PainelPsicologo/HomeDataCard";

function HomePsi() {
    
    const [loading, setLoading] = useState(true);
    const [tests, setTests] = useState([]);
    const [reports, setReports] = useState([]);
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const [testsData, reportsData, patientsData] = await Promise.all([
              getLastThreeTests(),
              getLastThreeFinalizedReports(),
              getLastThreePatients()
            ]);
            setTests(testsData);
            setReports(reportsData);
            setPatients(patientsData);
            setLoading(false);
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchData();
      }, []);

    return(
        loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '85vh' }}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={4} columnSpacing={5}>
              <HomeDataCard title="testes cadastrados" data={tests} type="test" />
              <HomeDataCard title="relatórios finalizados" data={reports} type="report" />
              <HomeDataCard title="pacientes" data={patients} type="patient" />
            </Grid>
          )
    );
}

export default HomePsi;