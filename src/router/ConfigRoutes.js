import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, useHistory } from "react-router-dom";
import { keys, paths } from "../constants";
import { updateUser } from "../redux/slices/authSlice";
import { preload } from "../assets/images";

export const PublicRoute = ({ component: Component, ...rest }) => {
  let isAuth = !!localStorage.getItem(keys.access_token);
  const user = useSelector((state) => state.auth.user);
  const localUser = localStorage.getItem(keys.user_data);
  const dispatch = useDispatch();
  const history = useHistory();

  if (isAuth && !user && localUser) {
    const parsedUser = JSON.parse(localUser);
    dispatch(updateUser(parsedUser));
  }

  if (isAuth && user && localUser) {
    setTimeout(() => {
      history.push(paths.room_reading);
    }, 5000);

    return (
        <div>
          <div
              style={{
                backgroundImage: `url(${preload})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                width: "100vw",
                height: "100vh",
              }}
          ></div>

          <div
              style={{
                top: "0",
                left: "0",
                width: "100vw",
                height: "100vh",
                position: "fixed",
                backgroundColor: "#00000099",
                display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#337AB7",
                  WebkitTextStroke: "2px black",
                  fontFamily: "sans",
                  fontSize: "4vw",
              }}
          >
            <h1 className="pre-loading-text">ONE LOVE ONE FUTURE</h1>
          </div>
        </div>
    );
  }

  return (
      <Route
          {...rest}
          render={(props) => (isAuth ? <Redirect to={paths.dashboard} /> : <Component {...props} />)}
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
