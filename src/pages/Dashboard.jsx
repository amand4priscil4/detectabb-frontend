import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Button,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import { 
  Upload as UploadIcon,
  Menu as MenuIcon,
  History as HistoryIcon,
  Help as HelpIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';
import BottomNav from '../components/common/BottomNav';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const primeiroNome = user?.nome?.split(' ')[0] || 'Usuário';

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F5F5F5', pb: '70px' }}>
      {/* Header Amarelo com Logo */}
      <Box 
        sx={{ 
          bgcolor: '#FCFC30',
          py: 8,
          px: 3,
          textAlign: 'center',
          position: 'relative',
          minHeight: '280px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Menu hamburguer */}
        <IconButton 
          onClick={handleMenuOpen}
          sx={{ 
            position: 'absolute',
            top: 20,
            left: 20,
            color: '#465EFF'
          }}
        >
          <MenuIcon sx={{ fontSize: 32 }} />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => { handleMenuClose(); navigate('/historico'); }}>
            <HistoryIcon sx={{ mr: 1, color: '#465EFF' }} /> Histórico
          </MenuItem>
          <MenuItem onClick={() => { handleMenuClose(); navigate('/ajuda'); }}>
            <HelpIcon sx={{ mr: 1, color: '#465EFF' }} /> Ajuda
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <LogoutIcon sx={{ mr: 1, color: '#E00000' }} /> Sair
          </MenuItem>
        </Menu>

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

        {/* Botão Grande Nova Análise */}
        <Button
          variant="contained"
          fullWidth
          size="large"
          startIcon={<UploadIcon sx={{ fontSize: 28 }} />}
          onClick={() => navigate('/upload')}
          sx={{
            borderRadius: '20px',
            textTransform: 'none',
            fontSize: '1.5rem',
            fontWeight: 700,
            py: 3,
            bgcolor: '#FCFC30',
            color: '#465EFF',
            boxShadow: '0 8px 24px rgba(252,252,48,0.4)',
            fontStyle: 'italic',
            '&:hover': { 
              bgcolor: '#FCFC30',
              opacity: 0.9,
              boxShadow: '0 12px 32px rgba(252,252,48,0.5)',
              transform: 'translateY(-2px)',
              transition: 'all 0.3s ease'
            }
          }}
        >
          Nova análise!
        </Button>

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