import Test from "../../Components/PainelPsicologo/Reports/Test";
import { Typography, Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchTests } from "../../Services/testService";

function Tests() {

  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchTests();
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
              key={test.id}
              test = {test}
            />
          ))}
        </Box>
      ) 
    )
  }
  
  export default Tests