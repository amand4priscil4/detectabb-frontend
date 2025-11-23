import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Security as SecurityIcon,
  Info as InfoIcon
} from '@mui/icons-material';

const Ajuda = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F5F5F5' }}>
      {/* Header */}
      <Box sx={{ bgcolor: '#FCFC30', py: 2, px: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          onClick={() => navigate(-1)}
          sx={{
            minWidth: 'auto',
            width: 40,
            height: 40,
            borderRadius: '50%',
            bgcolor: '#465EFF',
            color: 'white',
            '&:hover': { bgcolor: '#3549E0' }
          }}
        >
          <ArrowBackIcon />
        </Button>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#465EFF' }}>
            Central de Ajuda
          </Typography>
          <Typography variant="body2" sx={{ color: '#465EFF' }}>
            Entenda como funciona a análise
          </Typography>
        </Box>
      </Box>

      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* Card Introdução */}
        <Card sx={{ mb: 3, p: 3, borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <SecurityIcon sx={{ fontSize: 40, color: '#465EFF' }} />
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#465EFF' }}>
              Como funciona o DetectaBB?
            </Typography>
          </Box>
          <Typography variant="body1" paragraph>
            O DetectaBB usa <strong>Inteligência Artificial</strong> e as <strong>regras da FEBRABAN</strong> 
            (Federação Brasileira de Bancos) para analisar boletos e identificar possíveis fraudes.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Nossa análise combina múltiplas camadas de verificação para garantir a segurança dos seus pagamentos.
          </Typography>
        </Card>

        {/* Seção FEBRABAN */}
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#465EFF', mb: 2 }}>
          O que é FEBRABAN?
        </Typography>

        <Card sx={{ mb: 3, borderRadius: '16px', overflow: 'hidden' }}>
          <Box sx={{ bgcolor: '#465EFF', p: 2 }}>
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>
              Padrão FEBRABAN de Boletos
            </Typography>
          </Box>
          <Box sx={{ p: 3 }}>
            <Typography variant="body1" paragraph>
              A <strong>FEBRABAN</strong> (Federação Brasileira de Bancos) estabelece regras técnicas 
              obrigatórias para todos os boletos bancários no Brasil, incluindo:
            </Typography>
            
            <Box component="ul" sx={{ pl: 3 }}>
              <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                <strong>Linha digitável:</strong> Deve ter exatamente 47 dígitos
              </Typography>
              <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                <strong>Código de barras:</strong> 44 dígitos no padrão específico
              </Typography>
              <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                <strong>Dígitos verificadores:</strong> Cálculos matemáticos para validar autenticidade
              </Typography>
              <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                <strong>Código do banco:</strong> Primeiros 3 dígitos identificam o banco emissor
              </Typography>
              <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                <strong>Código da moeda:</strong> Sempre "9" para Real (R$)
              </Typography>
            </Box>

            <Alert severity="info" sx={{ mt: 2 }}>
              <Typography variant="body2">
                <strong>Importante:</strong> Qualquer boleto que não siga essas regras pode ser falso!
              </Typography>
            </Alert>
          </Box>
        </Card>

        {/* Verificações do Sistema */}
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#465EFF', mb: 2 }}>
          O que verificamos
        </Typography>

        <Card sx={{ mb: 3, borderRadius: '16px' }}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CheckCircleIcon sx={{ color: '#00AA13' }} />
                <Typography sx={{ fontWeight: 600 }}>1. Linha Digitável</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary" paragraph>
                Verificamos se a linha digitável possui <strong>47 dígitos</strong> e se está no formato correto 
                (5 campos separados).
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Exemplo válido:</strong><br/>
                <code style={{ fontSize: '0.75rem' }}>12345.67890 12345.678901 12345.678901 1 12345678901234</code>
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CheckCircleIcon sx={{ color: '#00AA13' }} />
                <Typography sx={{ fontWeight: 600 }}>2. Código do Banco</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary" paragraph>
                Os primeiros 3 dígitos identificam o banco. Verificamos se o código existe e é válido.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Exemplos:</strong> 001 (Banco do Brasil), 237 (Bradesco), 341 (Itaú), 104 (Caixa)
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CheckCircleIcon sx={{ color: '#00AA13' }} />
                <Typography sx={{ fontWeight: 600 }}>3. Valor do Boleto</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                Verificamos se o valor está em uma faixa esperada e se não há inconsistências 
                entre o valor informado e o codificado na linha digitável.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CheckCircleIcon sx={{ color: '#00AA13' }} />
                <Typography sx={{ fontWeight: 600 }}>4. Dígitos Verificadores</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                Calculamos matematicamente se os dígitos verificadores estão corretos usando o 
                <strong> Módulo 10 e Módulo 11</strong>, conforme regras da FEBRABAN.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <SecurityIcon sx={{ color: '#465EFF' }} />
                <Typography sx={{ fontWeight: 600 }}>5. Inteligência Artificial</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                Nosso modelo de IA foi treinado com <strong>milhares de boletos reais</strong> para 
                identificar padrões de fraude que não são detectáveis apenas pelas regras formais.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Card>

        {/* Dicas para Identificar Boletos Falsos */}
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#E00000', mb: 2 }}>
          Como identificar boletos falsos
        </Typography>

        <Card sx={{ mb: 3, p: 3, borderRadius: '16px', border: '2px solid #E00000' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#E00000', mb: 2 }}>
            ⚠️ Sinais de Alerta
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <WarningIcon sx={{ color: '#E00000', flexShrink: 0 }} />
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  1. Banco desconhecido ou código inválido
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Se o código do banco não corresponder a nenhum banco real, é fraude!
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <WarningIcon sx={{ color: '#E00000', flexShrink: 0 }} />
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  2. Valor diferente do combinado
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sempre confira se o valor do boleto corresponde ao que foi acordado
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <WarningIcon sx={{ color: '#E00000', flexShrink: 0 }} />
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  3. Boleto enviado por e-mail suspeito
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Cuidado com e-mails de remetentes desconhecidos ou com erros de português
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <WarningIcon sx={{ color: '#E00000', flexShrink: 0 }} />
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  4. Dados do beneficiário estranhos
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Verifique se o CNPJ e nome da empresa são realmente da empresa que você conhece
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <WarningIcon sx={{ color: '#E00000', flexShrink: 0 }} />
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  5. Linha digitável com números errados
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  A linha deve ter exatamente 47 dígitos. Menos ou mais que isso é suspeito!
                </Typography>
              </Box>
            </Box>
          </Box>
        </Card>

        {/* Boas Práticas */}
        <Card sx={{ mb: 3, p: 3, borderRadius: '16px', bgcolor: '#E8F5E9' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#00AA13', mb: 2 }}>
            ✅ Boas Práticas de Segurança
          </Typography>

          <Box component="ol" sx={{ pl: 3 }}>
            <Typography component="li" variant="body2" sx={{ mb: 1 }}>
              Sempre solicite o boleto diretamente no site oficial da empresa
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1 }}>
              Desconfie de boletos recebidos por WhatsApp ou e-mail não solicitados
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1 }}>
              Verifique o CNPJ da empresa no site da Receita Federal
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1 }}>
              Confirme o valor, vencimento e dados do beneficiário antes de pagar
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1 }}>
              Em caso de dúvida, entre em contato diretamente com a empresa
            </Typography>
            <Typography component="li" variant="body2">
              Use sempre o DetectaBB para analisar boletos antes de pagar! 🛡️
            </Typography>
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

export default Ajuda;