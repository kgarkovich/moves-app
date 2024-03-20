import { NavLink, useNavigate  } from "react-router-dom";
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { getToken, removeToken } from '../utils/jwt-token';

export const Header = () => {
    const navigate = useNavigate();

    const isAuthenticated = !!getToken();

    const onLogout = () => {
        removeToken();
        navigate('/login');
      }

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
              <Navbar.Brand>MOVIES</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  {isAuthenticated && <NavLink to="/watchlists-managment">Watchlists managment</NavLink>}
                </Nav>
              </Navbar.Collapse>
              <Navbar.Collapse className="justify-content-end">
                { isAuthenticated ?
                 (<>
                  <Button variant="light" onClick={onLogout}>
                    Logout
                  </Button>
                </>)
                 : 
                 (<>
                 <Button variant="light">
                    <NavLink to="/login">Login</NavLink>
                 </Button>
                 <Button variant="light">
                    <NavLink to="/register">Register</NavLink>
                 </Button>
                </>) }
              </Navbar.Collapse>
            </Container>
         </Navbar>
    )
};
