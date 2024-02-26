import React, { useContext } from "react";
import { FiUser, FiShoppingCart, FiSettings } from "react-icons/fi";
import { IoMdLogOut } from "react-icons/io";
import { AuthContext } from "../contexts/AuthProvider";
import { LuLayoutDashboard } from "react-icons/lu";
import { Link } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";

function Profile({ user }) {
  const { logout } = useContext(AuthContext);
  const [isAdmin,isAdminLoading]=useAdmin()
  return (
    <div>
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src={user.photoURL ? user.photoURL : "/images/userImg.webp"}
            />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
        >
          <li>
            <a className="flex flex-start gap-4" href={`/update-profile/${user.email}`}>
              <FiUser />
              Profile
            </a>
          </li>
          <li>
            <a className="flex flex-start gap-4">
              <FiShoppingCart />
              Order
            </a>
          </li>
          <li>
            <a className="flex flex-start gap-4">
              <FiSettings />
              Settings
            </a>
          </li>
          {
            isAdmin?<li>
            <Link className="flex flex-start gap-4" to={"dashboard"}>
              <LuLayoutDashboard />
              Dashboard
            </Link>
          </li>:<li></li>
          }

          <li>
            <a className="flex flex-start gap-4" onClick={() => logout()}>
              <IoMdLogOut />
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Profile;
