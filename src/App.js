import { BrowserRouter } from 'react-router-dom';
import Router from './Router/Router';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </BrowserRouter>
  );
}

const GlobalStyle = createGlobalStyle`
  html {
        font-size: 16px;
    }

  body {
    margin: 0;
    padding: 0;
  }
`;

const theme = {
  color: {
    primary: '#FFB2B2',
  },
  size: {
    sm: '20px',
    md: '50px',
    lg: '100px',
  },
};

export default App;
