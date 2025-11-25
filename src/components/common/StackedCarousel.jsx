import { useState } from 'react';
import {
  Box,
  Card,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';

const StackedCarousel = ({ items = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStart, setDragStart] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Dados de exemplo se não houver items
  const cards = items.length > 0 ? items : [
    { id: 1, color: '#465EFF' },
    { id: 2, color: '#FCFC30' },
    { id: 3, color: '#FF6B6B' }
  ];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  // Handlers para swipe/drag
  const handleDragStart = (e) => {
    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    setDragStart(clientX);
    setIsDragging(true);
  };

  const handleDragEnd = (e) => {
    if (!dragStart) return;

    const clientX = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
    const diff = dragStart - clientX;
    const threshold = 50; // Mínimo de pixels para considerar um swipe

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrevious();
      }
    }

    setDragStart(null);
    setIsDragging(false);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
  };

  // Calcular posição e estilo de cada card
  const getCardStyle = (index) => {
    const diff = (index - currentIndex + cards.length) % cards.length;

    // Card ativo (frontal)
    if (diff === 0) {
      return {
        zIndex: 30,
        transform: 'translateX(0) translateY(0) scale(1) rotateY(0deg)',
        opacity: 1,
        filter: 'brightness(1)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      };
    }

    // Próximo card (direita, parcialmente visível)
    if (diff === 1) {
      return {
        zIndex: 20,
        transform: isMobile
          ? 'translateX(40px) translateY(10px) scale(0.9) rotateY(-8deg)'
          : 'translateX(60px) translateY(15px) scale(0.9) rotateY(-8deg)',
        opacity: 0.6,
        filter: 'brightness(0.8)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
      };
    }

    // Card anterior (esquerda, parcialmente visível)
    if (diff === cards.length - 1) {
      return {
        zIndex: 20,
        transform: isMobile
          ? 'translateX(-40px) translateY(10px) scale(0.9) rotateY(8deg)'
          : 'translateX(-60px) translateY(15px) scale(0.9) rotateY(8deg)',
        opacity: 0.6,
        filter: 'brightness(0.8)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
      };
    }

    // Cards escondidos
    return {
      zIndex: 10,
      transform: 'translateX(0) translateY(20px) scale(0.8)',
      opacity: 0,
      filter: 'brightness(0.7)',
      pointerEvents: 'none'
    };
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: '500px',
        height: isMobile ? '300px' : '400px',
        margin: '0 auto',
        perspective: '1500px',
        userSelect: 'none'
      }}
    >
      {/* Container dos cards */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onMouseMove={handleDragMove}
        onMouseLeave={() => {
          setIsDragging(false);
          setDragStart(null);
        }}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
        onTouchMove={handleDragMove}
      >
        {cards.map((card, index) => {
          const style = getCardStyle(index);

          return (
            <Card
              key={card.id}
              sx={{
                position: 'absolute',
                width: isMobile ? '260px' : '320px',
                height: isMobile ? '280px' : '360px',
                borderRadius: '24px',
                cursor: isDragging ? 'grabbing' : 'grab',
                transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transformStyle: 'preserve-3d',
                willChange: 'transform, opacity',
                ...style
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  background: `linear-gradient(135deg, ${card.color} 0%, ${card.color}dd 100%)`,
                  borderRadius: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: card.color === '#FCFC30' ? '#465EFF' : 'white',
                  fontSize: isMobile ? '48px' : '64px',
                  fontWeight: 900,
                  textShadow: '0 2px 10px rgba(0,0,0,0.1)'
                }}
              >
                {index + 1}
              </Box>
            </Card>
          );
        })}
      </Box>

      {/* Botão Anterior */}
      <IconButton
        onClick={handlePrevious}
        sx={{
          position: 'absolute',
          left: isMobile ? -10 : -20,
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'white',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 40,
          '&:hover': {
            bgcolor: 'white',
            transform: 'translateY(-50%) scale(1.1)',
            boxShadow: '0 6px 16px rgba(0,0,0,0.2)'
          },
          transition: 'all 0.2s ease'
        }}
      >
        <ChevronLeftIcon sx={{ color: '#465EFF', fontSize: 28 }} />
      </IconButton>

      {/* Botão Próximo */}
      <IconButton
        onClick={handleNext}
        sx={{
          position: 'absolute',
          right: isMobile ? -10 : -20,
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'white',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 40,
          '&:hover': {
            bgcolor: 'white',
            transform: 'translateY(-50%) scale(1.1)',
            boxShadow: '0 6px 16px rgba(0,0,0,0.2)'
          },
          transition: 'all 0.2s ease'
        }}
      >
        <ChevronRightIcon sx={{ color: '#465EFF', fontSize: 28 }} />
      </IconButton>

      {/* Indicadores (dots) */}
      <Box
        sx={{
          position: 'absolute',
          bottom: -40,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 1,
          zIndex: 40
        }}
      >
        {cards.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrentIndex(index)}
            sx={{
              width: currentIndex === index ? 24 : 8,
              height: 8,
              borderRadius: '4px',
              bgcolor: currentIndex === index ? '#465EFF' : '#D0D0D0',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: currentIndex === index ? '#465EFF' : '#A0A0A0'
              }
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default StackedCarousel;
