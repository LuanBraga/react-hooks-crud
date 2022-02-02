import ResponsiveAppBar from './components/responsive-app-bar.component'
import './App.css';

import { Container, createTheme, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';

import Tutorial from './components/tutorial.component';
import AddTutorial from './components/add-tutorial.component';
import TutorialList from './components/tutorials-list.component';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ResponsiveAppBar />
      <Container maxWidth="sm">
        <Routes>
          <Route path={'/tutorial'} element={<Tutorial />}/>
          <Route path='/add' element={<AddTutorial />}/>
          <Route path='/tutorials/:id' element={<TutorialList />}/>
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
