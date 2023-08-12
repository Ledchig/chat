import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { loadChannels } from '../slices/channelsSlice';
import { useAuthContext } from '../hooks/index';
import Channels from './Channels';
import Messages from './Messages';
import ModalComponent from './Modals';
import routes from '../routes';

const Chat = () => {
  const { t } = useTranslation();
  const auth = useAuthContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fetched, setFetched] = useState(false);
  useEffect(
    () => {
      const fetchChat = async (token) => {
        try {
          const { data } = await axios.get(routes.dataPath(), {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          dispatch(loadChannels(data));
          setFetched(true);
        } catch (error) {
          if (!error.isAxiosError) {
            toast.error(t('errors.unknown'));
            return;
          }
          if (error.response.status === 401) {
            navigate(routes.loginPagePath());
          } else {
            toast.error(t('errors.network'));
          }
        }
      };
      fetchChat(auth.user.token);
    },
    [auth, dispatch, navigate, t],
  );

  return (
    fetched
      ? (
        <Container className="h-100 my-4 overflow-hidden rounded shadow">
          <ModalComponent />
          <Row className="h-100 bg-white flex-md-row">
            <Channels />
            <Messages />
          </Row>
        </Container>
      )
      : null
  );
};

export default Chat;
