import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './components/pages/NotFound.jsx';
import Login from './components/pages/Login.jsx';
import Chat from './components/pages/Chat.jsx';
import Header from './components/Header.jsx';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Header /> 
      <Routes>
        <Route path="/" element={<Chat/>} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
