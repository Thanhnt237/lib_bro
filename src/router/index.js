import { Layout } from "antd";
import { Redirect, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { paths } from "../constants";
import Login from "../pages/Login";
import RoomReading from "../pages/Room";
import User from "../pages/User";
import Sider from "../pages/Sider";
import KeSach from "../pages/KeSach";
import Author from "../pages/TacGia";
import Book from "../pages/Book";
import Phieu_Muon from "../pages/Phieu_Muon";
import Phieu_Tra from "../pages/Phieu_Tra";
import BookStorage from "../pages/BookStorage";
import { PrivateRoute, PublicRoute } from "./ConfigRoutes";
import Dashboard from "../pages/Dashboard";
import Category from "../pages/Category";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Sider />

        <Layout.Content>
          <Switch>
            <PublicRoute exact path={paths.login} component={Login} />

            <PrivateRoute exact path={paths.dashboard} component={Dashboard} />
            <PrivateRoute exact path={paths.room_reading} component={RoomReading} />
            <PrivateRoute exact path={paths.user} component={User} />
            <PrivateRoute exact path={paths.bookshelf} component={KeSach} />
            <PrivateRoute exact path={paths.author} component={Author} />
            <PrivateRoute exact path={paths.book} component={Book} />
            <PrivateRoute exact path={paths.phieu_muon} component={Phieu_Muon} />
            <PrivateRoute exact path={paths.phieu_tra} component={Phieu_Tra} />
            <PrivateRoute exact path={paths.book_storage} component={BookStorage} />
            <PrivateRoute exact path={paths.category} component={Category} />

            <Redirect exact from={paths.home} to={paths.dashboard} />
          </Switch>
        </Layout.Content>
      </Layout>
    </BrowserRouter>
  );
};
