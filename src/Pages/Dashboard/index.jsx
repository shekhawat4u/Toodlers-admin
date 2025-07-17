import React, { useState, PureComponent, useContext } from "react";
import DashboardBoxes from "../../Components/DashboardBoxes";
import { FaPlus, FaRegEye } from "react-icons/fa";
import Button from "@mui/material/Button";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import Badge from "../../components/Badge";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { GoTrash } from "react-icons/go";
import TooltipMUI from "@mui/material/Tooltip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import SearchBox from "../../Components/SearchBox/Index";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { MyContext } from "../../App";
import { deleteData, fetchDataFromApi } from "../../utils/api";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Rating from "@mui/material/Rating";

const columns = [
  { id: "product", label: "PRODUCT", minWidth: 150 },
  { id: "category", label: "CATEGORY", minWidth: 100 },
  { id: "subcategory", label: "SUB CATEGORY", minWidth: 150 },
  { id: "price", label: "PRICE", minWidth: 130 },
  { id: "sales", label: "SALES", minWidth: 100 },
  { id: "rating", label: "RATING", minWidth: 100 },
  { id: "action", label: "ACTION", minWidth: 120 },
];

const Dashboard = () => {
  const [isOpenOrderProduct, setIsOpenOrderProduct] = useState(null);
  const [productCat, setProductCat] = useState("");
  const [productData, setProductData] = useState([]);
  const [productSubCat, setProductSubCat] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [productThirdLevelCat, setProductThirdLevelCat] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const context = useContext(MyContext);

  useEffect(() => {
    getProducts();
  }, [context?.isOpenFullScreenPanel]);

  const isShowOrderProduct = (index) => {
    if (isOpenOrderProduct === index) {
      setIsOpenOrderProduct(null);
    } else {
      setIsOpenOrderProduct(index);
    }
  };

  const [chart1Data, setChart1Data] = useState([
    {
      name: "JAN",
      TotalSales: 4000,
      TotalUsers: 2400,
      amt: 2400,
    },
    {
      name: "FEB",
      TotalSales: 3000,
      TotalUsers: 1398,
      amt: 2210,
    },
    {
      name: "MAR",
      TotalSales: 2000,
      TotalUsers: 9800,
      amt: 2290,
    },
    {
      name: "APR",
      TotalSales: 2780,
      TotalUsers: 3908,
      amt: 2000,
    },
    {
      name: "MAY",
      TotalSales: 1890,
      TotalUsers: 4800,
      amt: 2181,
    },
    {
      name: "JUN",
      TotalSales: 2390,
      TotalUsers: 3800,
      amt: 2500,
    },
    {
      name: "JUL",
      TotalSales: 1490,
      TotalUsers: 4300,
      amt: 2100,
    },
    {
      name: "AUG",
      TotalSales: 3490,
      TotalUsers: 300,
      amt: 2100,
    },
    {
      name: "SEP",
      TotalSales: 2490,
      TotalUsers: 1300,
      amt: 2100,
    },
    {
      name: "OCT",
      TotalSales: 4490,
      TotalUsers: 3300,
      amt: 2100,
    },
    {
      name: "NOV",
      TotalSales: 3490,
      TotalUsers: 2300,
      amt: 2100,
    },
    {
      name: "DEC",
      TotalSales: 4490,
      TotalUsers: 1300,
      amt: 1900,
    },
  ]);

  const getProducts = async () => {
    setIsLoading(true);
    fetchDataFromApi("/api/product/getAllProducts").then((res) => {
      let productArr = [];
      if (res?.error === false) {
        for (let i = 0; i < res?.products?.length; i++) {
          productArr[i] = res?.products[i];
          productArr[i].checked = false;
        }
        setTimeout(() => {
          setProductData(productArr);
          setIsLoading(false);
        }, 300);
      }
    });
  };

  const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
    setProductSubCat("");
    setProductThirdLevelCat("");
    setIsLoading(true);
    fetchDataFromApi(
      `/api/product/getAllProductsByCatId/${event.target.value}`
    ).then((res) => {
      if (res?.error === false) {
        setProductData(res?.products);
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    });
  };

  const handleChangeProductSubCat = (event) => {
    setProductSubCat(event.target.value);
    setProductCat("");
    setProductThirdLevelCat("");
    setIsLoading(true);
    fetchDataFromApi(
      `/api/product/getAllProductsBySubCatId/${event.target.value}`
    ).then((res) => {
      if (res?.error === false) {
        setProductData(res?.products);
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    });
  };

  const handleChangeProductThirdLevelCat = (event) => {
    setProductThirdLevelCat(event.target.value);
    setProductCat("");
    setProductSubCat("");
    setIsLoading(true);
    fetchDataFromApi(
      `/api/product/getAllProductsByThirdLevelCat/${event.target.value}`
    ).then((res) => {
      if (res?.error === false) {
        setProductData(res?.products);
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteProduct = (id) => {
    deleteData(`/api/product/${id}`)
      .then((res) => {
        if (res?.error === false) {
          context.alertBox(
            "success",
            res?.message || "Product deleted successfully"
          );
          getProducts();
        } else {
          context.alertBox("error", res?.message || "Error deleting product");
        }
      })
      .catch((error) => {
        console.error("Delete error:", error);
        context.alertBox("error", "Error deleting product.");
      });
  };

  return (
    <>
      <div className="w-full bg-[#f1faff] py-2 px-5 border border-[rgba(0,0,0,0.1)] flex items-center gap-8 mb-5 rounded-md justify-between">
        <div className="info">
          <h1 className="text-[35px] font-bold leading-10 mb-3">
            Good Morning,
            <br /> Harshvardhan
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 128 128"
              class="inline-flex h-8 w-8"
            >
              <path
                fill="#fac036"
                d="M39.11 79.56c-1.1 1.03-2.21-.2-2.21-.2S18.42 59.78 17.22 58.9c-1.69-1.23-5.31-3.16-8.93.57-1.51 1.55-3.97 5 .6 10.56.99 1.2 29.78 31.54 31.46 33.18 0 0 13.3 12.94 21.35 17.81 2.23 1.35 4.74 2.78 7.67 3.78 2.92 1 6.22 1.69 9.7 1.69 3.48.04 7.09-.63 10.5-1.88 3.41-1.26 6.59-3.09 9.48-5.2.71-.54 1.43-1.08 2.1-1.66l1.94-1.6a58.67 58.67 0 0 0 3.82-3.53c2.43-2.42 4.62-5.01 6.55-7.66 1.92-2.66 3.55-5.41 4.85-8.15 1.3-2.74 2.21-5.49 2.76-8.09.58-2.59.74-5.04.65-7.18-.02-2.14-.45-3.97-.8-5.43-.4-1.46-.83-2.55-1.17-3.27-.33-.72-.51-1.1-.51-1.1-.46-1.29-.9-2.52-1.29-3.63a889.622 889.622 0 0 0-4.51-12.47l.01.03c-4.85-13.17-10.06-26.74-10.06-26.74-.79-2.39-3.7-3.22-5.84-1.68-6.18 4.44-8.07 10.92-5.89 17.83l5.59 15.32c.79 1.71-1.39 3.69-2.85 2.5-4.59-3.74-14.3-14.05-14.3-14.05-4.34-4.16-28.83-29.27-30.47-30.8-3.3-3.07-7.46-4.65-10.63-2.32-3.24 2.38-4.14 6.06-1.01 10.08.85 1.09 25.6 27.24 25.6 27.24 1.44 1.51-.26 3.65-1.85 2.18 0 0-30.79-32.12-32.18-33.62-3.15-3.42-8.21-4.17-11.21-1.35-2.93 2.75-2.86 7.26.34 10.8 1.02 1.12 22.71 24.02 31.39 33.4.58.63 1.03 1.47.17 2.26-.01.01-.88.95-2-.25-2.36-2.52-25.93-27.08-27.24-28.41-3.01-3.06-7.05-4.51-10.3-1.53-2.96 2.71-3.44 7.44-.04 10.78l28.55 30.18s.93 1.1-.11 2.07z"
              ></path>
              <path
                fill="#e48c15"
                d="m85.46 54.4 2.41 2.58s-13.79 13.31-4.39 33.75c0 0 1.22 2.59-.38 3.02 0 0-1.4.78-3-3.2 0-.01-9.49-19.42 5.36-36.15z"
              ></path>
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-miterlimit="10"
                stroke-width="4"
                opacity="0.5"
                d="M63.28 10.2s5.81.88 11.19 6.64c5.38 5.77 7.87 13.18 7.87 13.18M77.44 3.5s4.87 2.45 8.63 8.5c3.76 6.05 4.67 13.05 4.67 13.05m-55.03 85.68s-5.86.39-12.35-4.09-10.52-11.18-10.52-11.18m18.69 25.1s-5.44.23-11.68-3.22-10.44-9.12-10.44-9.12"
              ></path>
            </svg>
          </h1>
          <p>
            Here&apos;s What happening on your store today. See the statistics
            at once.
          </p>
          <br />

          <Button
            className="btn-blue !capitalize gap-1"
            onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "Add Product",
              })
            }
          >
            <FaPlus />
            Add Product
          </Button>
        </div>
        <img src="/shop-illustration.webp" className="w-[250px]" />
      </div>
      <DashboardBoxes />

      <div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white">
        <div className="flex items-center w-full px-5 justify-between gap-4">
          <div className="col w-[15%]">
            <h4 className="font-[600] text-[13px] mb-2">Category By</h4>
            {context?.catData?.length !== 0 && (
              <Select
                style={{ zoom: "80%" }}
                labelId="demo-simple-select-label"
                id="productCatDrop"
                className="w-full"
                size="small"
                value={productCat}
                label="Category"
                onChange={handleChangeProductCat}
              >
                {context?.catData?.map((cat, item) => {
                  return <MenuItem value={cat?._id}>{cat?.name}</MenuItem>;
                })}
              </Select>
            )}
          </div>
          <div className="col w-[15%]">
            <h4 className="font-[600] text-[13px] mb-2">Sub Category By</h4>
            {context?.catData?.length !== 0 && (
              <Select
                style={{ zoom: "80%" }}
                labelId="demo-simple-select-label"
                id="productCatDrop"
                className="w-full"
                size="small"
                value={productSubCat}
                label="Sub Category"
                onChange={handleChangeProductSubCat}
              >
                {context?.catData?.map((cat, item) => {
                  return (
                    cat?.children?.length !== 0 &&
                    cat?.children?.map((subCat, index_) => {
                      return (
                        <MenuItem value={subCat?._id}>{subCat?.name}</MenuItem>
                      );
                    })
                  );
                })}
              </Select>
            )}
          </div>
          <div className="col w-[20%]">
            <h4 className="font-[600] text-[13px] mb-2">
              Third Level Category By
            </h4>
            {context?.catData?.length !== 0 && (
              <Select
                style={{ zoom: "80%" }}
                labelId="demo-simple-select-label"
                id="productCatDrop"
                className="w-full"
                size="small"
                value={productThirdLevelCat}
                label="Sub Category"
                onChange={handleChangeProductThirdLevelCat}
              >
                {context?.catData?.map((cat) => {
                  return (
                    cat?.children?.length !== 0 &&
                    cat?.children?.map((subCat) => {
                      return (
                        subCat?.children?.length !== 0 &&
                        subCat?.children?.map((thirdLevelCat, index) => {
                          return (
                            <MenuItem value={thirdLevelCat?._id} key={index}>
                              {thirdLevelCat?.name}
                            </MenuItem>
                          );
                        })
                      );
                    })
                  );
                })}
              </Select>
            )}
          </div>

          <div className="col w-[20%] ml-auto">
            <SearchBox />
          </div>
        </div>

        <br />

        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {isloading === false ? (
                productData?.length !== 0 &&
                productData
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((product, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell style={{ minWidth: columns.minWidth }}>
                          <div className="flex items-center gap-4 w-[300px]">
                            <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                              <Link to={`/product/${product?._id}`}>
                                <LazyLoadImage
                                  alt={"image"}
                                  effect="blur"
                                  src={product?.images[0]}
                                  className="w-full group-hover:scale-105 transition-all"
                                />
                              </Link>
                            </div>

                            <div className="info w-[75%]">
                              <h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa]">
                                <Link to={`/product/${product?._id}`}>
                                  {product?.name}
                                </Link>
                              </h3>
                              <span className="text-[12px]">
                                {product?.brand}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell style={{ minWidth: columns.minWidth }}>
                          {product?.catName}
                        </TableCell>
                        <TableCell style={{ minWidth: columns.minWidth }}>
                          {product?.subCat}
                        </TableCell>
                        <TableCell style={{ minWidth: columns.minWidth }}>
                          <div className="flex gap-1 flex-col">
                            <span className="oldPrice line-through leading-3 text-gray-500 text-[14px] font-[500]">
                              ₹ {product?.oldPrice}
                            </span>
                            <span className="price text-[#3872fa] text-[14px] font-[600]">
                              ₹ {product?.price}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell style={{ minWidth: columns.minWidth }}>
                          <p className="text-[14px] w-[100px]">
                            <span className="font-[600]"> {product?.sale}</span>{" "}
                            sale
                          </p>
                        </TableCell>
                        <TableCell style={{ minWidth: columns.minWidth }}>
                          <p className="text-[14px] w-[100px]">
                            <Rating
                              name="half-rating"
                              size="small"
                              defaultValue={product?.rating}
                            />
                          </p>
                        </TableCell>
                        <TableCell style={{ minWidth: columns.minWidth }}>
                          <div className="flex items-center gap-1">
                            <TooltipMUI title="Edit Product" placement="top">
                              <Button
                                onClick={() =>
                                  context?.setIsOpenFullScreenPanel({
                                    open: true,
                                    model: "Edit Product",
                                    id: product?._id,
                                  })
                                }
                                className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full !hover:bg-[#f1f1f1]"
                              >
                                <AiOutlineEdit className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                              </Button>
                            </TooltipMUI>

                            <Link to={`/product/${product?._id}`}>
                              <TooltipMUI
                                title="View Product Details"
                                placement="top"
                              >
                                <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full !hover:bg-[#f1f1f1]">
                                  <FaRegEye className="text-[18px] text-[rgba(0,0,0,0.7)]" />
                                </Button>
                              </TooltipMUI>
                            </Link>
                            <TooltipMUI title="Remove Product" placement="top">
                              <Button
                                onClick={() => deleteProduct(product?._id)}
                                className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full !hover:bg-[#f1f1f1]"
                              >
                                <GoTrash className="text-[18px] text-[rgba(0,0,0,0.7)]" />
                              </Button>
                            </TooltipMUI>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
              ) : (
                <>
                  <TableRow>
                    <TableCell colSpan={8}>
                      <div className="flex items-center justify-center w-full min-h-[400px]">
                        <CircularProgress color="inherit" />
                      </div>
                    </TableCell>
                  </TableRow>
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={productData?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>

      <div className="card my-4 shadow-md sm:rounded-lg bg-white">
        <div className="flex items-center justify-between px-5 py-5">
          <h2 className="text-[18px] font-[600]">Recent Orders</h2>
        </div>
        <div className="relative overflow-x-auto mt-5 pb-5">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  &nbsp;
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Order Id
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Payment Id
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Phone Number
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Address
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Pincode
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Total Amount
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  User Id
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Order Status
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b">
                <td className="px-6 py-4">
                  <Button
                    className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]"
                    onClick={() => isShowOrderProduct(0)}
                  >
                    {isOpenOrderProduct === 0 ? (
                      <FaAngleUp className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                    ) : (
                      <FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                    )}
                  </Button>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[#3872fa] font-[600]">
                    2378462874254
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[#3872fa] font-[600]">
                    pay_PYR35467842
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">Harshvardhan</td>
                <td className="px-6 py-4">9799246628</td>
                <td className="px-6 py-4">
                  <span className="block w-[300px]">
                    Birla Institue of Technology Pilani, Pilani, Rajasthan
                  </span>
                </td>
                <td className="px-6 py-4">333031</td>
                <td className="px-6 py-4">₹ 2999.00</td>
                <td className="px-6 py-4">contact@toodlers.in</td>
                <td className="px-6 py-4">
                  <span className="text-[#3872fa] font-[600]">
                    4235fd5462387ohfi
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Badge status="pending" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">2025-06-03</td>
              </tr>
              {isOpenOrderProduct === 0 && (
                <tr>
                  <td className="pl-20" colSpan="6">
                    <div className="relative overflow-x-auto">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Product Id
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Product Title
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Image
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Quantity
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Price
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Sub Total
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-white border-b">
                            <td className="px-6 py-4">
                              <span className="text-gray-600">
                                2378462874254
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              A-Line kurti With Sharana & Dupatta
                            </td>
                            <td className="px-6 py-4">
                              <img
                                src="https://api.spicezgold.com/download/file_1734529362999_gosriki-women-s-pink-ethnic-motifs-printed-kurta-with-trouser-dupatta-product-images-rvpkyh5qdr-0-202310141511.webp"
                                className="w-[40px] h-[40px] rounded-md object-cover"
                              />
                            </td>
                            <td className="px-6 py-4">2</td>
                            <td className="px-6 py-4">₹ 2999.00</td>
                            <td className="px-6 py-4">₹ 2999.00</td>
                          </tr>
                          <tr className="bg-white border-b">
                            <td className="px-6 py-4">
                              <span className="text-gray-600">
                                2378462874254
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              A-Line kurti With Sharana & Dupatta
                            </td>
                            <td className="px-6 py-4">
                              <img
                                src="https://api.spicezgold.com/download/file_1734529362999_gosriki-women-s-pink-ethnic-motifs-printed-kurta-with-trouser-dupatta-product-images-rvpkyh5qdr-0-202310141511.webp"
                                className="w-[40px] h-[40px] rounded-md object-cover"
                              />
                            </td>
                            <td className="px-6 py-4">2</td>
                            <td className="px-6 py-4">₹ 2999.00</td>
                            <td className="px-6 py-4">₹ 2999.00</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}

              <tr className="bg-white border-b">
                <td className="px-6 py-4">
                  <Button
                    className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]"
                    onClick={() => isShowOrderProduct(1)}
                  >
                    {isOpenOrderProduct === 1 ? (
                      <FaAngleUp className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                    ) : (
                      <FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                    )}
                  </Button>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[#3872fa] font-[600]">
                    2378462874254
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[#3872fa] font-[600]">
                    pay_PYR35467842
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">Harshvardhan</td>
                <td className="px-6 py-4">9799246628</td>
                <td className="px-6 py-4">
                  <span className="block w-[300px]">
                    Birla Institue of Technology Pilani, Pilani, Rajasthan
                  </span>
                </td>
                <td className="px-6 py-4">333031</td>
                <td className="px-6 py-4">₹ 2999.00</td>
                <td className="px-6 py-4">contact@toodlers.in</td>
                <td className="px-6 py-4">
                  <span className="text-[#3872fa] font-[600]">
                    4235fd5462387ohfi
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Badge status="pending" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">2025-06-03</td>
              </tr>
              {isOpenOrderProduct === 1 && (
                <tr>
                  <td className="pl-20" colSpan="6">
                    <div className="relative overflow-x-auto">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Product Id
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Product Title
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Image
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Quantity
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Price
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap"
                            >
                              Sub Total
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-white border-b">
                            <td className="px-6 py-4">
                              <span className="text-gray-600">
                                2378462874254
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              A-Line kurti With Sharana & Dupatta
                            </td>
                            <td className="px-6 py-4">
                              <img
                                src="https://api.spicezgold.com/download/file_1734529362999_gosriki-women-s-pink-ethnic-motifs-printed-kurta-with-trouser-dupatta-product-images-rvpkyh5qdr-0-202310141511.webp"
                                className="w-[40px] h-[40px] rounded-md object-cover"
                              />
                            </td>
                            <td className="px-6 py-4">2</td>
                            <td className="px-6 py-4">₹ 2999.00</td>
                            <td className="px-6 py-4">₹ 2999.00</td>
                          </tr>
                          <tr className="bg-white border-b">
                            <td className="px-6 py-4">
                              <span className="text-gray-600">
                                2378462874254
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              A-Line kurti With Sharana & Dupatta
                            </td>
                            <td className="px-6 py-4">
                              <img
                                src="https://api.spicezgold.com/download/file_1734529362999_gosriki-women-s-pink-ethnic-motifs-printed-kurta-with-trouser-dupatta-product-images-rvpkyh5qdr-0-202310141511.webp"
                                className="w-[40px] h-[40px] rounded-md object-cover"
                              />
                            </td>
                            <td className="px-6 py-4">2</td>
                            <td className="px-6 py-4">₹ 2999.00</td>
                            <td className="px-6 py-4">₹ 2999.00</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card my-4 shadow-md sm:rounded-lg bg-white">
        <div className="flex items-center justify-between px-5 py-5 pb-0">
          <h2 className="text-[18px] font-[600]">Total Users & Total Sales</h2>
        </div>
        <div className="flex items-center px-5 py-5 pt-1 gap-5">
          <span className="flex items-center gap-1 text-[15px]">
            <span className="block w-[8px] h-[8px] rounded-full bg-green-600"></span>
            Total Users
          </span>
          <span className="flex items-center gap-1 text-[15px]">
            <span className="block w-[8px] h-[8px] rounded-full bg-[#3872fa]"></span>
            Total Sales
          </span>
        </div>
        <LineChart
          width={1000}
          height={500}
          data={chart1Data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="none" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="TotalSales"
            stroke="#00A63E"
            activeDot={{ r: 8 }}
            strokeWidth={3}
          />
          <Line
            type="monotone"
            dataKey="TotalUsers"
            stroke="#3872fa"
            strokeWidth={3}
          />
        </LineChart>
      </div>
    </>
  );
};

export default Dashboard;
