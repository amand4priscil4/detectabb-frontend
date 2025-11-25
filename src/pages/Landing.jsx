import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button
} from '@mui/material';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#F5F5F5'
      }}
    >
      {/* Header amarelo */}
      <Box
        sx={{
          bgcolor: '#FCFC30',
          py: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2
        }}
      >
        {/* Logo Banco do Brasil */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2
          }}
        >
          <img 
            src="/logo_banco_do_brasil.jpg" 
            alt="Banco do Brasil" 
            style={{
              height: '120px',
              width: 'auto'
            }}
          />
          <Typography
            sx={{
              color: '#465EFF',
              fontWeight: 700,
              fontSize: '24px',
              fontStyle: 'italic',
              letterSpacing: '0.5px'
            }}
          >
            DETECTABB
          </Typography>
        </Box>
      </Box>

      {/* Conteúdo */}
      <Container maxWidth="sm" sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ px: 3, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          {/* Título com sublinhado amarelo */}
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography
              variant="h4"
              sx={{
                color: '#465EFF',
                fontWeight: 700,
                fontSize: { xs: '32px', sm: '40px' },
                lineHeight: 1.3,
                mb: 1
              }}
            >
              Para tudo que<br />você imaginar!
            </Typography>
            <Box
              sx={{
                width: '160px',
                height: '6px',
                bgcolor: '#FCFC30',
                borderRadius: '3px',
                mx: 'auto',
                mt: 2
              }}
            />
          </Box>

          {/* Botões na parte inferior */}
          <Box sx={{ display: 'flex', gap: 2, mb: 4, width: '100%', maxWidth: '400px' }}>
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={() => navigate('/upload')}
              sx={{
                borderRadius: '25px',
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: 600,
                py: 1.5,
                bgcolor: '#465EFF',
                color: 'white',
                '&:hover': {
                  bgcolor: '#3549E0'
                }
              }}
            >
              Acesso Rápido
            </Button>

            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={() => navigate('/login')}
              sx={{
                borderRadius: '25px',
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: 600,
                py: 1.5,
                bgcolor: '#465EFF',
                color: 'white',
                '&:hover': {
                  bgcolor: '#3549E0'
                }
              }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Landing;