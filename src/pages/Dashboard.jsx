import {
  Box,
  Container,
  Typography
} from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import BottomNav from '../components/common/BottomNav';
import StackedCarousel from '../components/common/StackedCarousel';

const Dashboard = () => {
  const { user } = useAuth();

  const primeiroNome = user?.nome?.split(' ')[0] || 'Usuário';

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F5F5F5', pb: '70px' }}>
      {/* Header Amarelo com Logo */}
      <Box
        sx={{
          bgcolor: '#FCFC30',
          py: 8,
          px: 3,
          textAlign: 'center',
          minHeight: '280px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Box
            component="img"
            src="/logo_banco_do_brasil.jpg"
            alt="DetectaBB Logo"
            sx={{
              width: 100,
              height: 100,
              objectFit: 'contain',
              display: 'block'
            }}
          />

          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 900,
              color: '#465EFF',
              letterSpacing: '1px',
              fontStyle: 'italic'
            }}
          >
            DETECTABB
          </Typography>
        </Box>
      </Box>

      {/* Conteúdo */}
      <Container maxWidth="sm" sx={{ py: 6, textAlign: 'center' }}>
        {/* Saudação */}
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 700,
            color: '#465EFF',
            mb: 2,
            fontStyle: 'italic'
          }}
        >
          Olá, {primeiroNome}!
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            mb: 5,
            fontStyle: 'italic'
          }}
        >
          Proteja-se de fraudes com nosso detector de boletos!
        </Typography>

        {/* Carrossel de Cards Empilhados */}
        <Box sx={{ mb: 4 }}>
          <StackedCarousel />
        </Box>

        {/* Texto decorativo */}
        <Box sx={{ mt: 8, opacity: 0.3 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            🛡️ Proteção contra boletos falsos
          </Typography>
        </Box>
      </Container>

      {/* Bottom Navigation */}
      <BottomNav />
    </Box>
  );
};

export default Dashboard;