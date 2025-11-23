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
  Alert,
  LinearProgress
} from '@mui/material';
import { Visibility, VisibilityOff, ArrowBack } from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';
import { validateEmail, validatePassword, getPasswordStrength } from '../utils/validation';
import { ERROR_MESSAGES } from '../utils/constants';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const passwordStrength = getPasswordStrength(formData.senha);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
    setApiError('');
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.nome || formData.nome.length < 3) {
      newErrors.nome = 'Nome deve ter no mínimo 3 caracteres';
    }

    if (!formData.email) {
      newErrors.email = ERROR_MESSAGES.REQUIRED_FIELD;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = ERROR_MESSAGES.INVALID_EMAIL;
    }

    const passwordValidation = validatePassword(formData.senha);
    if (!passwordValidation.isValid) {
      newErrors.senha = passwordValidation.errors.join(', ');
    }

    if (formData.senha !== formData.confirmarSenha) {
      newErrors.confirmarSenha = ERROR_MESSAGES.PASSWORD_MISMATCH;
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
      await register(formData.nome, formData.email, formData.senha);
    } catch (error) {
      console.error('Erro no registro:', error);
      setApiError(
        error.response?.data?.detail || 'Erro ao criar conta. Tente novamente.'
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
      {/* Header com gradiente azul e ondulação */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #0033A0 0%, #0055FF 100%)',
          height: '220px',
          position: 'relative',
          overflow: 'hidden',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-2px',
            left: 0,
            right: 0,
            height: '60px',
            background: '#F5F5F5',
            borderTopLeftRadius: '50% 60px',
            borderTopRightRadius: '50% 60px'
          }
        }}
      >
        {/* Botão Voltar */}
        <IconButton
          component={Link}
          to="/login"
          sx={{
            position: 'absolute',
            top: 30,
            left: 20,
            color: 'white'
          }}
        >
          <ArrowBack />
        </IconButton>

        {/* Logo Banco do Brasil */}
        <Box
          sx={{
            position: 'absolute',
            top: 30,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <img 
            src="/logo_banco_do_brasil.jpg" 
            alt="Banco do Brasil" 
            style={{
              height: '50px',
              width: 'auto'
            }}
          />
        </Box>
      </Box>

      {/* Conteúdo */}
      <Container maxWidth="sm" sx={{ mt: -4, position: 'relative', zIndex: 1 }}>
        <Box sx={{ px: 3 }}>
          {/* Título */}
          <Typography
            variant="h4"
            sx={{
              color: '#0033A0',
              fontWeight: 700,
              mb: 4,
              fontSize: { xs: '28px', sm: '32px' },
              lineHeight: 1.2
            }}
          >
            Crie sua conta<br />gratuita!
          </Typography>

          {apiError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {apiError}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Nome Completo"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              error={!!errors.nome}
              helperText={errors.nome}
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
                mb: 1,
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

            {formData.senha && (
              <Box sx={{ mb: 2 }}>
                <Box display="flex" justifyContent="space-between" mb={0.5}>
                  <Typography variant="caption" color="textSecondary">
                    Força da senha:
                  </Typography>
                  <Typography variant="caption" color={`${passwordStrength.color}.main`}>
                    {passwordStrength.label}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={passwordStrength.value}
                  color={passwordStrength.color}
                  sx={{ borderRadius: '4px', height: 6 }}
                />
              </Box>
            )}

            <TextField
              fullWidth
              label="Confirmar Senha"
              name="confirmarSenha"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmarSenha}
              onChange={handleChange}
              error={!!errors.confirmarSenha}
              helperText={errors.confirmarSenha}
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
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

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
                mb: 2,
                bgcolor: '#0033A0',
                color: 'white',
                '&:hover': {
                  bgcolor: '#FFD700',
                  color: '#0033A0'
                },
                '&:active': {
                  bgcolor: '#FFD700',
                  color: '#0033A0'
                }
              }}
            >
              {loading ? 'Criando conta...' : 'Criar Conta'}
            </Button>

            <Box textAlign="center">
              <Typography variant="body2" color="textSecondary">
                Já tem uma conta?{' '}
                <Link 
                  to="/login" 
                  style={{ 
                    color: '#0033A0', 
                    textDecoration: 'none',
                    fontWeight: 600 
                  }}
                >
                  Fazer login
                </Link>
              </Typography>
            </Box>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default Register;