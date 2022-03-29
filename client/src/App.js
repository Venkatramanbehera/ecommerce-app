import { BrowserRouter, Routes, Route } from 'react-router-dom';
// importing general components
import { Navbar, Background } from './components';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Background />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
