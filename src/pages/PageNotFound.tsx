import React from "react";

import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div>
      PageNotFound
      <h2>
        <Link to="/">Go to Home</Link>
      </h2>
    </div>
  );
};

export default PageNotFound;
