import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { keys, paths } from "../constants";
import { updateUser } from "../redux/slices/authSlice";

export const PublicRoute = ({ component: Component, ...rest }) => {
  let isAuth = !!localStorage.getItem(keys.access_token);
  const user = useSelector((state) => state.auth.user);
  const localUser = localStorage.getItem(keys.user_data);
  const dispatch = useDispatch();

  if (isAuth && !user && localUser) {
    const parsedUser = JSON.parse(localUser);
    dispatch(updateUser(parsedUser));
  }

  return (
    <Route
      {...rest}
      render={(props) => (isAuth ? <Redirect to={paths.room_reading} /> : <Component {...props} />)}
    />
  );
};

export const PrivateRoute = ({ component: Component, ...rest }) => {
  let isAuth = !!localStorage.getItem(keys.access_token);
  const user = useSelector((state) => state.auth.user);
  const localUser = localStorage.getItem(keys.user_data);
  const dispatch = useDispatch();

  if (isAuth && !user && localUser) {
    const parsedUser = JSON.parse(localUser);
    dispatch(updateUser(parsedUser));
  }

  return (
    <Route
      {...rest}
      render={(props) => (isAuth ? <Component {...props} /> : <Redirect to={paths.login} />)}
    />
  );
};
