import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

import { defaultTheme } from './styles/themes/default';
import { GlobalStyle } from './styles/global';
import { Router } from './Router';
import { PostProvider } from './context/PostContext';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <PostProvider>
          <Router />
        </PostProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default App
