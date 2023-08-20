import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import useAppDispatch from "../hooks/useAppDispatch";
import { checkStoredToken } from "../redux/reducers/userReducer";

const LandingPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkStoredToken());
  }, []);

  return (
    <div>
      <div>
        <header>
          <Header />
        </header>
        <main>
          <div>
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
