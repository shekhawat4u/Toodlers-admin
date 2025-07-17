import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import { RiMenu2Line } from "react-icons/ri";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { FaRegBell } from "react-icons/fa";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { FaRegUser } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { MyContext } from "../../App";
import { Link } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import AddProduct from "../../Pages/Products/addProduct";
import AddHomeSlide from "../../Pages/HomeSliderBanners/addHomeSlide";
import AddCategory from "../../Pages/Category/addCategory";
import EditCategory from "../../Pages/Category/editCategory";
import AddSubCategory from "../../Pages/Category/addSubCategory";
import AddAddress from "../../Pages/Address/addAddress";
import EditProduct from "../../Pages/Products/editProduct";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Header = () => {
  const [anchorMyAcc, setAnchorMyAcc] = useState(null);
  const openMyAcc = Boolean(anchorMyAcc);
  const handleClickMyAcc = (event) => {
    setAnchorMyAcc(event.currentTarget);
  };
  const handleCloseMyAcc = () => {
    setAnchorMyAcc(null);
  };

  const context = useContext(MyContext);

  const logout = () => {
    setAnchorMyAcc(null);
    fetchDataFromApi(
      `/api/user/logout?token=${localStorage.getItem("accessToken")}`,
      { withCredentials: true }
    ).then((res) => {
      if (res?.error === false) {
        context.setIsLogin(false);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        context.alertBox("success", res?.message || "Logout Successfully");
        history("/");
      } else {
        context.alertBox("error", res?.message || "Something went wrong");
      }
    });
  };

  return (
    <>
      <header
        className={`w-full h-[auto] py-2 bg-[#fff] ${
          context.isSidebarOpen === true ? "pl-64" : "pl-5"
        } shadow-md pr-7 flex items-center justify-between transition-all fixed top-0 left-0 z-[50]`}
      >
        <div className="part1">
          <Button
            className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[rgba(0,0,0,0.8)]"
            onClick={() => context.setIsSidebarOpen(!context.isSidebarOpen)}
          >
            <RiMenu2Line className="text-[18px] text-[rgba(0,0,0,0.8)]" />
          </Button>
        </div>

        <div className="part2 w-[40%] flex items-center justify-end gap-5">
          <IconButton aria-label="cart">
            <StyledBadge badgeContent={4} color="secondary">
              <FaRegBell />
            </StyledBadge>
          </IconButton>

          {context.isLogin === true ? (
            <div className="relative">
              <div
                className="rounded-full w-[35px] h-[35px] overflow-hidden cursor-pointer"
                onClick={handleClickMyAcc}
              >
                <img
                  src="https://media.licdn.com/dms/image/v2/D4D03AQFWM-GfONxvSA/profile-displayphoto-shrink_200_200/B4DZbDsicQHEAY-/0/1747039958333?e=1753315200&v=beta&t=Muxt5CRuD6jq-gQyYkWT0ZfNPdbWilJCzUzFRylB0N4"
                  className="w-full h-full object-cover"
                />
              </div>

              <Menu
                anchorEl={anchorMyAcc}
                id="account-menu"
                open={openMyAcc}
                onClose={handleCloseMyAcc}
                onClick={handleCloseMyAcc}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleCloseMyAcc} className="!bg-white">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full w-[35px] h-[35px] overflow-hidden cursor-pointer">
                      <img
                        src="https://media.licdn.com/dms/image/v2/D4D03AQFWM-GfONxvSA/profile-displayphoto-shrink_200_200/B4DZbDsicQHEAY-/0/1747039958333?e=1753315200&v=beta&t=Muxt5CRuD6jq-gQyYkWT0ZfNPdbWilJCzUzFRylB0N4"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="info">
                      <h3 className="text-[15px] font-[500] leading-5">
                        {context?.userData?.name}
                      </h3>
                      <p className="text-[13px] font-[400] opacity-70">
                        {context?.userData?.email}
                      </p>
                    </div>
                  </div>
                </MenuItem>
                <Divider />
                <Link to="/profile">
                  <MenuItem
                    onClick={handleClickMyAcc}
                    className="flex items-center gap-3"
                  >
                    <FaRegUser className="text-[16px]" />
                    <span className="text-[14px]">Profile</span>
                  </MenuItem>
                </Link>
                <MenuItem onClick={logout} className="flex items-center gap-3">
                  <IoMdLogOut className="text-[18px]" />
                  <span className="text-[14px]">Sign Out</span>
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Link to="/login">
              <Button className="btn-sm btn-blue !rounded-full">Sign In</Button>
            </Link>
          )}
        </div>
      </header>

      <Dialog
        fullScreen
        open={context?.isOpenFullScreenPanel.open}
        onClose={() =>
          context?.setIsOpenFullScreenPanel({
            open: false,
          })
        }
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() =>
                context?.setIsOpenFullScreenPanel({
                  open: false,
                })
              }
              aria-label="close"
            >
              <IoMdClose className="text-gray-800" />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              <span className="text-gray-800">
                {context?.isOpenFullScreenPanel?.model}
              </span>
            </Typography>
          </Toolbar>
        </AppBar>
        {context?.isOpenFullScreenPanel?.model === "Add Product" && <AddProduct />}
        {context?.isOpenFullScreenPanel?.model === "Edit Product" && <EditProduct />}
        {context?.isOpenFullScreenPanel?.model === "Add Home Slide" && <AddHomeSlide />}
        {context?.isOpenFullScreenPanel?.model === "Add New Category" && <AddCategory />}
        {context?.isOpenFullScreenPanel?.model === "Edit Category" && <EditCategory />}
        {context?.isOpenFullScreenPanel?.model === "Add New Sub Category" && (
          <AddSubCategory />
        )}
        {context?.isOpenFullScreenPanel?.model === "Add New Address" && <AddAddress />}
      </Dialog>
    </>
  );
};

export default Header;
