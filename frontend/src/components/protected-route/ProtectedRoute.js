import React from "react";
import { Redirect, Route } from "react-router-dom";
import { TOKEN } from "../../Config";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = sessionStorage.getItem(TOKEN)?true:false;
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

export default ProtectedRoute;
