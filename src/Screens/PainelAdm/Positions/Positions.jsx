// eslint-disable-next-line no-unused-vars
import Header from '../../../Components/PainelAdm/Header/Header'
import { db } from "../../../Database/FirebaseConfig.mjs"
import { Grid, Typography, Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { collection, getDocs } from 'firebase/firestore';
import Position from "../../../Components/PainelAdm/Positions/Position";
import styles from "./styles/Positions.module.css"


function Positions() {

  const [profiles, setProfiles] = useState([]);
  const [isPositionSet, setIsPositionsSet] = useState(false);
  const [loading, setLoading] = useState(null);
  const [confirmedChange, setConfirmedChange] = useState(false); // indica que uma mudança foi feita 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, 'userProfiles')); // puxar os perfis cadastrados
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProfiles(data);
        setIsPositionsSet(data.length > 0); // senão, imprime na tela a mensagem "sem perfis"
      } catch (err) {
        console.error("Error fetching data ", err);
      } finally {
        setLoading(false);
        setConfirmedChange(false);
      }
    };

    fetchData();
  }, [confirmedChange])

  return (
    loading ? (
      <Box className={styles.classBox}>
        <CircularProgress />
      </Box>
    ) : isPositionSet ? (
      <Grid container spacing={4} columnSpacing={5} className={styles.gridContainer}>
        {profiles.map((profile) => (
          <Grid item key={profile.id} xs={12} sm={6} md={4} lg={3} xl={2} >
            <Position setConfirmedChange={setConfirmedChange} photoUrl={profile.photoUrl} fullName={profile.fullName} position={profile.position} id={profile.id} />
          </Grid>
        ))}
      </Grid>
    ) : (
      <Box className={styles.classBox}>
        <Typography className={styles.text} >Sem perfis</Typography>
      </Box>
    )
  )
}

export default Positions
