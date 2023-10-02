/** @format */
import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Add your login logic here
  };

  return (
    <Container maxWidth='xs'>
      <Box mt={5}>
        <Typography variant='h4' align='center' gutterBottom>
          POS System Login
        </Typography>
        <form>
          <TextField
            label='Email'
            fullWidth
            variant='outlined'
            margin='normal'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label='Password'
            fullWidth
            variant='outlined'
            margin='normal'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant='contained'
            color='primary'
            fullWidth
            onClick={handleLogin}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
