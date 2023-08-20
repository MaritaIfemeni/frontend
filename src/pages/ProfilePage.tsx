import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";

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

const ProfilePage = () => {
  const currentUser = useAppSelector((state) => state.userReducer.currentUser);

  return (
    <Card sx={style}>
      {currentUser && (
        <Avatar
          sx={{
            margin: "0 0 0 13em",
            width: 24,
            height: 24,
            bgcolor: deepOrange[500],
          }}
        >
          {currentUser.firstName[0]}
        </Avatar>
      )}
      <CardActionArea sx={{ display: "flex", alignItems: "center" }}>
        {currentUser && (
          <CardMedia
            component="img"
            height="140"
            image={currentUser.avatar}
            alt="profile picture"
          />
        )}
        <CardContent>
          {currentUser && (
            <Typography gutterBottom variant="h5" component="div">
              Hi {currentUser.firstName} !
            </Typography>
          )}
          {currentUser && (
            <Typography variant="body1" color="text.secondary">
              Your registered Email: {currentUser.email}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Change Details {/* This is under construction */}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProfilePage;
