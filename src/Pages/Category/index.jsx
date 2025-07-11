import React, { useContext, useState, useEffect } from "react";
import { Button } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import TooltipMUI from "@mui/material/Tooltip";
import { AiOutlineEdit } from "react-icons/ai";
import { GoTrash } from "react-icons/go";
import { MyContext } from "../../App";
import { deleteData, fetchDataFromApi } from "../../utils/api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const columns = [
  { id: "image", label: "IMAGE", minWidth: 150 },
  { id: "catName", label: "CATEGORY NAME", minWidth: 150 },
  { id: "action", label: "ACTION", minWidth: 100 },
];

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const CategoryList = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const context = useContext(MyContext);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchDataFromApi("/api/category").then((res) => {
      context?.setCatData(res?.data);
    });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteCat = (id) => {
    deleteData(`/api/category/${id}`).then((res) => {
      fetchDataFromApi("/api/category").then((res) => {
        context?.setCatData(res?.data);
      });
    });
  };

  return (
    <>
      <div className="flex items-center justify-between px-2 py-0 mt-3">
        <h2 className="text-[18px] font-[600]">Category List</h2>

        <div className="col w-[30%] ml-auto flex justify-end items-center gap-3">
          
          <Button
            className="btn-blue btn-sm"
            onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "Add New Category",
              })
            }
          >
            Add New Category
          </Button>
        </div>
      </div>
      <div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white">
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell width={60}>
                  <Checkbox {...label} size="small" />
                </TableCell>

                {columns.map((column) => (
                  <TableCell
                    width={column.minWidth}
                    key={column.id}
                    align={column.align}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {context?.catData?.length !== 0 &&
                context?.catData?.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>
                        <Checkbox {...label} size="small" />
                      </TableCell>
                      <TableCell width={100}>
                        <div className="flex items-center gap-4 w-[80px]">
                          <div className="img w-full rounded-md overflow-hidden group">
                            <Link to="/product/124">
                              <LazyLoadImage
                                alt={"image"}
                                effect="blur"
                                className="w-full group-hover:scale-105 transition-all"
                                src={item.images[0]}
                              />
                            </Link>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell width={100}>{item?.name}</TableCell>
                      <TableCell width={100}>
                        <div className="flex items-center gap-1">
                          <TooltipMUI title="Edit Product" placement="top">
                            <Button
                              onClick={() =>
                                context.setIsOpenFullScreenPanel({
                                  open: true,
                                  model: "Edit Category",
                                  id: item?._id,
                                })
                              }
                              className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full !hover:bg-[#f1f1f1]"
                            >
                              <AiOutlineEdit className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                            </Button>
                          </TooltipMUI>

                          <TooltipMUI title="Remove Product" placement="top">
                            <Button
                              onClick={() => deleteCat(item?._id)}
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
          count={10}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
};
export default CategoryList;
