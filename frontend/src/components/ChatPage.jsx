import axios from "axios";
import { useDispatch } from 'react-redux';
import { loadChannels } from '../slices/channelsSlice.js';
import { useAuthContext } from '../context/index.js';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';

const Chat = () => {
    const auth = useAuthContext();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [fetched, setFetched] = useState(false);
    useEffect(() => {
        const fetchChat = async (token) => {
        try {
            const { data } = await axios.get('/api/v1/data', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch(loadChannels(data));
            setFetched(true);
        } catch(error) {
            if (error.response.status === 401) {
                navigate('/login');
            } else {
                throw error;
            }
        }
    };
    const { token } = JSON.parse(localStorage.getItem('user'));
    fetchChat(token);
    },
    [auth, dispatch, navigate],
    );
    

    return (
        fetched ? 
        <Container className="h-100 my-4 overflow-hidden rounded shadow">
            <Row className="h-100 bg-white flex-md-row">
                <Channels />
                <Messages />
            </Row>
        </Container>
        : null
    );
};

export default Chat;