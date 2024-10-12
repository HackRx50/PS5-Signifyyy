import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";
import RTLDefault from "views/rtl/default";
import RTLMain from "views/user-info/default"
import UserAlarm from "views/user-alarm"

import ClaimDetails from "views/admin/ClaimDetails";

// Auth Imports
import SignIn from "views/auth/SignIn";
import SigningIn from "views/auth/SigningIn"

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
  MdAccessAlarms
} from "react-icons/md";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Alarm",
    layout: "/admin",
    path: "nft-marketplace",
    icon: <MdAccessAlarms className="h-6 w-6" />,
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: "Alarm-user",
    layout: "/admin",
    path: "user-alarm",
    icon: <MdAccessAlarms className="h-6 w-6" />,
    component: <UserAlarm />,
  },
  {
    name: "Data Tables",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "data-tables",
    component: <DataTables />,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
  {
    name: "Sign Up",
    layout: "/auth",
    path: "SigningIn",
    icon: <MdLock className="h-6 w-6" />,
    component: <SigningIn />,
  },
  {
    name: "User",
    layout: "/rtl",
    path: "rtl",
    icon: <MdHome className="h-6 w-6" />,
    component: <RTLDefault />,
  },
  {

    name: "User-info",
    layout: "/rtl",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    path: "info",
    component: <RTLMain />,
  },
  {
    name: "ClaimDetails",
    layout: "/admin",
    path: "ClaimDetails",
    icon: <MdHome className="h-6 w-6" />,
    component: <ClaimDetails />,

  },
];
export default routes;
