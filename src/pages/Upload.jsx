import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  Typography,
  Button,
  Alert
} from '@mui/material';
import {
  CameraAlt as CameraIcon,
  Image as ImageIcon
} from '@mui/icons-material';
import { validateFile } from '../utils/validation';
import api from '../services/api';
import AnalysisLoadingModal from '../components/common/AnalysisLoadingModal';

const Upload = () => {
  const navigate = useNavigate();
  
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    if (!selectedFile) return;

    const validation = validateFile(selectedFile);
    if (!validation.isValid) {
      setError(validation.errors.join(' '));
      return;
    }

    setFile(selectedFile);
    setError('');

    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }

    // Analisar automaticamente após selecionar
    handleAnalyze(selectedFile);
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'application/pdf': ['.pdf']
    },
    maxSize: 10 * 1024 * 1024,
    multiple: false,
    noClick: true,
    noKeyboard: true
  });

  const handleAnalyze = async (selectedFile) => {
    const fileToAnalyze = selectedFile || file;
    
    if (!fileToAnalyze) {
      setError('Por favor, selecione um arquivo');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', fileToAnalyze);

      // USAR O ENDPOINT CORRETO COM WORKER
      const response = await api.post('/api/analisar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.id) {
        // Salvar ID da análise e redirecionar
        sessionStorage.setItem('lastAnalysisId', response.data.id);
        navigate(`/result/${response.data.id}`);
      }
    } catch (error) {
      console.error('Erro na análise:', error);
      console.error('Response data:', error.response?.data);
      
      if (error.response?.status === 403) {
        setError(error.response.data.detail || 'Limite diário atingido. Faça login para continuar!');
      } else if (error.response?.status === 500) {
        setError(error.response.data.detail || 'Erro interno no servidor. Tente novamente mais tarde.');
      } else {
        setError(error.response?.data?.detail || 'Erro ao processar boleto. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCameraClick = () => {
    // Abrir câmera (input com capture)
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = (e) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        onDrop([files[0]]);
      }
    };
    input.click();
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(180deg, #465EFF 0%, #465EFF 50%, #FCFC30 50%, #FCFC30 100%)',
        position: 'relative'
      }}
    >
      {/* Seção Azul - Upload de Câmera */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          px: 3,
          position: 'relative'
        }}
      >
        {/* Conteúdo centralizado */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center'
          }}
        >
          {/* Ícone de Imagem com + */}
          <Box
            sx={{
              width: 120,
              height: 120,
              bgcolor: 'white',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3,
              position: 'relative',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
          >
            <ImageIcon sx={{ fontSize: 60, color: '#465EFF' }} />
            <Box
              sx={{
                position: 'absolute',
                bottom: -10,
                right: -10,
                width: 40,
                height: 40,
                bgcolor: '#465EFF',
                borderRadius: '50%',
                border: '4px solid white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 'bold',
                color: 'white'
              }}
            >
              +
            </Box>
          </Box>

          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              fontWeight: 500
            }}
          >
            Faça o upload do seu boleto aqui!
          </Typography>
        </Box>

        {/* Botão fixo próximo à divisão */}
        <Button
          variant="contained"
          size="large"
          onClick={handleCameraClick}
          startIcon={<CameraIcon />}
          sx={{
            bgcolor: '#FCFC30',
            color: '#465EFF',
            fontWeight: 600,
            px: 4,
            py: 1.5,
            borderRadius: '8px',
            textTransform: 'none',
            fontSize: '16px',
            mb: 3,
            '&:hover': {
              bgcolor: '#FCFC30',
              opacity: 0.9
            }
          }}
        >
          USE SUA CÂMERA
        </Button>
      </Box>

      {/* Seção Amarela - Upload de Arquivo */}
      <Box
        {...getRootProps()}
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          color: '#465EFF',
          px: 3,
          pt: 4,
          cursor: 'pointer'
        }}
      >
        <input {...getInputProps()} />

        {/* OU */}
        <Typography
          variant="h6"
          sx={{
            mb: 3,
            fontWeight: 600,
            textAlign: 'center',
            color: '#465EFF'
          }}
        >
          ou
        </Typography>

        {/* Ícone de Galeria */}
        <Box
          onClick={open}
          sx={{
            width: 80,
            height: 80,
            border: '3px solid #465EFF',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'transparent',
            cursor: 'pointer',
            mb: 2
          }}
        >
          <ImageIcon sx={{ fontSize: 50, color: '#465EFF' }} />
        </Box>

        <Typography
          variant="body1"
          sx={{
            fontWeight: 600,
            textAlign: 'center',
            mb: 1,
            color: '#465EFF'
          }}
        >
          Selecione o arquivo da sua galeria
        </Typography>
        
        <Typography
          variant="body2"
          sx={{
            textAlign: 'center',
            color: '#465EFF',
            opacity: 0.8
          }}
        >
          PDF, JPEG, JPG ou PNG
        </Typography>
      </Box>

      {/* Error/Loading */}
      {error && (
        <Box sx={{ position: 'fixed', bottom: 20, left: 20, right: 20, zIndex: 1000 }}>
          <Alert severity="error" onClose={() => setError('')}>
            {error}
          </Alert>
        </Box>
      )}

      {file && !loading && (
        <Box sx={{ position: 'fixed', bottom: 20, left: 20, right: 20, zIndex: 1000 }}>
          <Alert severity="success">
            Arquivo selecionado: {file.name}
          </Alert>
        </Box>
      )}

      {/* Modal de Loading da Análise */}
      <AnalysisLoadingModal open={loading} />
    </Box>
  );
};

export default Upload;