import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  ListItemIcon
} from '@mui/material';
import {
  Logout as LogoutIcon,
  AccountCircle as AccountIcon
} from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';
import BottomNav from '../components/common/BottomNav';
import StackedCarousel from '../components/common/StackedCarousel';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const primeiroNome = user?.nome?.split(' ')[0] || 'Usuário';

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleCloseMenu();
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
          minHeight: '280px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}
      >
        {/* Botão de Perfil do Usuário (canto superior direito) */}
        <IconButton
          onClick={handleOpenMenu}
          sx={{
            position: 'absolute',
            top: 20,
            right: 20,
            bgcolor: 'white',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            '&:hover': {
              bgcolor: 'white',
              boxShadow: '0 6px 16px rgba(0,0,0,0.15)'
            }
          }}
        >
          <Avatar
            sx={{
              bgcolor: '#465EFF',
              width: 40,
              height: 40,
              fontSize: '1.2rem',
              fontWeight: 700
            }}
          >
            {primeiroNome.charAt(0).toUpperCase()}
          </Avatar>
        </IconButton>

        {/* Menu do Usuário */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          onClick={handleCloseMenu}
          PaperProps={{
            elevation: 3,
            sx: {
              mt: 1.5,
              minWidth: 220,
              borderRadius: '12px',
              overflow: 'visible',
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {/* Informações do Usuário */}
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#465EFF' }}>
              {user?.nome || 'Usuário'}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
              {user?.email || 'email@exemplo.com'}
            </Typography>
          </Box>

          <Divider />

          {/* Opção Minha Conta */}
          <MenuItem sx={{ py: 1.5, px: 2 }}>
            <ListItemIcon>
              <AccountIcon fontSize="small" sx={{ color: '#465EFF' }} />
            </ListItemIcon>
            <Typography variant="body2">Minha Conta</Typography>
          </MenuItem>

          <Divider />

          {/* Opção Sair */}
          <MenuItem onClick={handleLogout} sx={{ py: 1.5, px: 2 }}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" sx={{ color: '#E00000' }} />
            </ListItemIcon>
            <Typography variant="body2" sx={{ color: '#E00000' }}>
              Sair
            </Typography>
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