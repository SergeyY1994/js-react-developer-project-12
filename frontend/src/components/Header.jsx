import { Navbar, Container} from 'react-bootstrap';

const Header = () => {
    return (
        <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white" expand="lg">
          <Container>
            <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
          </Container>
        </Navbar>
     );
}

export default Header;