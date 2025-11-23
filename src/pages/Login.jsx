import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Alert
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';
import { validateEmail } from '../utils/validation';
import { ERROR_MESSAGES } from '../utils/constants';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
    setApiError('');
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = ERROR_MESSAGES.REQUIRED_FIELD;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = ERROR_MESSAGES.INVALID_EMAIL;
    }

    if (!formData.senha) {
      newErrors.senha = ERROR_MESSAGES.REQUIRED_FIELD;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    setLoading(true);
    setApiError('');

    try {
      await login(formData.email, formData.senha);
    } catch (error) {
      console.error('Erro no login:', error);
      setApiError(
        error.response?.data?.detail || ERROR_MESSAGES.INVALID_CREDENTIALS
      );
    } finally {
      setLoading(false);
    }
  };

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
      <Container maxWidth="sm" sx={{ mt: 4, position: 'relative', zIndex: 1 }}>
        <Box sx={{ px: 3 }}>
          {/* Título */}
          <Typography
            variant="h4"
            sx={{
              color: '#465EFF',
              fontWeight: 700,
              mb: 4,
              fontSize: { xs: '28px', sm: '32px' },
              lineHeight: 1.2,
              textAlign: 'center'
          }}
          >
            Faça seu login ou<br />crie uma conta!
          </Typography>

          {apiError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {apiError}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  bgcolor: 'white'
                }
              }}
            />

            <TextField
              fullWidth
              label="Senha"
              name="senha"
              type={showPassword ? 'text' : 'password'}
              value={formData.senha}
              onChange={handleChange}
              error={!!errors.senha}
              helperText={errors.senha}
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  bgcolor: 'white'
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={loading}
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
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>

              <Button
                component={Link}
                to="/register"
                variant="contained"
                fullWidth
                size="large"
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
                Criar Conta
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;