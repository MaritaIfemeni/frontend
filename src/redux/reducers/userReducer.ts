import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import {
  fetchAllUsersApi,
  fetchUserByIdApi,
  updateUserApi,
  deleteUserApi,
  createNewUserApi,
} from "../../api/userApi";
import { User } from "../../types/User";
import { UserReducer } from "../../types/UserReducer";
import { NewUser } from "../../types/NewUser";
import { UserCredential } from "../../types/UserCredentials";
import { UpdateUser } from "../../types/UpdateUser";

const initialState: UserReducer = {
  users: [],
  currentUser: null,
  userResponse: {
    id: "",
    firstName: "",
    lastName: "",
    username: "",
    address: "",
    city: "",
    postcode: "",
    phone: "",
    email: "",
    userRole: "",
    avatar: "",
  },
  loading: false,
  error: "",
};

export const createNewUser = createAsyncThunk(
  "user/createNewUser",
  async (user: NewUser) => {
    return await createNewUserApi(user);
  }
);

export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async () => {
    return await fetchAllUsersApi();
  }
);

export const fetchUserById = createAsyncThunk(
  "user/fetchUserById",
  async (id: string) => {
    return await fetchUserByIdApi(id);
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user: UpdateUser) => {
    return await updateUserApi(user);
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id: string) => {
    return await deleteUserApi(id);
  }
);

export const authenticate = createAsyncThunk(
  "user/authenticate",
  async (access_token: string) => {
    try {
      const authentication = await axios.get<User>(
        "https://mi-eshop.azurewebsites.net/api/v1/users/profile",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      const user: User = authentication.data;
      user.isAdmin = user.userRole === "Admin";

      return authentication.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }: UserCredential, { dispatch }) => {
    try {
      const result = await axios.post<string>(
        "https://mi-eshop.azurewebsites.net/api/v1/auth",
        { email, password }
      );
      localStorage.setItem("token", result.data);
      const authentication = await dispatch(authenticate(result.data));
      return authentication.payload as User;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

export const checkStoredToken = createAsyncThunk(
  "user/checkStoredToken",
  async (_, { dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const authentication = await dispatch(authenticate(token));

        if (!(authentication.payload instanceof AxiosError)) {
          return authentication.payload as User;
        }
      }
      return null;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

export const logoutToken = createAsyncThunk(
  "user/logout",
  async (_, { dispatch }) => {
    localStorage.removeItem("token");
    await dispatch(checkStoredToken());
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    cleanUpUserReducer: (state) => {
      return initialState;
    },
    setUserResponse: (state, action: PayloadAction<User>) => {
      state.userResponse = {
        id: action.payload.id,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        username: action.payload.username,
        address: action.payload.address,
        city: action.payload.city,
        postcode: action.payload.postcode,
        phone: action.payload.phone,
        email: action.payload.email,
        userRole: action.payload.userRole,
        avatar: action.payload.avatar,
      };
    },
  },
  extraReducers: (build) => {
    build
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message;
        } else {
          state.users = action.payload;
        }
        state.loading = false;
      })
      .addCase(fetchAllUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.error = "Failed fetch data";
      })
      .addCase(createNewUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createNewUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewUser.rejected, (state, action) => {
        state.error = "Failed create user";
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message;
        } else {
          state.currentUser = action.payload;
          state.loading = false;
        }
      })
      .addCase(login.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = "Failed login";
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message;
        } else {
          state.currentUser = action.payload;
        }
        state.loading = false;
      })
      .addCase(authenticate.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(authenticate.rejected, (state, action) => {
        state.error = "Failed authentication";
      })
      .addCase(checkStoredToken.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message;
          state.currentUser = null;
        } else {
          state.currentUser = action.payload;
        }
        state.loading = false;
      })
      .addCase(checkStoredToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkStoredToken.rejected, (state, action) => {
        state.error = "Failed to check stored token";
        state.currentUser = null;
        state.loading = false;
      });
  },
});

const usersReducer = usersSlice.reducer;
export const { cleanUpUserReducer, setUserResponse } = usersSlice.actions;
export default usersReducer;
