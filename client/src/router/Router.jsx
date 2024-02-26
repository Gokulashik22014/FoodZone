import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/shop/Menu";
import Signup from "../components/Signup";
import ProfileUpdate from "../pages/userdashboard/ProfileUpdate";
import CartPage from "../pages/shop/CartPage";
import DashboardLayout from "../layout/DashboardLayout";
import PrivateRouter from "../privateRouter/PrivateRouter";
import Dashboard from "../pages/dashboard/admin/Dashboard";
import Users from "../pages/dashboard/admin/Users";
import AddMenu from "../pages/dashboard/admin/AddMenu";
import ManageItems from "../pages/dashboard/admin/ManageItems";
import UpdateMenu from "../pages/dashboard/admin/UpdateMenu";
import axios from "axios";
const token=localStorage.getItem("access-token")
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/cart-page",
        element: <CartPage />,
      },
      {
        path: "/update-profile/:email",
        element: <ProfileUpdate />,
        loader:({params})=>axios.get(`http://localhost:3000/getsingleuser/${params.email}`,{ headers: {"authorization" : `Bearer ${token}`} }),
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "add-menu",
        element: <AddMenu />,
      },
      {
        path:"manageitems",
        element:<ManageItems/>
      },
      {
        path:`updateitem/:id`,
        element:<UpdateMenu/>,
        loader:({params})=>axios.get(`http://localhost:3000/getitem/${params.id}`)
      }
    ],
  },
]);

export default router;
