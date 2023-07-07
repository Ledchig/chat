import { Navbar, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/useAuthContext.js';

const Header = () => {
    const { logOut } = useAuthContext();
    const user = localStorage.getItem('user');
    const navigate = useNavigate();
    const handlerClick = () => {
        logOut();
        navigate('/login');
    };
    
    return (
        <Navbar bg='white' expand='lg' className='shadow-sm'>
            <Container>
                <Navbar.Brand as={Link} to='/'>
                    Hexlet Chat
                </Navbar.Brand>
                {user ? <Button type='button' className='btn btn-primary' onClick={handlerClick}>Выйти</Button> : null }
            </Container>
        </Navbar>
    );
};

export default Header;