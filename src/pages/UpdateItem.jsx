/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../layouts/MainLayout";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Container,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateItem = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false); // State to control dialog open/close
  const [selectedProduct, setSelectedProduct] = useState(null); // State to store selected product data

  const handleOpenDialog = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleUpdateProduct = async () => {
    try {
      // Send a PUT request to update the product data
      await axios.put(
        `http://localhost:5000/products/${selectedProduct.id}`,
        selectedProduct,
      );
      // Close the dialog
      setOpenDialog(false);
      // Show a success notification
      toast.success("Product updated successfully", { autoClose: 2000 });
    } catch (error) {
      console.error("Error updating product:", error);
      // Show an error notification
      toast.error("Error updating product", { autoClose: 2000 });
    }
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

  return (
    <MainLayout>
      {/* ... Rest of the code */}
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Click Items To Update!
      </h1>
      <Container>
        <Grid item xs={12} md={4}>
          {isLoading ? (
            "Loading"
          ) : (
            <Grid container spacing={2}>
              {products.map((product, key) => (
                <Grid item key={key} xs={12} sm={6} md={4}>
                  <Card
                    variant='outlined'
                    className='pos-item'
                    onClick={() => handleOpenDialog(product)}
                    style={{
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Add a shadow
                      cursor: "pointer", // Change cursor on hover
                      transition: "background-color 0.3s, opacity 0.3s", // Smooth
                      "&:hover": {
                        backgroundColor: "#f0f0f0", // Change background color on hover
                      },
                    }}
                  >
                    {/* Card content */}
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

          {/* Dialog for updating product */}
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            fullWidth
            maxWidth='sm'
          >
            <DialogTitle>Update Product</DialogTitle>

            <DialogContent>
              {selectedProduct && (
                <form>
                  <TextField
                    label='Name'
                    fullWidth
                    variant='outlined'
                    value={selectedProduct.name}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        name: e.target.value,
                      })
                    }
                    style={{ marginBottom: "16px" }}
                  />
                  <TextField
                    label='Price'
                    fullWidth
                    variant='outlined'
                    value={selectedProduct.price}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        price: e.target.value,
                      })
                    }
                    style={{ marginBottom: "16px" }}
                  />
                  <TextField
                    label='Image URL'
                    fullWidth
                    variant='outlined'
                    value={selectedProduct.image}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        image: e.target.value,
                      })
                    }
                    style={{ marginBottom: "16px" }}
                  />
                </form>
              )}
            </DialogContent>

            <DialogActions>
              <Button onClick={handleCloseDialog} color='primary'>
                Cancel
              </Button>
              <Button onClick={handleUpdateProduct} color='primary'>
                Update
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Container>
    </MainLayout>
  );
};

export default UpdateItem;
