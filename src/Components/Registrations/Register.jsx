import { Mail, Work } from "@mui/icons-material";
import { Avatar, Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";

function Register({ register }) {

  const propsBox = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: .5,
    color: '#727272'
  }

  const propsText = {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fontFamily: "Fira Sans, sans-serif",
    fontWeight: 400,
    fontStyle: 'normal'
  };

  return (
    <Card variant="elevation" sx={{ border: '1px solid #ABABAB', borderRadius: 4, boxShadow: '3px 3px 5px #ABABAB' }}>

      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: .8, paddingBottom: 0 }}>

        <Avatar
          src={register.photoUrl}
          alt='Foto de perfil do usuário'
          sx={{ width: 100, height: 100, border: `1px solid #ABABAB` }}
        />

        <Box {...propsBox}>
          <Typography {...propsText} fontFamily='Ubuntu, sans-serif' fontSize={20}>
            {register.fullName}
          </Typography>
        </Box>

        <Box {...propsBox}>
          <Work sx={{ fontSize: 14 }} />
          <Typography {...propsText} fontSize={16}>
            {register.position || 'sem cargo'}
          </Typography>
        </Box>

        <Box {...propsBox}>
          <Mail sx={{ fontSize: 14 }} />
          <Typography {...propsText} fontSize={15}>
            {register.email}
          </Typography>
        </Box>


      </CardContent>

      <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button sx={{ textTransform: 'none', fontSize: 18 }}>Ver perfil</Button>
      </CardActions>

    </Card>
  );

}

export default Register;