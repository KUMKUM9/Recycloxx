import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  ${theme.animations}

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: ${theme.colors.background.secondary};
    color: ${theme.colors.text.primary};
    line-height: 1.6;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${theme.colors.text.primary};
    margin-bottom: 1rem;
    font-weight: 600;
  }

  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    transition: ${theme.transitions.default};

    &:hover {
      color: ${theme.colors.secondary};
    }
  }

  button {
    font-family: inherit;
  }

  input, textarea, select {
    font-family: inherit;
  }

  // Animation classes
  .fadeIn {
    animation: fadeIn 0.5s ease-out;
  }

  .slideDown {
    animation: slideDown 0.5s ease-out;
  }

  .scaleUp {
    animation: scaleUp 0.3s ease-out;
  }
`;