import { Routes, Route } from 'react-router-dom';
// importing general components
import { Navbar, Background } from './components';
import { Login, Register } from './views';
import './App.css';
import 'antd/dist/antd.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Background />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
