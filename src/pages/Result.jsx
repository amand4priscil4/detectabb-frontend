import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Upload as UploadIcon,
  Check as CheckIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';

const Result = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResult = async () => {
      try {
        setLoading(true);

        if (id && id !== 'latest') {
          // Tentar buscar o resultado com polling (até 10 tentativas)
          let attempts = 0;
          const maxAttempts = 10;
          let resultData = null;

          while (attempts < maxAttempts && !resultData) {
            try {
              const response = await api.get(`/api/analise/${id}`);

              // Verificar se o resultado tem dados válidos
              if (response.data && (response.data.dados_extraidos || response.data.resultado_final)) {
                resultData = response.data;
                break;
              }
            } catch (err) {
              console.log(`Tentativa ${attempts + 1}/${maxAttempts} falhou, tentando novamente...`);
            }

            attempts++;

            // Aguardar antes da próxima tentativa (intervalo crescente)
            if (attempts < maxAttempts) {
              await new Promise(resolve => setTimeout(resolve, 500 * attempts));
            }
          }

          if (resultData) {
            setResult(resultData);
          } else {
            setError('Resultado ainda não disponível. Tente recarregar a página em alguns segundos.');
          }
        } else {
          const savedResult = sessionStorage.getItem('lastAnalysis');
          if (savedResult) {
            setResult(JSON.parse(savedResult));
          } else {
            setError('Resultado não encontrado');
          }
        }
      } catch (err) {
        console.error('Erro ao buscar resultado:', err);
        setError('Erro ao carregar resultado');
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#F5F5F5' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !result) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#F5F5F5' }}>
        <Container maxWidth="sm">
          <Alert severity="error" sx={{ mb: 2 }}>{error || 'Resultado não encontrado'}</Alert>
          <Button variant="contained" fullWidth onClick={() => navigate('/upload')} sx={{ borderRadius: '25px', textTransform: 'none', py: 1.5, bgcolor: '#0033A0' }}>
            Nova Análise
          </Button>
        </Container>
      </Box>
    );
  }

  // Extrair dados com fallbacks
  const isFraud = result.resultado_final?.isFraudulento ?? false;
  const dados = result.dados_extraidos || result.dadosExtraidos || {};
  const validacao = result.validacao || {};
  const fraudeAnalise = result.fraudeAnalise || result.resultado_final || {};

  // Montar lista de verificações
  const verificacoes = [];

  // 1. Linha digitável
  if (dados.linha_digitavel) {
    const linhaLimpa = dados.linha_digitavel.replace(/\D/g, '');
    verificacoes.push({
      item: 'Linha Digitável',
      status: linhaLimpa.length === 47 ? 'ok' : 'erro',
      detalhe: linhaLimpa.length === 47 
        ? `Formato válido com 47 dígitos`
        : `Apenas ${linhaLimpa.length} dígitos (esperado: 47)`,
      valor: dados.linha_digitavel
    });
  } else {
    verificacoes.push({
      item: 'Linha Digitável',
      status: 'erro',
      detalhe: 'Não foi possível extrair a linha digitável',
      valor: 'Não identificada'
    });
  }

  // 2. Código do banco
  if (dados.codigo_banco || dados.codigoBanco) {
    const codigoBanco = dados.codigo_banco || dados.codigoBanco;
    const bancosValidos = [1, 33, 104, 237, 341, 260, 77, 623, 323, 290, 336, 380, 403, 655, 197, 368, 243, 654, 748, 756];
    const bancoValido = bancosValidos.includes(Number(codigoBanco));
    const nomeBanco = dados.banco_nome || dados.bancoNome || 'Desconhecido';
    
    verificacoes.push({
      item: 'Código do Banco',
      status: bancoValido ? 'ok' : 'alerta',
      detalhe: bancoValido 
        ? `Banco reconhecido pela FEBRABAN`
        : `Código não reconhecido`,
      valor: `${codigoBanco} - ${nomeBanco}`
    });
  } else {
    verificacoes.push({
      item: 'Código do Banco',
      status: 'erro',
      detalhe: 'Não foi possível identificar o banco',
      valor: 'Não identificado'
    });
  }

  // 3. Valor do boleto
  if (dados.valor && dados.valor > 0) {
    let statusValor = 'ok';
    let detalheValor = 'Valor dentro da faixa esperada';
    
    if (dados.valor < 20) {
      statusValor = 'alerta';
      detalheValor = 'Valor muito baixo - verifique se está correto';
    } else if (dados.valor > 5000) {
      statusValor = 'alerta';
      detalheValor = 'Valor alto - confirme com a empresa';
    }

    verificacoes.push({
      item: 'Valor do Boleto',
      status: statusValor,
      detalhe: detalheValor,
      valor: `R$ ${Number(dados.valor).toFixed(2).replace('.', ',')}`
    });
  } else {
    verificacoes.push({
      item: 'Valor do Boleto',
      status: 'erro',
      detalhe: 'Valor não identificado',
      valor: 'Não identificado'
    });
  }

  // 4. Data de vencimento
  if (dados.vencimento) {
    verificacoes.push({
      item: 'Vencimento',
      status: 'ok',
      detalhe: 'Data identificada no documento',
      valor: dados.vencimento
    });
  } else {
    verificacoes.push({
      item: 'Vencimento',
      status: 'alerta',
      detalhe: 'Data não identificada',
      valor: 'Não identificado'
    });
  }

  // 5. CNPJ do beneficiário
  if (dados.beneficiario_cnpj || dados.beneficiarioCnpj) {
    const cnpj = dados.beneficiario_cnpj || dados.beneficiarioCnpj;
    verificacoes.push({
      item: 'CNPJ do Beneficiário',
      status: 'ok',
      detalhe: 'CNPJ extraído do boleto',
      valor: cnpj
    });
  }

  // 6. Validação FEBRABAN
  if (validacao.valido !== undefined) {
    const errosCount = validacao.erros?.length || 0;
    verificacoes.push({
      item: 'Regras FEBRABAN',
      status: validacao.valido ? 'ok' : 'erro',
      detalhe: validacao.valido 
        ? 'Todas as regras bancárias foram atendidas'
        : `Encontrado${errosCount > 1 ? 's' : ''} ${errosCount} erro${errosCount > 1 ? 's' : ''}`,
      valor: validacao.valido ? '✓ Válido' : '✗ Inválido'
    });
  }

  // 7. Análise de Inteligência Artificial
  if (fraudeAnalise && fraudeAnalise.classe_predita !== undefined) {
    const ehAutentico = fraudeAnalise.classe_predita === 1;
    const confiancaML = Math.round((fraudeAnalise.confianca || 0) * 100);
    
    verificacoes.push({
      item: 'Inteligência Artificial',
      status: ehAutentico ? 'ok' : 'erro',
      detalhe: `Modelo treinado com milhares de boletos reais`,
      valor: ehAutentico ? `✓ Autêntico (${confiancaML}%)` : `✗ Suspeito (${confiancaML}%)`
    });
  }

  // Calcular score geral
  const checksOk = verificacoes.filter(v => v.status === 'ok').length;
  const totalChecks = verificacoes.length;
  const scoreGeral = totalChecks > 0 ? Math.round((checksOk / totalChecks) * 100) : 0;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F5F5F5' }}>
      {/* Header com Logo */}
      <Box sx={{ bgcolor: '#FCFC30', py: 2, px: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ textAlign: 'center', flex: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#465EFF' }}>
            DetectaBB
          </Typography>
          <Typography variant="body2" sx={{ color: '#465EFF', fontSize: '0.875rem' }}>
            Detector de Boletos Falsos
          </Typography>
        </Box>
        
        {/* Botão de Ajuda */}
        <Button
          onClick={() => navigate('/ajuda')}
          sx={{
            minWidth: 'auto',
            width: 32,
            height: 32,
            borderRadius: '50%',
            bgcolor: '#465EFF',
            color: '#FCFC30',
            fontSize: '1rem',
            fontWeight: 700,
            '&:hover': {
              bgcolor: '#465EFF',
              opacity: 0.9
            }
          }}
        >
          ?
        </Button>
      </Box>

      <Container maxWidth="sm" sx={{ py: 4 }}>
        {/* Card Principal - Compacto */}
        <Card 
          sx={{ 
            mb: 3, 
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
          }}
        >
          {/* Score */}
          <Box
            sx={{
              bgcolor: isFraud ? '#FFE5E5' : '#E8F5E9',
              py: 2,
              textAlign: 'center',
              position: 'relative'
            }}
          >
            {/* Ícone de fundo decorativo */}
            <Box
              sx={{
                position: 'absolute',
                top: -10,
                right: -10,
                opacity: 0.08,
                fontSize: '120px'
              }}
            >
              {isFraud ? '⚠️' : '✓'}
            </Box>

            {/* Ícone principal */}
            {isFraud ? (
              <WarningIcon sx={{ fontSize: 50, color: '#E00000', mb: 0.5 }} />
            ) : (
              <CheckCircleIcon sx={{ fontSize: 50, color: '#00AA13', mb: 0.5 }} />
            )}
            
            {/* Score */}
            <Typography 
              variant="h1" 
              sx={{ 
                fontSize: '2.5rem',
                fontWeight: 800, 
                color: isFraud ? '#E00000' : '#00AA13',
                mb: 0.5,
                textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              {scoreGeral}%
            </Typography>
            
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
              {checksOk} de {totalChecks} verificações aprovadas
            </Typography>
          </Box>

          {/* Mensagem */}
          <Box 
            sx={{ 
              bgcolor: isFraud ? '#E00000' : '#00AA13',
              py: 1.5,
              px: 3,
              textAlign: 'center'
            }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'white',
                fontWeight: 700,
                mb: 0.3,
                fontSize: '1.1rem'
              }}
            >
              {isFraud ? '✗ Boleto Possivelmente Falso' : '✓ Boleto Possivelmente Autêntico'}
            </Typography>
            <Typography variant="body2" sx={{ color: 'white', opacity: 0.95, fontSize: '0.8rem' }}>
              {isFraud 
                ? 'Atenção! Este boleto pode ser falso. Evite realizar o pagamento.' 
                : 'Este boleto passou pelas verificações básicas.'
              }
            </Typography>
          </Box>
        </Card>

        {/* Card de Verificações */}
        <Card sx={{ mb: 3, borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <Box sx={{ bgcolor: '#0033A0', px: 3, py: 2 }}>
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>
               Verificações Realizadas
            </Typography>
          </Box>
          <Box sx={{ p: 3 }}>
            {verificacoes.length > 0 ? (
              verificacoes.map((v, index) => (
                <Box 
                  key={index} 
                  sx={{ 
                    mb: 2, 
                    pb: 2, 
                    borderBottom: index < verificacoes.length - 1 ? '1px solid #E0E0E0' : 'none',
                    display: 'flex',
                    gap: 2,
                    alignItems: 'flex-start'
                  }}
                >
                  {/* Ícone de status */}
                  <Box sx={{ 
                    bgcolor: v.status === 'ok' ? '#00AA13' : v.status === 'erro' ? '#E00000' : '#FF9800',
                    borderRadius: '50%',
                    width: 36,
                    height: 36,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    mt: 0.5,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                  }}>
                    {v.status === 'ok' ? (
                      <CheckIcon sx={{ color: 'white', fontSize: 22 }} />
                    ) : (
                      <CloseIcon sx={{ color: 'white', fontSize: 22 }} />
                    )}
                  </Box>

                  {/* Conteúdo */}
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
                      {v.item}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      {v.detalhe}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      fontFamily: v.item === 'Linha Digitável' ? 'monospace' : 'inherit',
                      fontSize: v.item === 'Linha Digitável' ? '0.75rem' : '0.875rem',
                      color: '#465EFF',
                      fontWeight: 600,
                      wordBreak: 'break-all'
                    }}>
                      {v.valor}
                    </Typography>
                  </Box>
                </Box>
              ))
            ) : (
              <Alert severity="warning">
                Não foi possível realizar as verificações. Tente enviar o boleto novamente.
              </Alert>
            )}
          </Box>
        </Card>

        {/* Alert Login */}
        {!isAuthenticated && (
          <Alert 
            severity="info" 
            sx={{ 
              mb: 3, 
              borderRadius: '16px',
              '& .MuiAlert-message': { width: '100%' }
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
             Crie uma conta gratuita
            </Typography>
            <Typography variant="body2" component="div" sx={{ mb: 2 }}>
              • Histórico completo de análises<br/>
              • Análises ilimitadas<br/>
              • Relatórios em PDF
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button 
                variant="contained" 
                size="small" 
                onClick={() => navigate('/login')} 
                sx={{ borderRadius: '25px', textTransform: 'none', bgcolor: '#465EFF', flex: 1 }}
              >
                Entrar
              </Button>
              <Button 
                variant="outlined" 
                size="small" 
                onClick={() => navigate('/register')} 
                sx={{ borderRadius: '25px', textTransform: 'none', borderColor: '#465EFF', color: '#465EFF', flex: 1 }}
              >
                Criar Conta
              </Button>
            </Box>
          </Alert>
        )}

        {/* Botão Nova Análise */}
        <Button
          variant="contained"
          fullWidth
          size="large"
          startIcon={<UploadIcon />}
          onClick={() => navigate('/upload')}
          sx={{
            borderRadius: '25px',
            textTransform: 'none',
            fontSize: '16px',
            fontWeight: 700,
            py: 2,
            bgcolor: '#FCFC30',
            color: '#465EFF',
            boxShadow: '0 4px 12px rgba(252,252,48,0.3)',
            '&:hover': { 
              bgcolor: '#FCFC30',
              opacity: 0.9,
              boxShadow: '0 6px 16px rgba(252,252,48,0.4)'
            }
          }}
        >
          Nova Análise
        </Button>
      </Container>
    </Box>
  );
};

export default Result;