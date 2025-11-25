import { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  IconButton,
  Typography,
  Button,
  Alert
} from '@mui/material';
import {
  Close as CloseIcon,
  CameraAlt as CameraIcon,
  Cameraswitch as FlipCameraIcon,
  CheckCircle as CheckIcon
} from '@mui/icons-material';

const CameraModal = ({ open, onClose, onCapture }) => {
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [error, setError] = useState('');
  const [facingMode, setFacingMode] = useState('environment'); // 'user' ou 'environment'

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Iniciar câmera
  useEffect(() => {
    if (open) {
      startCamera();
    } else {
      stopCamera();
      setCapturedImage(null);
      setError('');
    }

    return () => {
      stopCamera();
    };
  }, [open, facingMode]);

  const startCamera = async () => {
    try {
      setError('');

      // Parar stream anterior se existir
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: false
      });

      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error('Erro ao acessar câmera:', err);
      setError('Não foi possível acessar a câmera. Verifique as permissões.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Configurar tamanho do canvas
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Desenhar frame atual do vídeo no canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Converter para blob
    canvas.toBlob((blob) => {
      const imageUrl = URL.createObjectURL(blob);
      setCapturedImage(imageUrl);
    }, 'image/jpeg', 0.95);
  };

  const handleConfirm = () => {
    if (!capturedImage || !canvasRef.current) return;

    canvasRef.current.toBlob((blob) => {
      const file = new File([blob], `camera-${Date.now()}.jpg`, {
        type: 'image/jpeg'
      });
      onCapture(file);
      handleClose();
    }, 'image/jpeg', 0.95);
  };

  const handleRetake = () => {
    setCapturedImage(null);
    startCamera();
  };

  const handleClose = () => {
    stopCamera();
    setCapturedImage(null);
    setError('');
    onClose();
  };

  const toggleCamera = () => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      fullScreen
      PaperProps={{
        sx: {
          bgcolor: '#000',
          m: 0
        }
      }}
    >
      <DialogContent sx={{ p: 0, position: 'relative', height: '100vh' }}>
        {/* Botão Fechar */}
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 10,
            bgcolor: 'rgba(0,0,0,0.5)',
            color: 'white',
            '&:hover': {
              bgcolor: 'rgba(0,0,0,0.7)'
            }
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Erro */}
        {error && (
          <Box sx={{ position: 'absolute', top: 16, left: 16, right: 80, zIndex: 10 }}>
            <Alert severity="error" onClose={() => setError('')}>
              {error}
            </Alert>
          </Box>
        )}

        {/* Vídeo da câmera */}
        {!capturedImage && (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: '#000'
            }}
          >
            <video
              ref={videoRef}
              autoPlay
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </Box>
        )}

        {/* Imagem capturada */}
        {capturedImage && (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: '#000'
            }}
          >
            <img
              src={capturedImage}
              alt="Captured"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
            />
          </Box>
        )}

        {/* Canvas oculto para captura */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />

        {/* Controles */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            p: 3,
            bgcolor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3
          }}
        >
          {!capturedImage ? (
            <>
              {/* Botão Trocar Câmera */}
              <IconButton
                onClick={toggleCamera}
                sx={{
                  color: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.2)'
                  }
                }}
              >
                <FlipCameraIcon sx={{ fontSize: 32 }} />
              </IconButton>

              {/* Botão Capturar */}
              <IconButton
                onClick={capturePhoto}
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: 'white',
                  border: '4px solid #465EFF',
                  '&:hover': {
                    bgcolor: '#f0f0f0'
                  }
                }}
              >
                <CameraIcon sx={{ fontSize: 40, color: '#465EFF' }} />
              </IconButton>

              <Box sx={{ width: 56 }} /> {/* Espaçador para centralizar */}
            </>
          ) : (
            <>
              {/* Botão Refazer */}
              <Button
                onClick={handleRetake}
                variant="contained"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  borderRadius: '25px',
                  textTransform: 'none',
                  fontSize: '16px',
                  fontWeight: 600,
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.3)'
                  }
                }}
              >
                Refazer
              </Button>

              {/* Botão Confirmar */}
              <Button
                onClick={handleConfirm}
                variant="contained"
                startIcon={<CheckIcon />}
                sx={{
                  bgcolor: '#4CAF50',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  borderRadius: '25px',
                  textTransform: 'none',
                  fontSize: '16px',
                  fontWeight: 600,
                  '&:hover': {
                    bgcolor: '#45a049'
                  }
                }}
              >
                Usar Foto
              </Button>
            </>
          )}
        </Box>

        {/* Instruções */}
        {!capturedImage && !error && (
          <Box
            sx={{
              position: 'absolute',
              top: 80,
              left: '50%',
              transform: 'translateX(-50%)',
              bgcolor: 'rgba(0,0,0,0.7)',
              px: 3,
              py: 1.5,
              borderRadius: '8px',
              zIndex: 5
            }}
          >
            <Typography
              sx={{
                color: 'white',
                fontSize: '14px',
                textAlign: 'center'
              }}
            >
              Posicione o boleto no centro da tela
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CameraModal;
