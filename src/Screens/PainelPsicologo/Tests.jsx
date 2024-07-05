import Test from "../../Components/PainelPsicologo/Reports/Test";
import { db } from "../../Database/FirebaseConfig.mjs";
import { Typography, Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { collection, getDocs } from 'firebase/firestore';

function Tests() {

  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, 'tests')); 
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTests(data);
      } catch (err) {
        console.error("Error fetching data ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [])

    return (
      loading ? (
        <Box sx={{ display:'flex', justifyContent:'center', alignItems:'center', height: '85vh'}}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ margin: '3vw 3vw'}}>
          <Typography variant="h4" sx={{fontFamily:'var(--font-sub)', color:'var(--color-blue-4)', mb:'10px'}}>
              Testes Finalizados
          </Typography>

          {tests.map((test) => (
            <Test 
              index={test.id} 
              createdAt={test.timestamp} 
              type={test.testType}
              status={test.situation === 0 ? "Finalizado" : "Não Terminado"}
              patient= {test.patientName}
            />
          ))}
        </Box>
      ) 
    )
  }
  
  export default Tests