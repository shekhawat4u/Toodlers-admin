import { Button } from "@mui/material";
import React, { useContext, useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { BiExport } from "react-icons/bi";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import ProgressBar from "../../Components/ProgressBar";
import TooltipMUI from "@mui/material/Tooltip";
import { AiOutlineEdit } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import SearchBox from "../../Components/SearchBox/Index";
import { MyContext } from "../../App";
import { useEffect } from "react";
import { deleteData, fetchDataFromApi } from "../../utils/api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const columns = [
  { id: "product", label: "PRODUCT", minWidth: 150 },
  { id: "category", label: "CATEGORY", minWidth: 100 },
  { id: "subcategory", label: "SUB CATEGORY", minWidth: 150 },
  { id: "price", label: "PRICE", minWidth: 130 },
  { id: "sales", label: "SALES", minWidth: 100 },
  { id: "action", label: "ACTION", minWidth: 120 },
];

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Products = () => {
  const [categoryFilterVal, setCategoryFilterVal] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const context = useContext(MyContext);
  const [page, setPage] = useState(0);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    fetchDataFromApi("/api/product/getAllProducts").then((res) => {
      if (res?.error === false) {
        setProductData(res?.products);
      }
    });
  }, []);

  useEffect(() => {
    getProducts();
  }, [context?.isOpenFullScreenPanel]);

  const getProducts = async () => {
    fetchDataFromApi("/api/product/getAllProducts").then((res) => {
      if (res?.error === false) {
        setProductData(res?.products);
      }
    });
  };

  const handleChangeCatFilter = (event) => {
    setCategoryFilterVal(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteProduct = (id) => {
    deleteData(`/api/product/${id}`).then((res) => {
      context.alertBox(
        "success",
        res?.message || "Product deleted successfully"
      );
      getProducts();
    });
  };
  return (
    <>
      <div className="flex items-center justify-between px-2 py-0 mt-3">
        <h2 className="text-[18px] font-[600]">Products</h2>

        <div className="col w-[25%] ml-auto flex justify-end items-center gap-3">
          <Button className="btn-blue !bg-green-600 btn-sm flex items-center gap-1">
            <BiExport className="text-[18px]" />
            Export
          </Button>
          <Button
            className="btn-blue btn-sm"
            onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "Add Product",
              })
            }
          >
            Add Product
          </Button>
        </div>
      </div>
      <div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white">
        <div className="flex items-center w-full px-5 justify-between">
          <div className="col w-[20%]">
            <h4 className="font-[600] text-[13px] mb-2">Category By</h4>
            <Select
              className="w-full"
              size="small"
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={categoryFilterVal}
              label="Category"
              onChange={handleChangeCatFilter}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Men</MenuItem>
              <MenuItem value={20}>Women</MenuItem>
              <MenuItem value={30}>Kids</MenuItem>
            </Select>
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
                <TableCell>
                  <Checkbox {...label} size="small" />
                </TableCell>

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
              {productData?.length !== 0 &&
                productData
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((product, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell style={{ minWidth: columns.minWidth }}>
                          <Checkbox {...label} size="small" />
                        </TableCell>
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
                            <TooltipMUI
                              title="View Product Details"
                              placement="top"
                            >
                              <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full !hover:bg-[#f1f1f1]">
                                <FaRegEye className="text-[18px] text-[rgba(0,0,0,0.7)]" />
                              </Button>
                            </TooltipMUI>
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
                  })}
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
    </>
  );
};
export default Products;
