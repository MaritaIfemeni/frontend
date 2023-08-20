import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import { Home, Delete, Add } from "@mui/icons-material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { Outlet, Link } from "react-router-dom";

const ModifyProducts = () => {
  return (
    <Box>

      <nav>
      <IconButton
          component={Link}
          to="/modifyproducts/"
          color="inherit"
        >
          Dashboard <Home />
        </IconButton>
        <IconButton
          component={Link}
          to="/modifyproducts/deleteproduct"
          color="inherit"
        >
          Delete Products <Delete />
        </IconButton>
        <IconButton
          component={Link}
          to="/modifyproducts/updateproduct"
          color="inherit"
        >
          Update Products <DriveFileRenameOutlineIcon />
        </IconButton>
        <IconButton
          component={Link}
          to="/modifyproducts/addnewproduct"
          color="inherit"
        >
          Add New Products
          <Add />
        </IconButton>
      </nav>
      <Outlet />
    </Box>
  );
};

export default ModifyProducts;
