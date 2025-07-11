import "./App.css";
import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import { createContext, useState } from "react";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Products from "./Pages/Products";
import AddProduct from "./Pages/Products/addProduct";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import { IoMdClose } from "react-icons/io";
import HomeSliderBanners from "./Pages/HomeSliderBanners";
import AddHomeSlide from "./Pages/HomeSliderBanners/addHomeSlide";
import CategoryList from "./Pages/Category";
import AddCategory from "./Pages/Category/addCategory";
import SubCategoryList from "./Pages/Category/subCatList";
import AddSubCategory from "./Pages/Category/addSubCategory";
import Users from "./Pages/Users";
import Orders from "./Pages/Orders";
import ForgotPassword from "./Pages/ForgotPassword";
import VerifyAccount from "./Pages/VerifyAccount";
import ChangePassword from "./Pages/ChangePassword";
import toast, { Toaster } from "react-hot-toast";
import { fetchDataFromApi } from "./utils/api";
import Profile from "./Pages/Profile";
import AddAddress from "./Pages/Address/addAddress";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MyContext = createContext();

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
   const [address, setAddress] = useState([]);
  const [isOpenFullScreenPanel, setIsOpenFullScreenPanel] = useState({
    open: false,
    model: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token !== undefined && token !== null && token !== "") {
      setIsLogin(true);
      fetchDataFromApi(`/api/user/user-details`).then((res) => {
        setUserData(res.data);
        if (res?.response?.data?.error === true) {
          if (res?.response?.data?.message === "You have to login") {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            alertBox("error", "You have to login");
            window.location.href = "/login";
            setIsLogin(false);
          }
        }
      });
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);

  const alertBox = (type, msg) => {
    if (type === "success") {
      toast.success(msg);
    }
    if (type === "error") {
      toast.error(msg);
    }
  };

  const router = createBrowserRouter([
    {
      path: "/",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`oveflow-hidden sidebarWrapper ${
                  isSidebarOpen === true ? "w-[17%]" : "w-[0px] opacity-0"
                } transition-all`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-5 ${
                  isSidebarOpen === false ? "w-[100%]" : "w-[82%]"
                } transition-all`}
              >
                <Dashboard />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/login",
      exact: true,
      element: (
        <>
          <Login />
        </>
      ),
    },
    {
      path: "/forgot-password",
      exact: true,
      element: (
        <>
          <ForgotPassword />
        </>
      ),
    },
    {
      path: "/verify-account",
      exact: true,
      element: (
        <>
          <VerifyAccount />
        </>
      ),
    },
    {
      path: "/change-password",
      exact: true,
      element: (
        <>
          <ChangePassword />
        </>
      ),
    },
    {
      path: "/sign-up",
      exact: true,
      element: (
        <>
          <SignUp />
        </>
      ),
    },
    {
      path: "/products",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`oveflow-hidden sidebarWrapper ${
                  isSidebarOpen === true ? "w-[17%]" : "w-[0px] opacity-0"
                } transition-all`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-5 ${
                  isSidebarOpen === false ? "w-[100%]" : "w-[82%]"
                } transition-all`}
              >
                <Products />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/homeSlider/list",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`oveflow-hidden sidebarWrapper ${
                  isSidebarOpen === true ? "w-[17%]" : "w-[0px] opacity-0"
                } transition-all`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-5 ${
                  isSidebarOpen === false ? "w-[100%]" : "w-[82%]"
                } transition-all`}
              >
                <HomeSliderBanners />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/category/list",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`oveflow-hidden sidebarWrapper ${
                  isSidebarOpen === true ? "w-[17%]" : "w-[0px] opacity-0"
                } transition-all`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-5 ${
                  isSidebarOpen === false ? "w-[100%]" : "w-[82%]"
                } transition-all`}
              >
                <CategoryList />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/subCategory/list",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`oveflow-hidden sidebarWrapper ${
                  isSidebarOpen === true ? "w-[17%]" : "w-[0px] opacity-0"
                } transition-all`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-5 ${
                  isSidebarOpen === false ? "w-[100%]" : "w-[82%]"
                } transition-all`}
              >
                <SubCategoryList />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/users",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`oveflow-hidden sidebarWrapper ${
                  isSidebarOpen === true ? "w-[17%]" : "w-[0px] opacity-0"
                } transition-all`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-5 ${
                  isSidebarOpen === false ? "w-[100%]" : "w-[82%]"
                } transition-all`}
              >
                <Users />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/orders",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`oveflow-hidden sidebarWrapper ${
                  isSidebarOpen === true ? "w-[17%]" : "w-[0px] opacity-0"
                } transition-all`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-5 ${
                  isSidebarOpen === false ? "w-[100%]" : "w-[82%]"
                } transition-all`}
              >
                <Orders />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/profile",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`oveflow-hidden sidebarWrapper ${
                  isSidebarOpen === true ? "w-[17%]" : "w-[0px] opacity-0"
                } transition-all`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-5 ${
                  isSidebarOpen === false ? "w-[100%]" : "w-[82%]"
                } transition-all`}
              >
                <Profile />
              </div>
            </div>
          </section>
        </>
      ),
    },
  ]);

  const values = {
    isSidebarOpen,
    setIsSidebarOpen,
    isLogin,
    setIsLogin,
    isOpenFullScreenPanel,
    setIsOpenFullScreenPanel,
    userData,
    setUserData,
    alertBox,
    address,
    setAddress,
  };

  return (
    <>
      <MyContext.Provider value={values}>
        <Toaster />
        <RouterProvider router={router} />

        <Dialog
          fullScreen
          open={isOpenFullScreenPanel.open}
          onClose={() =>
            setIsOpenFullScreenPanel({
              open: false,
            })
          }
          slots={{
            transition: Transition,
          }}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() =>
                  setIsOpenFullScreenPanel({
                    open: false,
                  })
                }
                aria-label="close"
              >
                <IoMdClose className="text-gray-800" />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                <span className="text-gray-800">
                  {isOpenFullScreenPanel?.model}
                </span>
              </Typography>
            </Toolbar>
          </AppBar>
          {isOpenFullScreenPanel?.model === "Add Product" && <AddProduct />}

          {isOpenFullScreenPanel?.model === "Add Home Slide" && (
            <AddHomeSlide />
          )}
          {isOpenFullScreenPanel?.model === "Add New Category" && (
            <AddCategory />
          )}
          {isOpenFullScreenPanel?.model === "Add New Sub Category" && (
            <AddSubCategory />
          )}
          {isOpenFullScreenPanel?.model === "Add New Address" && (
            <AddAddress />
          )}
        </Dialog>
      </MyContext.Provider>
    </>
  );
}

export default App;
export { MyContext };
