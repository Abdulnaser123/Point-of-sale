/** @format */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Avatar,
  CssBaseline,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import axios from "axios";

function AddItem() {
  const navigate = useNavigate();
  const [element, setElement] = useState({
    name: "",
    price: "",
    image: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setElement({ ...element, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to your JSON server to add the element
      const response = await axios.post(
        "http://localhost:5000/products",
        element,
      );

      // Check if the addition was successful (you may need to adjust this based on your server's response)
      if (response.status === 201) {
        // Element added successfully, navigate to the home page
        navigate("/");
      } else {
        console.error("Failed to add element");
      }
    } catch (error) {
      console.error("Error adding element:", error);
    }
  };

  return (
    <Container
      component='main'
      maxWidth='xs'
      style={{
        marginTop: "10%",
      }}
    >
      <CssBaseline />
      <Paper
        elevation={3}
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar style={{ backgroundColor: "green", marginBottom: "10px" }}>
          <AddCircleIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Add Commodity
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{ width: "100%", marginTop: "10px" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                label='Name'
                name='name'
                value={element.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                label='Price'
                name='price'
                value={element.price}
                onChange={handleInputChange}
                type='number'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                label='Image URL'
                name='image'
                value={element.image}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            style={{ marginTop: "20px" }}
          >
            Add
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default AddItem;
