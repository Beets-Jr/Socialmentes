/* eslint-disable react/prop-types */

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
          sx={{ width: 100, height: 100 }}
        />

        <Box className='textContainer'>
          <Typography className='text' variant="h3">
            {register.fullName}
          </Typography>
        </Box>

        <Box className='textContainer'>
          <IconPosition sx={{ fontSize: 12 }} color='var(--color-gray-3)' />
          <Typography className='text' variant="body1">
            {register.position || 'sem cargo'}
          </Typography>
        </Box>

        <Box className='textContainer'>
          <IconEmail sx={{ fontSize: 12 }} color='var(--color-gray-3)' />
          <Typography className='text' variant="body2">
            {register.email[0] || 'sem email'}
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