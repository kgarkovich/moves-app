import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../api';
import { setUserId, setToken } from '../utils/jwt-token';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const [loginUser] = useMutation(LOGIN_USER);
    
    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();

      try {
        const { data } = await loginUser({
          variables: { username, password },
        });

        if (data.login.token && data.login.id) {
            setToken(data.login.token);
            setUserId(data.login.id);
            console.log('Registration successful:', data);
        } else {
            console.error('Token not found in response:', data);
        }
      } catch (error) {
        console.error('Login error:', error);
      }
    };

    return (
        <form onSubmit={handleLogin}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    )
}