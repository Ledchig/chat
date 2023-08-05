import { useFormik } from 'formik';
import { Form, InputGroup, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';
import { useAuthContext, useSocketContext } from '../hooks/index';

function InputNewMessage() {
  const { t } = useTranslation();
  const { sendMessage } = useSocketContext();
  const channelId = useSelector((state) => state.channelsInfo.currentChannelId);
  const { user: { username } } = useAuthContext();
  const inputMessageRef = useRef();

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: Yup.object({
      body: Yup.string().trim().required('Required'),
    }),
    onSubmit: async ({ body }) => {
      const cleanedMessage = leoProfanity.clean(body);
      const message = { body: cleanedMessage, username, channelId };
      try {
        await sendMessage(message);
        formik.resetForm();
      } catch (error) {
        if (!error.isAxiosError) {
          toast.error(t('errors.unknown'));
        } else {
          toast.error(t('errors.network'));
        }
      }
    },
  });

  useEffect(() => {
    inputMessageRef.current.focus();
  }, []);

  return (
    <Form className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
      <InputGroup>
        <Form.Control
          className="border-0 p-0 ps-2"
          name="body"
          aria-label="Новое сообщение"
          onChange={formik.handleChange}
          value={formik.values.body}
          disabled={formik.isSubmitting}
          placeholder="Введите сообщение..."
          ref={inputMessageRef}
        />
        <Button
          type="submit"
          variant="vertical"
          disabled={!formik.isValid}
        >
          {t('chat.send')}
        </Button>
      </InputGroup>
    </Form>
  );
}

export default InputNewMessage;
