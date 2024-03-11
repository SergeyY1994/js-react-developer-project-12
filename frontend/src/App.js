import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './components/pages/NotFound.jsx';
import Login from './components/pages/Login.jsx';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
