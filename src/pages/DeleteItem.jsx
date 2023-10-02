/** @format */

/** @format */

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import MainLayout from "../layouts/MainLayout";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Container,
  Avatar,
  Button,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link } from "react-router-dom";

const DeleteItem = ({ cart, setCart, totalAmount, setTotalAmount }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const toastOptions = {
    autoClose: 400,
    pauseOnHover: true,
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    setIsLoading(true);
    const result = await axios.get("products");
    setProducts(await result.data);
    setIsLoading(false);
  };

  const DeleteItemHandler = (product) => {
    axios
      .delete(`http://localhost:5000/products/${product.id}`)
      .then((response) => {
        if (response.status === 200) {
          // If the server responds with a success status, update the local products list
          const updatedProducts = products.filter((p) => p.id !== product.id);
          setProducts(updatedProducts);
        } else {
          console.error("Failed to delete product from the server.");
        }
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  return (
    <MainLayout>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Click Items To Delete!
      </h1>
      <Container>
        <Grid item xs={12} md={12}>
          {isLoading ? (
            "Loading"
          ) : (
            <Grid container spacing={2}>
              {products.map((product, key) => (
                <Grid item key={key} xs={12} sm={6} md={4}>
                  <Card
                    variant='outlined'
                    className='pos-item'
                    onClick={() => DeleteItemHandler(product)}
                    style={{
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Add a shadow
                      cursor: "pointer", // Change cursor on hover
                      transition: "background-color 0.3s, opacity 0.3s", // Smooth
                      "&:hover": {
                        backgroundColor: "#f0f0f0", // Change background color on hover
                      },
                    }}
                  >
                    <CardContent>
                      <div style={{ textAlign: "center" }}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className='product-image'
                          style={{
                            maxWidth: "100%",
                            borderRadius: "5px",
                          }}
                        />
                      </div>
                      <Typography variant='h6' align='center'>
                        {product.name}
                      </Typography>
                      <Typography variant='h6' align='center'>
                        ${product.price}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
          <Link to={"/pos"}>
            <Button
              fullWidth
              variant='contained'
              color='primary'
              style={{ marginTop: "20px" }}
            >
              Return To Products Page
            </Button>
          </Link>
        </Grid>
      </Container>
    </MainLayout>
  );
};

export default DeleteItem;
