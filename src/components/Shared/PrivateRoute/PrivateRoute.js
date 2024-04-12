import { Redirect, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectJwtToken } from "../../../store/UserSlice";
import { logout } from "../../../store/UserSlice";

import isJwtTokenExpired from "../../../store/utils/verifyJwtExpiration";

function PrivateRoute({ children, ...rest }) {
  let isExpired = false;
  const dispatch = useDispatch();
  const jwtToken = useSelector((state) => selectJwtToken(state));

  if (jwtToken) isExpired = isJwtTokenExpired(jwtToken);
  if (isExpired) {
    alert("Your login expired. Please, login again");
    dispatch(logout());
  }

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
