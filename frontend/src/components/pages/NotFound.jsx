import { Container, Image, Row, Col } from 'react-bootstrap';
const NotFound = () => {
    return (
        <Container className="text-center">
        <Row className="justify-content-center">
            <Col md={6}>
            <Image src="https://cdn2.hexlet.io/assets/error-pages/404-4b6ef16aba4c494d8101c104236304e640683fa9abdb3dd7a46cab7ad05d46e9.svg" className="h-25" alt="Страница не найдена" fluid/>
            <h1 className="h4 text-muted">Страница не найдена</h1>
            <p className="text-muted">Но вы можете перейти <a href="/">на главную страницу</a></p>
            </Col>
        </Row>
        </Container>
    );
}

export default NotFound;