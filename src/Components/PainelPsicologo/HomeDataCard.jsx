import { Grid, Card, Typography, Box, Divider, Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function calcularIdade(dataNascimento) {
  const hoje = new Date();
  let dia, mes, ano;

  if (dataNascimento.includes('/')) {
      [dia, mes, ano] = dataNascimento.split('/').map(Number);
  } else if (dataNascimento.includes('-')) {
      [ano, mes, dia] = dataNascimento.split('-').map(Number);
  } else {
      return 'Formato de data inválido';
  }
  
  const nascimento = new Date(ano, mes - 1, dia);

  let idadeAnos = hoje.getFullYear() - nascimento.getFullYear();
  let idadeMeses = hoje.getMonth() - nascimento.getMonth();

  if (idadeMeses < 0 || (idadeMeses === 0 && hoje.getDate() < nascimento.getDate())) {
      idadeAnos--;
      idadeMeses = 12 + idadeMeses;
  }

  return `Idade: ${idadeAnos} ano(s) e ${idadeMeses} mês(es)`;
}

const HomeDataCard = ({ title, data, type }) => {
  const renderItem = (item) => {
      if (type === 'patient') {
        return (
          <Typography 
            sx={{
              fontFamily:'var(--font-text)', 
              color:'var(--color-gray-4)',
              textAlign: 'center'
            }}
          >
            {item.children.name} | {calcularIdade(item.children.dateBirth)} | Não tem timestamp 
          </Typography>
        );
      } else {
        return (
          <Typography 
            sx={{
              fontFamily:'var(--font-text)', 
              color:'var(--color-gray-4)',
              textAlign: 'center'
            }}
          >
            {item.id} | {item.testType} | {item.patientName} | {formatTimestamp(item.timestamp)} 
          </Typography>
        );
      }
  };

  const navigate = useNavigate();
  const handleClick = () => {
      navigate('/'); // Colocar o caminho certo
  };
    

  return (
    <Grid item xs={12} md={6}>
        <Card variant="outlined" 
          sx={{
            border:'2px solid #e0e0e0', 
            borderRadius:'10px', 
            height:'35vh', 
            display:'flex', 
            flexDirection:'column', 
            justifyContent:'space-between',
            padding:'5px'
          }}
          >
            <Typography 
              variant="h6"
              sx={{
                fontFamily:'var(--font-text)', 
                color:'var(--color-gray-5)',
                display:'flex',
                justifyContent:'center', 
                marginTop:'5px', 
                fontSize:{xs: '20px', sm: '24px', md: '28px'},
                fontWeight:'400',
                textAlign: 'center'
              }} 
            >
                Últimos {title}
            </Typography>
            <Divider variant="middle" sx={{backgroundColor:'var(--color-gray-5)', height:'2px'}}/>
            <Box sx={{width:'100%', textAlign: 'center', display:'flex', flexDirection:'column', 
            justifyContent:'space-between',}}>
              {data.map(item => (
                  <Box >
                      {renderItem(item)}
                      <Divider variant="middle" sx={{backgroundColor:'var(--color-gray-4)', height: '1px', marginY: 1}} />
                  </Box>
              ))}
            </Box>
            <Box sx={{display:'flex', justifyContent:'flex-end'}}>
              <Button 
                variant="outlined" 
                disableElevation 
                onClick={handleClick} 
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontFamily: 'var(--font-text)',
                  color: 'var(--color-gray-4)',
                  borderColor: '2px solid var(--color-gray-3)',
                  margin: '5px', padding: '0 auto',
                  borderRadius: '10px', 
                  '&:hover': {
                    color: '#fff',
                    borderColor: '2px solid var(--color-blue-3)',
                    background: 'linear-gradient(to left, var(--color-blue-3), var(--color-blue-2))',
                  }              
                }}
            >
                Ver mais
            </Button>
            </Box>
        </Card>
    </Grid>
  );
};

export default HomeDataCard;