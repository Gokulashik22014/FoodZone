import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../contexts/AuthProvider";
import Loading from "../components/Loading";

function Main() {
  const { user,loading } = useContext(AuthContext);
  return (
    <div>
         {
          loading?<Loading/>:<div>
            <Navbar />
          <div className="min-h-screen">
            <Outlet />
          </div>
          <Footer />
          </div>
         }
    </div>
  );
}

export default Main;
