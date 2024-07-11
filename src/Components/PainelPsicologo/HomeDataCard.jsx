import { Grid, Card, Typography, Box } from '@mui/material';

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
            <>
              <Typography>{item.children.name} | {calcularIdade(item.children.dateBirth)} | Não tem timestamp </Typography>
            </>
          );
        } else {
          return (
            <>
              <Typography>{item.id} | {item.testType} | {item.patientName} | {formatTimestamp(item.timestamp)} </Typography>
            </>
          );
        }
      };

  return (
    <Grid item xs={12} md={6}>
        <Card>
            <Typography variant="h6">Últimos {title}</Typography>
            {data.map(item => (
            <Grid item xs={12} sm={4} key={item.id}>
                <Box>
                    {renderItem(item)}
                </Box>
            </Grid>
            ))}
        </Card>
    </Grid>
  );
};

export default HomeDataCard;