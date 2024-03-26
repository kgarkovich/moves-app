import React, { useState } from 'react';
import { useNavigate  } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../api';
import { setUserId, setToken } from '../utils/jwt-token';
import { Container, Button, Row, Col, Form } from 'react-bootstrap';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const [loginUser] = useMutation(LOGIN_USER);

    const navigate = useNavigate();
    
    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();

      try {
        const { data } = await loginUser({
          variables: { username, password },
        });

        if (data.login.token && data.login.id) {
          console.log(data.login.id)
            setToken(data.login.token);
            setUserId(data.login.id);
            
            navigate('/dashboard');
        } else {
            console.error('Token not found in response:', data);
        }
      } catch (error) {
        console.error('Login error:', error);
      }
    };

    return (
      <Container>
        <Row className="mt-5">
          <Col />
          <Col xs={6}>
            <Form onSubmit={handleLogin}>
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
              <Button type="submit" variant="dark">Login</Button>
            </Form>
          </Col>
          <Col />
        </Row>
      </Container>
    )
}