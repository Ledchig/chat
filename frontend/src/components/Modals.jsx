import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../slices/modalSliice";
import { useSocketContext } from "../context";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import leoProfanity from 'leo-profanity';

const NewChannelModal = () => {
  const { t } = useTranslation();
  const { addChannel } = useSocketContext();
  const { isOpened } = useSelector((state) => state.modal);
  const { channels } = useSelector((state) => state.channelsInfo);
  const channelsNames = channels.map((channel) => channel.name);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup
      .string()
      .trim()
      .required('modals.required')
      .min(3, 'modals.min')
      .max(20, 'modals.max')
      .notOneOf(channelsNames, 'modals.uniq'),
    }),
    onSubmit: async ({ name }) => {
      const cleanedName = leoProfanity.clean(name);
      const channel = { name: cleanedName };
      try {
      await addChannel(channel);
      toast.success(t('channels.created'));
      formik.resetForm();
      handleClose();
      } catch(error) {
        if (!error.isAxiosError) {
          toast.error(t('errors.unknown'));
          return;
        } else {
          toast.error(t('errors.network'));
        }
      }
    },
  });

  const handleClose = () => {
    dispatch(closeModal())
  };

  return (
      <Modal show={isOpened} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('modals.add')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group>
              <Form.Control
                name='name'
                id='name'
                className="mb-2"
                disabled={formik.isSubmitting}
                value={formik.values.name}
                onChange={formik.handleChange}
                autoFocus
                isInvalid={(formik.errors.name && formik.touched.name)}
              />
              <label htmlFor="name"></label>
              <Form.Control.Feedback type="invalid">
              {t(formik.errors.name)}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t('modals.cancel')}
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit}>
            {t('modals.submit')}
          </Button>
        </Modal.Footer>
      </Modal>
  );
};

const RemoveChannelModal = () => {
  const { t } = useTranslation();
  const { removeChannel } = useSocketContext();
  const { isOpened } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const id = useSelector(state => state.modal.extra);

  const handleRemove = async () => {
      try {
      await removeChannel({ id });
      toast.success(t('channels.removed'));
      handleClose();
      } catch(error) {
        if (!error.isAxiosError) {
          toast.error(t('errors.unknown'));
          return;
        } else {
          toast.error(t('errors.network'));
        }
      }
    };

  const handleClose = () => {
    dispatch(closeModal())
  };

  return (
    <>
      <Modal show={isOpened} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('modals.remove')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{t('modals.confirmation')}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t('modals.cancel')}
          </Button>
          <Button variant="danger" onClick={handleRemove}>
            {t('modals.confirm')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const RenameChannelModal = () => {
  const { renameChannel } = useSocketContext();
  const { isOpened } = useSelector((state) => state.modal);
  const { channels } = useSelector((state) => state.channelsInfo);
  const id = useSelector((state) => state.modal.extra);
  const channelsNames = channels.map((channel) => channel.name);
  const dispatch = useDispatch();
  const inputRef = useRef();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup
      .string()
      .trim()
      .required("modals.required")
      .min(3, 'modals.min')
      .max(20, 'modals.max')
      .notOneOf(channelsNames, 'modals.uniq'),
    }),
    onSubmit: async ({ name }) => {
      const cleanedName = leoProfanity.clean(name);
      const channel = { name: cleanedName, id };
      try {
      await renameChannel(channel);
      formik.resetForm();
      toast.success(t('channels.renamed'));
      handleClose();
      } catch(error) {
        if (!error.isAxiosError) {
          toast.error(t('errors.unknown'));
          return;
        } else {
          toast.error(t('errors.network'));
        }
      }
    },
  });

  const handleClose = () => {
    dispatch(closeModal())
  };

  useEffect(() => {
    setTimeout(() => inputRef.current.focus());
  }, []);

  return (
      <Modal show={isOpened} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('modals.rename')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group>
              <Form.Control
                name='name'
                id='name'
                className="mb-2"
                disabled={formik.isSubmitting}
                value={formik.values.name}
                onChange={formik.handleChange}
                ref={inputRef}
                isInvalid={formik.errors.name && formik.touched.name}
              />
              <label htmlFor="name"></label>
              <Form.Control.Feedback type="invalid">
                {t(formik.errors.name)}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t('modals.cancel')}
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit}>
            {t('modals.submit')}
          </Button>
        </Modal.Footer>
      </Modal>
  );
};

const map = {
  addChannel: NewChannelModal,
  removeChannel: RemoveChannelModal,
  renameChannel: RenameChannelModal,
};

const ModalComponent = () => {
  const type = useSelector(state => state.modal.type);
  console.log(type);
  const Component = map[type];
  return (Component === undefined ? null : <Component />);
};

export default ModalComponent;