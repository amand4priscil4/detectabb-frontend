export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  export const validatePassword = (password) => {
    const errors = [];
    
    if (password.length < 8) {
      errors.push('Mínimo 8 caracteres');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Uma letra maiúscula');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Uma letra minúscula');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('Um número');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Um caractere especial');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  };
  
  export const getPasswordStrength = (password) => {
    const validation = validatePassword(password);
    const score = 5 - validation.errors.length;
    
    if (score <= 1) return { label: 'Muito Fraca', color: 'error', value: 20 };
    if (score === 2) return { label: 'Fraca', color: 'warning', value: 40 };
    if (score === 3) return { label: 'Média', color: 'info', value: 60 };
    if (score === 4) return { label: 'Boa', color: 'success', value: 80 };
    return { label: 'Forte', color: 'success', value: 100 };
  };
  
  export const validateFile = (file) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    const maxSize = 10 * 1024 * 1024;
    
    const errors = [];
    
    if (!allowedTypes.includes(file.type)) {
      errors.push('Tipo de arquivo não suportado. Use JPG, PNG ou PDF.');
    }
    
    if (file.size > maxSize) {
      errors.push('Arquivo muito grande. Máximo: 10MB.');
    }
    
    if (file.size === 0) {
      errors.push('Arquivo vazio.');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  };