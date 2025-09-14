// Modern eco-friendly color palette
export const theme = {
  colors: {
    primary: '#FF6B6B',     // Coral Pink - Main accent color
    secondary: '#4ECDC4',   // Turquoise - Secondary accent
    accent: '#FFE66D',      // Soft Yellow - Highlights and accents
    success: '#95E1D3',     // Mint Green - Success states
    warning: '#FFB174',     // Soft Orange - Warning states
    error: '#FF8080',       // Soft Red - Error states
    
    // Background colors
    background: {
      primary: '#FFFFFF',
      secondary: '#F8F9FA',
      tertiary: '#F1F3F5',
    },
    
    // Text colors
    text: {
      primary: '#2D3436',
      secondary: '#636E72',
      light: '#B2BEC3',
    },

    // Gradient combinations
    gradients: {
      primary: 'linear-gradient(45deg, #FF6B6B, #FFB174)',
      secondary: 'linear-gradient(45deg, #4ECDC4, #95E1D3)',
      accent: 'linear-gradient(45deg, #FFE66D, #FFB174)',
    },
  },

  // Shadows
  shadows: {
    small: '0 2px 8px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 12px rgba(0, 0, 0, 0.15)',
    large: '0 8px 24px rgba(0, 0, 0, 0.15)',
    colored: '0 4px 15px rgba(255, 107, 107, 0.2)',
  },

  // Border radius
  borderRadius: {
    small: '0.5rem',
    medium: '1rem',
    large: '1.5rem',
    circle: '50%',
  },

  // Transitions
  transitions: {
    default: 'all 0.3s ease',
    fast: 'all 0.2s ease',
    slow: 'all 0.4s ease',
  },

  // Animations
  animations: `
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes scaleUp {
      from {
        transform: scale(0.95);
      }
      to {
        transform: scale(1);
      }
    }
  `,
};

// Common style mixins
export const mixins = {
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  card: {
    background: theme.colors.background.primary,
    borderRadius: theme.borderRadius.medium,
    boxShadow: theme.shadows.small,
    padding: '1.5rem',
    transition: theme.transitions.default,
  },

  button: {
    background: theme.colors.gradients.primary,
    color: '#FFFFFF',
    border: 'none',
    borderRadius: theme.borderRadius.medium,
    padding: '0.8rem 1.5rem',
    cursor: 'pointer',
    transition: theme.transitions.default,
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: theme.shadows.colored,
    },
    '&:active': {
      transform: 'translateY(1px)',
    },
  },

  input: {
    width: '100%',
    padding: '0.8rem',
    borderRadius: theme.borderRadius.small,
    border: `2px solid ${theme.colors.text.light}`,
    transition: theme.transitions.default,
    '&:focus': {
      borderColor: theme.colors.primary,
      boxShadow: `0 0 0 3px ${theme.colors.primary}20`,
      outline: 'none',
    },
  },
};