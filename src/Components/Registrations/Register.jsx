import { Avatar, Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";

import { IconEmail, IconPosition } from "./assets/icons";

import './styles/Register.css';

function Register({ register }) {

  return (
    <Card className='card' variant="elevation">

      <CardContent className='cardContent'>

        <Avatar
          className='avatar'
          src={register.photoUrl}
          alt='Foto de perfil do usuário'
        />

        <Box className='textContainer'>
          <Typography className='text' variant="h3">
            {register.fullName}
          </Typography>
        </Box>

        <Box className='textContainer'>
          <IconPosition sx={{ fontSize: 12 }} color='#A2A2A2' />
          <Typography className='text' variant="body1">
            {register.position || 'sem cargo'}
          </Typography>
        </Box>

        <Box className='textContainer'>
          <IconEmail sx={{ fontSize: 12 }} color='#A2A2A2' />
          <Typography className='text' variant="body2">
            {register.email || 'sem email'}
          </Typography>
        </Box>


      </CardContent>

      <CardActions className='cardActions'>
        <Button className='button'>Ver perfil</Button>
      </CardActions>

    </Card>
  );

}

export default Register;