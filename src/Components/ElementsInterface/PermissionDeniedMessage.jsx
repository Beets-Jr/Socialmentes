import { Box, Typography } from '@mui/material'

function PermissionDeniedMessage() {
  return (
    <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '85vh',
            width: '100%',
        }}
    >
        <Typography sx={{ fontFamily: 'var(--font-text)', color: 'var(--color-gray-3)' }}>
            Você não tem permissão para acessar essa página
        </Typography>
    </Box>
  )
}

export default PermissionDeniedMessage