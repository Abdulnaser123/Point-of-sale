/** @format */

/** @format */

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Grid, Typography, Card, CardContent } from "@mui/material";
import "./styles.css"; // Replace 'styles.css' with the actual path to your CSS file

const Products = ({ cart, setCart, totalAmount, setTotalAmount }) => {
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
    setProducts(
      result.data.map((product) => ({
        ...product,
        price: product.price - product.price * (product.discount / 100),
      })),
    );
    setIsLoading(false);
  };

  const addProductToCart = async (product) => {
    // check if the adding product exists
    let findProductInCart = await cart.find((i) => {
      return i.id === product.id;
    });

    if (findProductInCart) {
      let newCart = [];
      let newItem;

      cart.forEach((cartItem) => {
        if (cartItem.id === product.id) {
          newItem = {
            ...cartItem,
            quantity: cartItem.quantity + 1,
            totalAmount: cartItem.price * (cartItem.quantity + 1),
          };
          newCart.push(newItem);
        } else {
          newCart.push(cartItem);
        }
      });

      setCart(newCart);
      toast(`Added ${newItem.name} to cart`, toastOptions);
    } else {
      let addingProduct = {
        ...product,
        quantity: 1,
        totalAmount: product.price,
      };
      setCart([...cart, addingProduct]);
      toast(`Added ${product.name} to cart`, toastOptions);
    }
  };
  return (
    <Grid item xs={12} md={8}>
      {isLoading ? (
        "Loading"
      ) : (
        <Grid container spacing={3}>
          {products.map((product, key) => (
            <Grid item key={key} xs={12} sm={6} md={4}>
              <Card
                variant='outlined'
                className='pos-item'
                onClick={() => addProductToCart(product)}
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
                    <div className='discount-overlay'>
                      <img
                        src={product.image}
                        alt={product.name}
                        className='product-image'
                        style={{
                          maxWidth: "100%",
                          borderRadius: "5px",
                        }}
                      />
                      {product.discount && (
                        <div className='discount-badge'>
                          <Typography variant='h7'>
                            %{product.discount}
                          </Typography>
                        </div>
                      )}
                    </div>
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
    </Grid>
  );
};

export default Products;
