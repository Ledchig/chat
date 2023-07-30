import { Navbar, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/index.js';
import { useTranslation } from 'react-i18next';

const Header = () => {
    const { t } = useTranslation();
    const { logOut, user } = useAuthContext();
    const navigate = useNavigate();
    const handlerClick = () => {
        logOut();
        navigate('/');
    };
    
    return (
        <Navbar bg='white' expand='lg' className='shadow-sm'>
            <Container>
                <Navbar.Brand as={Link} to='/'>
                {t('hexletChat')}
                </Navbar.Brand>
                {user ? <Button type='button' className='btn btn-primary' onClick={handlerClick}>{t('logout')}</Button> : null}
            </Container>
        </Navbar>
    );
};

export default Header;