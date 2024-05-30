// eslint-disable-next-line no-unused-vars
import Header from '../Header/Header'
import { db } from "../../../Database/FirebaseConfig.mjs"
import { Grid, Typography, Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { collection, getDocs } from 'firebase/firestore';
import Position from "./Position";


function Positions() {

  const [profiles, setProfiles] = useState([]);
  const [isPositionSet, setIsPositionsSet] = useState(false);
  const [loading, setLoading] = useState(true);
  const [confirmedChange, setConfirmedChange] = useState(false); // indica que uma mudança foi feita 

  useEffect(() => {
    const fetchData = async () => {
      try {
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
    <div style={{ margin: '3vw' }}>
      {loading ? (
        <Box
          sx={{ // para deixar o componente de carregamento bem no meio da tela
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            width: '100vw',
          }}
        >
          <CircularProgress sx={{ color: 'var(--color-gray-3)' }} />
        </Box>
      ) : isPositionSet ? (
        <Grid container spacing={4}>
          {profiles.map((profile) => (
            <Grid item key={profile.id} xs={12} sm={6} md={4} >
              <Position setConfirmedChange={setConfirmedChange} photoUrl={profile.photoUrl} fullName={profile.fullName} position={profile.position} id={profile.id} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{ // para deixar a frase bem no meio da tela
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '85vh',
            width: '100%',
          }}
        >
          <Typography sx={{ fontFamily: 'var(--font-text)', color: 'var(--color-gray-3)' }}>Sem perfis</Typography>
        </Box>
      )}
    </div>
  )
}

export default Positions
