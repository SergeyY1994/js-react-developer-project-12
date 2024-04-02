import { useNavigate } from 'react-router-dom';

const Chat = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    if (!token) {
        navigate('/login');
        return null;
    }

    return (
        <h1>Hexlet Chat</h1>
    );
}

export default Chat;