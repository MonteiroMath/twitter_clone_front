import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectJwtToken } from "../../../store/UserSlice";

function PrivateRoute({ children, ...rest }) {
  const jwtToken = useSelector((state) => selectJwtToken(state));
  return (
    <Route
      {...rest}
      render={({ location }) =>
        jwtToken ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
