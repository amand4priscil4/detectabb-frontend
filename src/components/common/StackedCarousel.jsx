import { useState, useRef } from 'react';
import {
  Box,
  Card,
  useTheme,
  useMediaQuery
} from '@mui/material';

const StackedCarousel = ({ items = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStartY, setDragStartY] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Dados de exemplo - 3 cards
  const cards = items.length > 0 ? items : [
    { id: 1, color: '#465EFF', title: 'Card 1' },
    { id: 2, color: '#FCFC30', title: 'Card 2' },
    { id: 3, color: '#FF6B6B', title: 'Card 3' }
  ];

  // Handlers para swipe/drag vertical
  const handleDragStart = (e) => {
    e.preventDefault();
    const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
    setDragStartY(clientY);
    setIsDragging(true);
  };

  const handleDragMove = (e) => {
    if (!isDragging || dragStartY === null) return;

    const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
    const diff = dragStartY - clientY;
    setDragOffset(diff);
  };

  const handleDragEnd = (e) => {
    if (!isDragging || dragStartY === null) return;

    const clientY = e.type === 'touchend' ? e.changedTouches[0].clientY : e.clientY;
    const diff = dragStartY - clientY;
    const threshold = 80; // Mínimo de pixels para considerar um swipe

    if (Math.abs(diff) > threshold) {
      if (diff > 0 && currentIndex < cards.length - 1) {
        // Arrastar para cima - próximo card
        setCurrentIndex((prev) => prev + 1);
      } else if (diff < 0 && currentIndex > 0) {
        // Arrastar para baixo - card anterior
        setCurrentIndex((prev) => prev - 1);
      }
    }

    setDragStartY(null);
    setDragOffset(0);
    setIsDragging(false);
  };

  // Calcular posição e estilo de cada card no layout vertical
  const getCardStyle = (index) => {
    const relativeIndex = index - currentIndex;
    const peekAmount = isMobile ? 60 : 80; // Quanto do próximo card é visível
    const scaleStep = 0.05; // Redução de escala por card

    // Card ativo (topo)
    if (relativeIndex === 0) {
      const dragY = isDragging ? -dragOffset : 0;
      return {
        zIndex: 100 - index,
        transform: `translateY(${dragY}px) scale(${1 - Math.abs(dragOffset) / 1000})`,
        opacity: 1,
        top: 0,
        pointerEvents: 'auto'
      };
    }

    // Cards abaixo do ativo (parcialmente visíveis)
    if (relativeIndex > 0 && relativeIndex <= 2) {
      const baseOffset = peekAmount * relativeIndex;
      const dragY = isDragging ? -dragOffset * 0.3 : 0;
      const scale = 1 - (scaleStep * relativeIndex);

      return {
        zIndex: 100 - index,
        transform: `translateY(${baseOffset + dragY}px) scale(${scale})`,
        opacity: 1 - (relativeIndex * 0.2),
        top: 0,
        pointerEvents: 'none'
      };
    }

    // Cards muito abaixo (escondidos)
    if (relativeIndex > 2) {
      return {
        zIndex: 100 - index,
        transform: `translateY(${peekAmount * 3}px) scale(0.85)`,
        opacity: 0,
        top: 0,
        pointerEvents: 'none'
      };
    }

    // Cards acima (já passados, escondidos)
    if (relativeIndex < 0) {
      return {
        zIndex: 100 - index,
        transform: 'translateY(-100%) scale(0.9)',
        opacity: 0,
        top: 0,
        pointerEvents: 'none'
      };
    }

    return {
      zIndex: 100 - index,
      transform: 'translateY(0) scale(1)',
      opacity: 0,
      top: 0,
      pointerEvents: 'none'
    };
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: '600px',
        height: isMobile ? '500px' : '600px',
        margin: '0 auto',
        userSelect: 'none',
        overflow: 'hidden'
      }}
    >
      {/* Container dos cards */}
      <Box
        ref={containerRef}
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          touchAction: 'none'
        }}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={() => {
          if (isDragging) {
            handleDragEnd({ clientY: dragStartY });
          }
        }}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        {cards.map((card, index) => {
          const style = getCardStyle(index);
          const relativeIndex = index - currentIndex;

          // Renderizar apenas cards visíveis para performance
          if (relativeIndex < -1 || relativeIndex > 3) {
            return null;
          }

          return (
            <Card
              key={card.id}
              sx={{
                position: 'absolute',
                left: '50%',
                width: isMobile ? '90%' : '85%',
                maxWidth: '500px',
                height: isMobile ? '380px' : '450px',
                borderRadius: '24px',
                cursor: isDragging ? 'grabbing' : 'grab',
                transition: isDragging
                  ? 'none'
                  : 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transformOrigin: 'center top',
                willChange: 'transform, opacity',
                boxShadow: relativeIndex === 0
                  ? '0 20px 60px rgba(0,0,0,0.25)'
                  : '0 10px 30px rgba(0,0,0,0.15)',
                marginLeft: '-50%',
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
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: card.color === '#FCFC30' ? '#465EFF' : 'white',
                  padding: 3,
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Número do card */}
                <Box
                  sx={{
                    fontSize: isMobile ? '72px' : '96px',
                    fontWeight: 900,
                    textShadow: '0 4px 20px rgba(0,0,0,0.2)',
                    mb: 2
                  }}
                >
                  {index + 1}
                </Box>

                {/* Título do card */}
                <Box
                  sx={{
                    fontSize: isMobile ? '20px' : '24px',
                    fontWeight: 600,
                    textAlign: 'center'
                  }}
                >
                  {card.title}
                </Box>

                {/* Indicador de arrasto */}
                {relativeIndex === 0 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 20,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 0.5,
                      opacity: 0.5,
                      animation: currentIndex < cards.length - 1 ? 'bounce 2s infinite' : 'none',
                      '@keyframes bounce': {
                        '0%, 20%, 50%, 80%, 100%': {
                          transform: 'translateX(-50%) translateY(0)'
                        },
                        '40%': {
                          transform: 'translateX(-50%) translateY(-10px)'
                        },
                        '60%': {
                          transform: 'translateX(-50%) translateY(-5px)'
                        }
                      }
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 3,
                        bgcolor: 'currentColor',
                        borderRadius: 2,
                        mb: 0.5
                      }}
                    />
                    {currentIndex < cards.length - 1 && (
                      <Box
                        sx={{
                          fontSize: '12px',
                          fontWeight: 500,
                          letterSpacing: 1
                        }}
                      >
                        Arraste
                      </Box>
                    )}
                  </Box>
                )}
              </Box>
            </Card>
          );
        })}
      </Box>

      {/* Indicador de progresso lateral */}
      <Box
        sx={{
          position: 'absolute',
          right: 10,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          zIndex: 200
        }}
      >
        {cards.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrentIndex(index)}
            sx={{
              width: 8,
              height: currentIndex === index ? 24 : 8,
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
