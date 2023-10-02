/** @format */

import React, { useEffect, useRef, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { useReactToPrint } from "react-to-print";
import { ComponentToPrint } from "../components/ComponentToPrint";
import Products from "../components/Products";

function POSPage() {
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const removeProduct = async (product) => {
    const newCart = cart.filter((cartItem) => cartItem.id !== product.id);
    setCart(newCart);
  };

  const componentRef = useRef();

  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint = () => {
    handleReactToPrint();
  };

  useEffect(() => {
    let newTotalAmount = 0;
    cart.forEach((icart) => {
      newTotalAmount = newTotalAmount + parseInt(icart.totalAmount);
    });
    setTotalAmount(newTotalAmount);
  }, [cart]);

  return (
    <MainLayout>
      <Container>
        <Grid container spacing={3}>
          <Products
            cart={cart}
            setCart={setCart}
            totalAmount={totalAmount}
            setTotalAmount={setTotalAmount}
          />
          <Grid item xs={12} md={4}>
            <div style={{ display: "none" }}>
              <ComponentToPrint
                cart={cart}
                totalAmount={totalAmount}
                ref={componentRef}
              />
            </div>
            <Card variant='outlined' className='table-responsive bg-dark'>
              <CardContent>
                <Typography variant='h6' color='white'>
                  Cart
                </Typography>
                <table className='table table-dark table-hover'>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.length > 0 ? (
                      cart.map((cartProduct, key) => (
                        <tr key={key}>
                          <td>{cartProduct.name}</td>
                          <td>${cartProduct.price}</td>
                          <td>{cartProduct.quantity}</td>
                          <td>${cartProduct.totalAmount}</td>
                          <td>
                            <Button
                              variant='contained'
                              color='error'
                              size='small'
                              onClick={() => removeProduct(cartProduct)}
                            >
                              Remove
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan='6'>No Item in Cart</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <Typography variant='h6' color='white'>
                  Total Amount: ${totalAmount}
                </Typography>
              </CardContent>
            </Card>
            <div className='mt-3'>
              {totalAmount !== 0 ? (
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handlePrint}
                  fullWidth
                >
                  Pay Now
                </Button>
              ) : (
                "Please add a product to the cart"
              )}
            </div>
          </Grid>
        </Grid>
      </Container>
    </MainLayout>
  );
}

export default POSPage;
