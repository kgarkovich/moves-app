import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../api';
import { setToken } from '../utils/jwt-token';
import { Container, Button, Row, Col, Form } from 'react-bootstrap';
import { useNavigate  } from "react-router-dom";


export const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [registerUser] = useMutation(REGISTER_USER);

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await registerUser({
        variables: { username, password },
      });

      if (data.register.token) {
        setToken(data.register.token);
            
        navigate('/dashboard');
      } else {
        console.error('Token not found in response:', data);
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col />
        <Col xs={6}>
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={username}
                    onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password}
                    onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Button type="submit" variant="dark">Register</Button>
          </Form>
        </Col>
        <Col />
      </Row>
    </Container>
  )
}