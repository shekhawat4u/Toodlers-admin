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

const columns = [
  { id: "image", label: "IMAGE", minWidth: 150 },
  { id: "catName", label: "CATEGORY NAME", minWidth: 150 },
  { id: "action", label: "ACTION", minWidth: 100 },
];

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const CategoryList = () => {
  const [categoryFilterVal, setCategoryFilterVal] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const context = useContext(MyContext);
  const [page, setPage] = useState(0);

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
  return (
    <>
      <div className="flex items-center justify-between px-2 py-0 mt-3">
        <h2 className="text-[18px] font-[600]">Category List</h2>

        <div className="col w-[30%] ml-auto flex justify-end items-center gap-3">
          <Button className="btn-blue !bg-green-600 btn-sm flex items-center gap-1">
            <BiExport className="text-[18px]" />
            Export
          </Button>
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
              <TableRow>
                <TableCell>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell width={100}>
                  <div className="flex items-center gap-4 w-[80px]">
                    <div className="img w-full rounded-md overflow-hidden group">
                      <Link to="/product/124">
                        <img
                          src="https://api.spicezgold.com/download/file_1734525239704_foot.png"
                          className="w-full group-hover:scale-105 transition-all"
                        ></img>
                      </Link>
                    </div>
                  </div>
                </TableCell>
                <TableCell width={100}>Fashion</TableCell>
                <TableCell width={100}>
                  <div className="flex items-center gap-1">
                    <TooltipMUI title="Edit Product" placement="top">
                      <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full !hover:bg-[#f1f1f1]">
                        <AiOutlineEdit className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                      </Button>
                    </TooltipMUI>
                    <TooltipMUI title="View Product Details" placement="top">
                      <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full !hover:bg-[#f1f1f1]">
                        <FaRegEye className="text-[18px] text-[rgba(0,0,0,0.7)]" />
                      </Button>
                    </TooltipMUI>
                    <TooltipMUI title="Remove Product" placement="top">
                      <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full !hover:bg-[#f1f1f1]">
                        <GoTrash className="text-[18px] text-[rgba(0,0,0,0.7)]" />
                      </Button>
                    </TooltipMUI>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell width={100}>
                  <div className="flex items-center gap-4 w-[80px]">
                    <div className="img w-full rounded-md overflow-hidden group">
                      <Link to="/product/124">
                        <img
                          src="https://api.spicezgold.com/download/file_1734525239704_foot.png"
                          className="w-full group-hover:scale-105 transition-all"
                        ></img>
                      </Link>
                    </div>
                  </div>
                </TableCell>
                <TableCell width={100}>Fashion</TableCell>
                <TableCell width={100}>
                  <div className="flex items-center gap-1">
                    <TooltipMUI title="Edit Product" placement="top">
                      <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full !hover:bg-[#f1f1f1]">
                        <AiOutlineEdit className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                      </Button>
                    </TooltipMUI>
                    <TooltipMUI title="View Product Details" placement="top">
                      <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full !hover:bg-[#f1f1f1]">
                        <FaRegEye className="text-[18px] text-[rgba(0,0,0,0.7)]" />
                      </Button>
                    </TooltipMUI>
                    <TooltipMUI title="Remove Product" placement="top">
                      <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full !hover:bg-[#f1f1f1]">
                        <GoTrash className="text-[18px] text-[rgba(0,0,0,0.7)]" />
                      </Button>
                    </TooltipMUI>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell width={100}>
                  <div className="flex items-center gap-4 w-[80px]">
                    <div className="img w-full rounded-md overflow-hidden group">
                      <Link to="/product/124">
                        <img
                          src="https://api.spicezgold.com/download/file_1734525239704_foot.png"
                          className="w-full group-hover:scale-105 transition-all"
                        ></img>
                      </Link>
                    </div>
                  </div>
                </TableCell>
                <TableCell width={100}>Fashion</TableCell>
                <TableCell width={100}>
                  <div className="flex items-center gap-1">
                    <TooltipMUI title="Edit Product" placement="top">
                      <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full !hover:bg-[#f1f1f1]">
                        <AiOutlineEdit className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                      </Button>
                    </TooltipMUI>
                    <TooltipMUI title="View Product Details" placement="top">
                      <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full !hover:bg-[#f1f1f1]">
                        <FaRegEye className="text-[18px] text-[rgba(0,0,0,0.7)]" />
                      </Button>
                    </TooltipMUI>
                    <TooltipMUI title="Remove Product" placement="top">
                      <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full !hover:bg-[#f1f1f1]">
                        <GoTrash className="text-[18px] text-[rgba(0,0,0,0.7)]" />
                      </Button>
                    </TooltipMUI>
                  </div>
                </TableCell>
              </TableRow>
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
