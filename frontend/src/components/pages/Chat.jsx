import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Button, Form, InputGroup, Modal, Dropdown } from 'react-bootstrap';
import { fetchChannels, selectAllChannels, addChannel } from '../../slices/chatSlice.js';

const Chat = () => {
    const dispatch = useDispatch();
    const channels = useSelector(selectAllChannels.selectAll);
    const [activeChannelId, setActiveChannelId] = useState(null);
    const [activeChannelName, setActiveChannelName] = useState(null);
    const [show, setShow] = useState(false);
    const [channelName, setChannelName] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {
        dispatch(fetchChannels());
    }, [dispatch]);

    useEffect(() => {
        if (channels.length) {
            setActiveChannelId(Number(channels[0].id))
            setActiveChannelName(channels[0].name)
        }

    }, [channels])

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    if (!token) {
        navigate('/login');
        return null;
    }

    return (
        <Container className="h-100 my-4 overflow-hidden rounded shadow">
            <Row className="h-100 bg-white flex-md-row">
                <Col md={2} className="col-4 border-end px-0 bg-light flex-column h-100 d-flex">
                    <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                        <b>Каналы</b>
                        <Button variant="primary" className="p-0 text-primary btn btn-group-vertical" onClick={handleShow}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" />
                            <span className="visually-hidden">+</span>
                        </Button>
                    </div>
                    <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
                        {channels.length > 0 ? (
                            channels.map((channel) => (
                                <li key={channel.id} className="nav-item w-100">
                                    {/* <Dropdown>
                                    <Dropdown.Toggle
                                        as={Button}
                                        id="dropdown-basic"
                                        variant={activeChannelId === Number(channel.id) ? 'primary' : 'light'}
                                        className="w-100 rounded-0 text-start btn btn-secondary" 
                                    >
                                        <span className="me-1">#</span> {channel.name}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">Удалить</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Переименовать</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown> */}
                                    <div role="group" className="d-flex show dropdown btn-group">
                                        <Button 
                                            variant={activeChannelId === Number(channel.id) ? 'primary' : 'light'} 
                                            className="w-100 rounded-0 text-start btn btn-secondary"
                                            onClick={() => {
                                                setActiveChannelId(Number(channel.id));
                                                setActiveChannelName(channel.name);
                                            }
                                            }
                                        >
                                            <span className="me-1">#</span>{channel.name}
                                        </Button>
                                        <Dropdown.Toggle
                                            as={Button}
                                            variant="secondary"
                                            id="dropdown-basic"
                                            className="flex-grow-0 dropdown-toggle-split show"
                                        >
                                            <span className="visually-hidden">Управление каналом</span>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#">Удалить</Dropdown.Item>
                                            <Dropdown.Item href="#">Переименовать</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li className="nav-item w-100">
                                <p>Загрузка каналов...</p>
                            </li>
                        )}
                    </ul>
                </Col>
                <Col className="p-0 h-100">
                    <div className="d-flex flex-column h-100">
                        <div className="bg-light mb-4 p-3 shadow-sm small">
                            <p className="m-0"><b># {activeChannelName}</b></p>
                            <span className="text-muted">1 сообщение</span>
                        </div>
                        <div id="messages-box" className="chat-messages overflow-auto px-5">
                            <div className="text-break mb-2"><b>{activeChannelName}</b>: dfg</div>
                        </div>
                        <div className="mt-auto px-5 py-3">
                            <Form noValidate className="py-1 border rounded-2">
                                <InputGroup hasValidation>
                                    <Form.Control name="body" aria-label="Новое сообщение" placeholder="Введите сообщение..." className="border-0 p-0 ps-2 form-control" value="" />
                                    <Button type="submit" disabled className="btn btn-group-vertical">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" />
                                        <span className="visually-hidden">Отправить</span>
                                    </Button>
                                </InputGroup>
                            </Form>
                        </div>
                    </div>
                </Col>
            </Row>
            {show && (
                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Добавить канал</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="name">
                                <Form.Label visuallyHidden>Имя канала</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Имя канала"
                                    className="mb-2"
                                    value={channelName}
                                    onChange={(e) => setChannelName(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                            </Form.Group>
                            <div className="d-flex justify-content-end">
                                <Button variant="secondary" className="me-2" onClick={handleClose}>Отменить</Button>
                                <Button variant="primary" type="submit" onClick={() => dispatch(addChannel(channelName))}>Отправить</Button>
                            </div>
                        </Form>
                    </Modal.Body>
                </Modal>
            )}
        </Container>
    );
}

export default Chat;