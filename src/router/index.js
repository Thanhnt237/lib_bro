import { Layout } from "antd";
import { Redirect, Route, useLocation } from "react-router-dom";
import { Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { keys, paths } from "../constants";
import App from "../pages/Sider";
import Login from "../pages/Login";
import RoomReading from "../pages/Room";
import User from "../pages/User";
import Sider from "../pages/Sider";
import { useEffect } from "react";
import Header from "../pages/Header";
import KeSach from "../pages/KeSach";
import Author from "../pages/TacGia";
import Book from "../pages/Book";
import Phieu_Muon from "../pages/Phieu_Muon"
import Phieu_Tra from "../pages/Phieu_Tra"

export const AppRouter = () => {
  useEffect(() => {}, []);

  return (
    <BrowserRouter>
      <Layout>
        <Sider />
        <Layout.Content>
          {/* <Header/> */}
          <Switch>
            <PublicRoute exact path={paths.login} component={Login} />
            {/* <PrivateRoute exact path={paths.home} component={App} /> */}
            <PrivateRoute
              exact
              path={paths.room_reading}
              component={RoomReading}
            />
            <PrivateRoute exact path={paths.user} component={User} />
            <PrivateRoute exact path={paths.bookshelf} component={KeSach} />
            <PrivateRoute exact path={paths.author} component={Author} />
            <PrivateRoute exact path={paths.book} component={Book} />
            <PrivateRoute exact path={paths.phieu_muon} component={Phieu_Muon} />
            <PrivateRoute exact path={paths.phieu_tra} component={Phieu_Tra} />
          </Switch>
        </Layout.Content>
      </Layout>
    </BrowserRouter>
  );
};

export const PublicRoute = ({ component: Component, ...rest }) => {
  let isAuth = !!localStorage.getItem(keys.access_token);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Redirect to={paths.room_reading} /> : <Component {...props} />
      }
    />
  );
};

export const PrivateRoute = ({ component: Component, ...rest }) => {
  let isAuth = !!localStorage.getItem(keys.access_token);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to={paths.login} />
      }
    />
  );
};
