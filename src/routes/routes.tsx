import React from "react";
import { createBrowserRouter } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import HomePage from "../pages/HomePage";
import SingleProductPage from "../pages/SingleProductPage";
import PageNotFound from "../pages/PageNotFound";
import LoginPage from "../pages/LoginPage";
import ProductPage from "../pages/ProductPage";
import ModifyProducts from "../pages/ModifyProducts";
import ProfilePage from "../pages/ProfilePage";
import PrivateRoute from "./PrivateRoute";
import UserList from "../pages/UserList";
import RegitsrationForm from "../components/RegitsrationForm";
import AddNewProduct from "../components/admin_components/AddNewProduct";
import DeleteProduct from "../components/admin_components/DeleteProduct";
import UpdateProduct from "../components/admin_components/UpdateProduct";
import AdminProductDashboard from "../components/admin_components/AdminProductDashboard";
import SingleUserPage from "../pages/SingleUserPage";
import OrderList from "../pages/OrderList";

const routes: any = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/product/:id",
        element: <SingleProductPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute
            isAuthenticated={true}
            isAdmin={false}
            fallbackPath="/login"
          >
            <ProfilePage />
          </PrivateRoute>
        ),
      },
      {
        path: "/products",
        element: <ProductPage />,
      },
      {
        path: "/register",
        element: <RegitsrationForm />,
      },
      {
        path: "/modifyproducts",
        element: (
          <PrivateRoute
            isAuthenticated={true}
            isAdmin={true}
            fallbackPath="/login"
          >
            <ModifyProducts />
          </PrivateRoute>
        ),
        children: [
          {
            path: "/modifyproducts",
            element: (
              <PrivateRoute
                isAuthenticated={true}
                isAdmin={true}
                fallbackPath="/login"
              >
                <AdminProductDashboard />
              </PrivateRoute>
            ),
          },
          {
            path: "/modifyproducts/deleteproduct",
            element: (
              <PrivateRoute
                isAuthenticated={true}
                isAdmin={true}
                fallbackPath="/login"
              >
                <DeleteProduct />
              </PrivateRoute>
            ),
          },
          {
            path: "/modifyproducts/updateproduct",
            element: (
              <PrivateRoute
                isAuthenticated={true}
                isAdmin={true}
                fallbackPath="/login"
              >
                <UpdateProduct />
              </PrivateRoute>
            ),
          },
          {
            path: "/modifyproducts/addnewproduct",
            element: (
              <PrivateRoute
                isAuthenticated={true}
                isAdmin={true}
                fallbackPath="/login"
              >
                <AddNewProduct />
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: "/userlist",
        element: (
          <PrivateRoute
            isAuthenticated={true}
            isAdmin={true}
            fallbackPath="/login"
          >
            <UserList />
          </PrivateRoute>
        ),
      },
      {
        path: "/userlist/:id",
        element: (
          <PrivateRoute
            isAuthenticated={true}
            isAdmin={true}
            fallbackPath="/login"
          >
            <SingleUserPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/orderlist",
        element: (
          <PrivateRoute
            isAuthenticated={true}
            isAdmin={true}
            fallbackPath="/login"
          >
            <OrderList />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default routes;
