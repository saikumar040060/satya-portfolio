import ThemeProvider from './ThemeProvider';
import HomePage from './HomePage';

function App() {
  return (
    <ThemeProvider>
      <HomePage />
    </ThemeProvider>
  );
}

export default App;