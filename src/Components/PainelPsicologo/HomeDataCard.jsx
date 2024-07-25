import * as React from 'react';
import { Grid, Card, Typography, Box, Divider, Button } from '@mui/material';
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

function formatDate(timestamp) { // Função foi criada porque o timestamp não foi criado com a função para converter a data sozinho
  if (!timestamp || typeof timestamp.seconds === 'undefined' || typeof timestamp.nanoseconds === 'undefined') {
      // Retorna uma string vazia ou uma data padrão se o timestamp estiver indefinido ou incompleto
      return '';
  }

  // Converte segundos e nanosegundos para milissegundos
  const milliseconds = timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;

  // Cria um objeto Date usando os milissegundos
  const date = new Date(milliseconds);

  // Formata a data como dd/mm/aaaa
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

const HomeDataCard = ({ title, data, type }) => {
  const renderItem = (item) => {
    if (type === 'patient') {
      return (
        <Typography 
          sx={{
            fontFamily: 'var(--font-text)', 
            color: 'var(--color-gray-4)',
            textAlign: 'center', /* Perguntat se deixa com flex-start ou center */
            overflow: 'hidden', // esconder o texto
            whiteSpace: 'nowrap', // não quebrar a linha
            textOverflow: 'ellipsis',// três pontinhos
          }}
        >
          {item.children.name} | {calcularIdade(item.children.dateBirth)} | {formatDate(item.createdAt)}
        </Typography>
      );
    } else {
      return (
        <Typography 
          sx={{
            fontFamily: 'var(--font-text)', 
            color: 'var(--color-gray-4)',
            textAlign: 'center', /* Perguntat se deixa com flex-start ou center */
            overflow: 'hidden', // esconder o texto
            whiteSpace: 'nowrap', // não quebrar a linha
            textOverflow: 'ellipsis',// três pontinhos
          }}
        >
          {item.id} | {item.testType.charAt(0).toUpperCase() + item.testType.slice(1)} | {item.patientName} | {formatTimestamp(item.timestamp)} 
        </Typography>
      );
    }
  };

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/'); // Colocar o caminho correto
  };

  return (
    <Grid item xs={12} md={6}>
      <Card variant="outlined" 
        sx={{
          border: '2px solid #e0e0e0', 
          borderRadius: '10px', 
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between',
          padding: '10px', 
          width: '100%',
          height:'100%',
          minHeight: '350px',
        }}
      >
        <Typography 
          variant="h6"
          sx={{
            fontFamily: 'var(--font-text)', 
            color: 'var(--color-gray-5)',
            display: 'flex',
            justifyContent: 'center', 
            marginTop: '15px', 
            fontSize: { xs: '18px', sm: '22px', md: '26px' },
            fontWeight: '400',
            textAlign: 'center'
          }} 
        >
          Últimos {title}
        </Typography>
        <Divider sx={{ backgroundColor: 'var(--color-gray-5)', height: '2px' }} />
        <Box >
          {data.map((item, index) => (
            <Box key={index} sx={{ width: '100%', my: '30px' }}>
              {renderItem(item)}
              <Divider sx={{ backgroundColor: 'var(--color-gray-4)', height: '1px', marginY: 1 }} />
            </Box>
          ))}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom:'5px' }}>
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
              margin: '5px', 
              padding: '5px 35px',
              borderRadius: '7px', 
              borderWidth: '2px',
              borderColor: 'var(--color-gray-3)',
              textTransform: 'none',
              '&:hover': {
                color: '#fff',
                borderWidth: '2px',
                borderColor: '#65AAEA',
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
