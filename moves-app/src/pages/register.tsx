import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../api';
import { setToken } from '../utils/jwt-token';


export const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [registerUser] = useMutation(REGISTER_USER);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await registerUser({
        variables: { username, password },
      });

      if (data.register.token) {
        setToken(data.register.token);
        console.log('Registration successful:', data);
      } else {
        console.error('Token not found in response:', data);
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
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
        <button type="submit">Register</button>
    </form>
  )
}