import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

//importing the icons ?is there a way to make this look pretty
import { LuLayoutDashboard } from "react-icons/lu";
import { HiOutlineUsers } from "react-icons/hi2";
import { BsHandbag } from "react-icons/bs";
import { PiNotePencil } from "react-icons/pi";
import {
  IoMdAddCircleOutline,
  IoMdHelpCircleOutline,
  IoMdLogOut,
} from "react-icons/io";
import { IoCartOutline, IoHomeOutline } from "react-icons/io5";
import { RiSendPlaneLine } from "react-icons/ri";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import useAdmin from "../hooks/useAdmin";

const options1 = [
  { icon: <LuLayoutDashboard />, text: "Dashboard", link: "" },
  { icon: <BsHandbag />, text: "Manage Bookings", link: "" },
  { icon: <IoMdAddCircleOutline />, text: "Add Menu", link: "add-menu" },
  { icon: <PiNotePencil />, text: "Manage Items", link: "manageitems" },
  { icon: <HiOutlineUsers />, text: "All users", link: "users" },
];

const options2 = [
  { icon: <IoHomeOutline />, text: "Home", link: "/" },
  { icon: <IoCartOutline />, text: "Menu", link: "" },
  { icon: <RiSendPlaneLine />, text: "Order Tracking", link: "" },
  { icon: <IoMdHelpCircleOutline />, text: "Customer Support", link: "" },
];
const Label = ({ icon, text, link }) => {
  return (
    <li>
      <Link className="text-base" to={link}>
        {icon}
        {text}
      </Link>
    </li>
  );
};

function DashboardLayout() {
  const [isAdmin,isAdminLoading]=useAdmin()
  const navigate=useNavigate()
  useEffect(()=>{
    if(!isAdmin){
      navigate("/signup")
    }
  },[isAdmin])
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-start justify-start">
          {/* Page content here */}
          <div className="flex justify-between items-center w-full mt-2 lg:hidden">
            <label
              htmlFor="my-drawer-2"
              className="btn text-basic drawer-button"
            >
              <MdOutlineDashboardCustomize />
            </label>
            <div className="flex space-x-4">
              <h1 className="text-2xl font-bold sm:text-md">
                F<span className="text-primary">Z</span>
              </h1>
              <p className="bg-violet-700 w-fit px-3 py-1 text-center text-white rounded-full text-xs font-semibold mt-1">
                Admin
              </p>
            </div>
            <button className="btn text-basic drawer-button">
              <IoMdLogOut />
              Logout
            </button>
          </div>
          <div className="mt-24">
            <Outlet />
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <div className="flex space-x-2 items-center text-center mb-8 px-4">
              <h1 className="text-2xl font-bold">
                Food<span className="text-primary">Zone</span>
              </h1>
              <p className="bg-violet-700 w-fit px-3 py-1 text-center text-white rounded-full text-2xs font-semibold mt-1">
                Admin
              </p>
            </div>
            <div className="mb-8">
              {options1.map((details) => (
                <Label
                  icon={details.icon}
                  text={details.text}
                  link={details.link}
                />
              ))}
              <div className="mt-16">
                {options2.map((details) => (
                  <Label
                    icon={details.icon}
                    text={details.text}
                    link={details.link}
                  />
                ))}
              </div>
            </div>
            <div></div>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
