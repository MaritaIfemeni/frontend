import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { Home, ArrowBack } from "@mui/icons-material";
import { Link } from "react-router-dom";

import useAppSelector from "../hooks/useAppSelector";

const style = {
  position: "relative" as "relative",
  width: 400,
  margin: "0 auto",
  marginBottom: "2em",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SingleUserPage = () => {
  const { id } = useParams();
  const { users } = useAppSelector((state) => state.userReducer);
  const selectedUser = users.find((user) => user.id === id);
  const [currentUser, setCurrentUser] = useState(selectedUser);

  useEffect(() => {
    if (selectedUser) {
      setCurrentUser(selectedUser);
      localStorage.setItem("currentUser", JSON.stringify(selectedUser));
    }
  }, [selectedUser]);

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("currentUser") || "{}"));
  }, []);

  return (
    <Card sx={style}>
      <CardContent>
        <Box>
          <Typography variant="body1">User Detail:</Typography>
          <Typography variant="h5" component="div">
            {currentUser?.firstName} {currentUser?.lastName}
          </Typography>
          <Typography variant="body1">
            {currentUser?.address}, {currentUser?.city}, {currentUser?.postcode}
          </Typography>
          <Typography variant="body1">Email: {currentUser?.email}</Typography>
        </Box>
      </CardContent>
      <CardActions>
        <IconButton component={Link} to="/" color="inherit">
          <Home />
        </IconButton>
        <IconButton component={Link} to="/userlist" color="inherit">
          <ArrowBack />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default SingleUserPage;
