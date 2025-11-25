import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Chip,
  IconButton,
  Button
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  Visibility as ViewIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import BottomNav from '../components/common/BottomNav';

const Historico = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [analises, setAnalises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    fetchHistorico();
  }, [isAuthenticated, navigate]);

  const fetchHistorico = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await api.get('/api/historico');

      if (response.data && Array.isArray(response.data)) {
        setAnalises(response.data);
      } else if (response.data.analises && Array.isArray(response.data.analises)) {
        setAnalises(response.data.analises);
      } else {
        setAnalises([]);
      }
    } catch (err) {
      console.error('Erro ao buscar histórico:', err);
      setError('Erro ao carregar histórico. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Data não disponível';

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (err) {
      return 'Data inválida';
    }
  };

  const handleViewResult = (id) => {
    navigate(`/result/${id}`);
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#F5F5F5' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F5F5F5', pb: '90px' }}>
      {/* Header */}
      <Box
        sx={{
          bgcolor: '#FCFC30',
          py: 2,
          px: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          position: 'sticky',
          top: 0,
          zIndex: 100,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      >
        <IconButton
          onClick={() => navigate('/dashboard')}
          sx={{ color: '#465EFF' }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Box sx={{ flex: 1, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#465EFF' }}>
            Histórico
          </Typography>
          <Typography variant="body2" sx={{ color: '#465EFF', fontSize: '0.875rem' }}>
            Suas análises anteriores
          </Typography>
        </Box>
        <Box sx={{ width: 40 }} /> {/* Espaçador para centralizar */}
      </Box>

      <Container maxWidth="md" sx={{ py: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {analises.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" sx={{ color: 'text.secondary', mb: 2 }}>
              Nenhuma análise encontrada
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
              Você ainda não realizou nenhuma análise de boleto
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/upload')}
              sx={{
                bgcolor: '#465EFF',
                color: 'white',
                borderRadius: '25px',
                textTransform: 'none',
                px: 4,
                py: 1.5,
                fontWeight: 600,
                '&:hover': {
                  bgcolor: '#3549E0'
                }
              }}
            >
              Fazer primeira análise
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {analises.map((analise) => {
              const isFraud = analise.resultado_final?.isFraudulento ?? false;
              const dados = analise.dados_extraidos || {};

              return (
                <Card
                  key={analise.id}
                  sx={{
                    borderRadius: '16px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    {/* Header do Card */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {isFraud ? (
                          <WarningIcon sx={{ color: '#E00000', fontSize: 28 }} />
                        ) : (
                          <CheckIcon sx={{ color: '#4CAF50', fontSize: 28 }} />
                        )}
                        <Box>
                          <Chip
                            label={isFraud ? 'SUSPEITO' : 'VÁLIDO'}
                            size="small"
                            sx={{
                              bgcolor: isFraud ? '#FFE5E5' : '#E8F5E9',
                              color: isFraud ? '#E00000' : '#4CAF50',
                              fontWeight: 600,
                              fontSize: '0.75rem'
                            }}
                          />
                          <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', mt: 0.5 }}>
                            {formatDate(analise.data_analise || analise.created_at)}
                          </Typography>
                        </Box>
                      </Box>

                      <IconButton
                        onClick={() => handleViewResult(analise.id)}
                        sx={{
                          bgcolor: '#465EFF',
                          color: 'white',
                          '&:hover': {
                            bgcolor: '#3549E0'
                          }
                        }}
                      >
                        <ViewIcon />
                      </IconButton>
                    </Box>

                    {/* Dados do Boleto */}
                    <Box sx={{ mt: 2 }}>
                      {dados.banco_nome && (
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Banco:</strong> {dados.banco_nome}
                        </Typography>
                      )}

                      {dados.valor && (
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Valor:</strong> R$ {dados.valor}
                        </Typography>
                      )}

                      {dados.vencimento && (
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Vencimento:</strong> {dados.vencimento}
                        </Typography>
                      )}

                      {dados.beneficiario && (
                        <Typography
                          variant="body2"
                          sx={{
                            mb: 1,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          <strong>Beneficiário:</strong> {dados.beneficiario}
                        </Typography>
                      )}

                      {dados.linha_digitavel && (
                        <Typography
                          variant="caption"
                          sx={{
                            display: 'block',
                            color: 'text.secondary',
                            fontFamily: 'monospace',
                            mt: 1,
                            p: 1,
                            bgcolor: '#F5F5F5',
                            borderRadius: '4px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {dados.linha_digitavel}
                        </Typography>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        )}
      </Container>

      {/* Bottom Navigation */}
      <BottomNav />
    </Box>
  );
};

export default Historico;
