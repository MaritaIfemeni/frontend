import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
  IconButton,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { fetchAllUsers, deleteUser } from "../redux/reducers/userReducer";

const UserList = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.userReducer.users);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

  const handleDeleteUser = (userId: string) => {
    window.confirm("Are you sure you want to delete this user?") &&
      dispatch(deleteUser(userId));
    alert("User deleted successfully");
  };

  return (
    <Container>
      <Typography variant="h4" color="primary" sx={{ margin: "0.5em 0" }}>
        List of Users
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell>User Email</TableCell>
              <TableCell>User Avatar</TableCell>
              <TableCell>User Role</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/userlist/${user.id}`}>{user.firstName}</Link>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Avatar
                    sx={{ width: 100, height: 100 }}
                    src={user.avatar}
                    alt="Profile pic"
                    variant="square"
                  />
                </TableCell>
                <TableCell>{user.userRole}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDeleteUser(user.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UserList;
