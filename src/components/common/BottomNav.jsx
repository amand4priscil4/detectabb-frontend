import { useNavigate, useLocation } from 'react-router-dom';
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper
} from '@mui/material';
import {
  Home as HomeIcon,
  History as HistoryIcon,
  Help as HelpIcon,
  Upload as UploadIcon
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  // Determinar valor atual baseado na rota
  const getCurrentValue = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 0;
    if (path === '/upload') return 1;
    if (path === '/historico') return 2;
    if (path === '/ajuda') return 3;
    return 0;
  };

  const handleChange = (event, newValue) => {
    switch (newValue) {
      case 0:
        // Início - sempre vai para Dashboard (se autenticado) ou Login
        if (isAuthenticated) {
          navigate('/dashboard');
        } else {
          navigate('/login');
        }
        break;
      case 1:
        // Analisar
        navigate('/upload');
        break;
      case 2:
        // Histórico
        if (isAuthenticated) {
          navigate('/historico');
        } else {
          navigate('/login');
        }
        break;
      case 3:
        // Ajuda
        navigate('/ajuda');
        break;
      default:
        break;
    }
  };

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        borderRadius: '24px 24px 0 0',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.1)',
        pb: 'env(safe-area-inset-bottom)' // Para notch de iPhone
      }}
      elevation={8}
    >
      <BottomNavigation
        value={getCurrentValue()}
        onChange={handleChange}
        showLabels
        sx={{
          height: 70,
          borderRadius: '24px 24px 0 0',
          bgcolor: 'white',
          '& .MuiBottomNavigationAction-root': {
            color: '#999',
            minWidth: 'auto',
            padding: '6px 12px 8px',
            '&.Mui-selected': {
              color: '#465EFF',
              '& .MuiSvgIcon-root': {
                fontSize: 30,
                transform: 'scale(1.1)',
                transition: 'transform 0.2s ease'
              }
            }
          },
          '& .MuiBottomNavigationAction-label': {
            fontSize: '0.7rem',
            fontWeight: 600,
            marginTop: '4px',
            '&.Mui-selected': {
              fontSize: '0.75rem'
            }
          }
        }}
      >
        <BottomNavigationAction
          label="Início"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          label="Analisar"
          icon={
            <UploadIcon
              sx={{
                bgcolor: '#465EFF',
                color: 'white',
                borderRadius: '50%',
                p: 1,
                fontSize: 40,
                boxShadow: '0 4px 12px rgba(70, 94, 255, 0.3)'
              }}
            />
          }
        />
        <BottomNavigationAction
          label="Histórico"
          icon={<HistoryIcon />}
        />
        <BottomNavigationAction
          label="Ajuda"
          icon={<HelpIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
