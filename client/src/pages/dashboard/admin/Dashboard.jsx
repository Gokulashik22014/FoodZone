import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import useUsers from "../../../hooks/useUsers";
import useMenu from "../../../hooks/useMenu";


function Dashboard() {
  const { user } = useContext(AuthContext);
  console.log(user);
  const [users,refetch1]=useUsers()
  const [menu,refetch2]=useMenu()
  return (
    <div className="flex flex-col mx-24 w-[870px]">
      <div className="text-center">
        <h1 className="text-bold text-4xl">Welcome to <span className="text-primary ">FoodZone</span></h1>
        <h2 className="text-2xl">{user.displayName}</h2>
      </div>
      <div className="mt-24 flex justify-between">
        <h1 className="text-4xl">Total Users:{users.length}</h1>
        <h1 className="text-4xl">Menu Items:{menu.length}</h1>
      </div>
    </div>
  );
}

export default Dashboard;
