import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import {login} from "../services/api";

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    const userData = { username, password, email };
  
    try {
      const response = await login(userData);
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        navigate('/tasks');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid username or password. Please try again.');
    }
  };
  
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mb-4 text-primary">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleLogin} className="shadow p-4 rounded bg-light">
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mb-3">
              Login
            </Button>
          </Form>
          <div className="text-center">
            <p>
              Don't have an account? <a href="/register">Register here</a>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
