import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  CircularProgress,
  LinearProgress
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  Biotech as AnalyzeIcon
} from '@mui/icons-material';
import { useState, useEffect } from 'react';

const AnalysisLoadingModal = ({ open }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { label: 'Processando imagem...', duration: 2000 },
    { label: 'Extraindo dados do boleto...', duration: 2500 },
    { label: 'Analisando autenticidade...', duration: 2000 },
    { label: 'Verificando padrões suspeitos...', duration: 1500 },
    { label: 'Finalizando análise...', duration: 1000 }
  ];

  useEffect(() => {
    if (!open) {
      setProgress(0);
      setCurrentStep(0);
      return;
    }

    const totalDuration = steps.reduce((acc, step) => acc + step.duration, 0);
    let elapsed = 0;
    let stepIndex = 0;
    let stepElapsed = 0;

    const interval = setInterval(() => {
      elapsed += 100;
      stepElapsed += 100;

      // Calcular progresso geral
      setProgress((elapsed / totalDuration) * 100);

      // Mudar de step
      if (stepElapsed >= steps[stepIndex].duration && stepIndex < steps.length - 1) {
        stepIndex++;
        stepElapsed = 0;
        setCurrentStep(stepIndex);
      }

      // Limpar quando completar
      if (elapsed >= totalDuration) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [open]);

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          bgcolor: 'white',
          boxShadow: '0 8px 32px rgba(70, 94, 255, 0.2)'
        }
      }}
    >
      <DialogContent sx={{ p: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3
          }}
        >
          {/* Ícone animado */}
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress
              size={100}
              thickness={3}
              sx={{
                color: '#465EFF',
                animationDuration: '1.5s'
              }}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <AnalyzeIcon sx={{ fontSize: 50, color: '#465EFF' }} />
            </Box>
          </Box>

          {/* Título */}
          <Typography
            variant="h5"
            sx={{
              color: '#465EFF',
              fontWeight: 700,
              textAlign: 'center'
            }}
          >
            Analisando seu boleto
          </Typography>

          {/* Barra de progresso */}
          <Box sx={{ width: '100%' }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: '#E8EBFF',
                '& .MuiLinearProgress-bar': {
                  bgcolor: '#465EFF',
                  borderRadius: 4
                }
              }}
            />
            <Typography
              variant="body2"
              sx={{
                mt: 1,
                textAlign: 'center',
                color: '#666',
                fontWeight: 500
              }}
            >
              {Math.round(progress)}%
            </Typography>
          </Box>

          {/* Steps com animação */}
          <Box sx={{ width: '100%', mt: 2 }}>
            {steps.map((step, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  py: 1,
                  opacity: index <= currentStep ? 1 : 0.3,
                  transition: 'opacity 0.3s ease'
                }}
              >
                {index < currentStep ? (
                  <CheckIcon sx={{ color: '#4CAF50', fontSize: 20 }} />
                ) : index === currentStep ? (
                  <CircularProgress size={20} sx={{ color: '#465EFF' }} />
                ) : (
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      border: '2px solid #ccc'
                    }}
                  />
                )}
                <Typography
                  variant="body2"
                  sx={{
                    color: index <= currentStep ? '#333' : '#999',
                    fontWeight: index === currentStep ? 600 : 400
                  }}
                >
                  {step.label}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Mensagem adicional */}
          <Typography
            variant="body2"
            sx={{
              textAlign: 'center',
              color: '#666',
              fontStyle: 'italic',
              mt: 2
            }}
          >
            Aguarde enquanto verificamos a autenticidade do documento...
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AnalysisLoadingModal;
