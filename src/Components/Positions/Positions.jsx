import { db } from "../../Database/FirebaseConfig.mjs"
import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { collection, getDocs } from 'firebase/firestore/lite';
import Position from "./Position";

function Positions() {

  const [profiles, setProfiles] = useState([]);
  const [isPositionSet, setIsPositionsSet] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'userProfiles')); // puxar os perfis cadastrados
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProfiles(data);
        setIsPositionsSet(data.length > 0); // senão, imprime na tela a mensagem "sem perfis"
      } catch(err) {
        console.error("Error fetching data ", err);
      }
    };

    fetchData();
  }, [])
  return ( 
    <div style={{margin:'3vw'}}>
      { isPositionSet ? (
        <Grid container spacing={4}>
          {profiles.map((profile) => (
            <Grid item key={profile.id} xs={12} sm={6} md={4} >
              <Position photoUrl={profile.photoUrl} fullName={profile.fullName} position={profile.position} id={profile.id}/>
            </Grid>
          ))}
        </Grid> 
      ) :(
        <Typography sx={{fontFamily: 'var(--font-text)', color:'var(--color-gray-3)'}}>Sem perfis</Typography>
      )}
    </div>
  )
}

export default Positions