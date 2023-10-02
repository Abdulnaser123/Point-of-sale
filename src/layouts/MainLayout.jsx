/** @format */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Menu, MenuItem } from "@mui/material";

function MainLayout({ children }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <header>
        <nav className='navbar navbar-dark bg-dark'>
          <div className='container d-flex justify-content-between align-items-center'>
            <Link to='/' className='navbar-brand'>
              Point Of Sale System
            </Link>
            <div>
              <Button
                variant='contained'
                color='primary'
                component={Link}
                to='/login'
                style={{ marginRight: "4px" }}
              >
                Logout
              </Button>
              <Button
                variant='contained'
                color='secondary'
                aria-controls='menu'
                aria-haspopup='true'
                onClick={handleClick}
              >
                Menu
              </Button>
              <Menu
                id='menu'
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem component={Link} to='/AddItem' onClick={handleClose}>
                  Add Commodity
                </MenuItem>
                <MenuItem
                  component={Link}
                  to='/DeleteItem'
                  onClick={handleClose}
                >
                  Delete Commodity
                </MenuItem>
                <MenuItem
                  component={Link}
                  to='/UpdateItem'
                  onClick={handleClose}
                >
                  Update Commodity
                </MenuItem>
                <MenuItem component={Link} to='/invoices' onClick={handleClose}>
                  Invoices
                </MenuItem>
              </Menu>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <div className='container mt-3'>{children}</div>
        <ToastContainer />
      </main>
    </div>
  );
}

export default MainLayout;
