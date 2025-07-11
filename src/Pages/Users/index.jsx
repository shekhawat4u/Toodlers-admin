import React, { useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import SearchBox from "../../Components/SearchBox/Index";
import { MyContext } from "../../App";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { MdLocalPhone } from "react-icons/md";
import { SlCalender } from "react-icons/sl";

const columns = [
  { id: "userImg", label: "USER IMAGE", minWidth: 80 },
  { id: "userName", label: "USER NAME", minWidth: 100 },
  { id: "userEmail", label: "USER EMAIL", minWidth: 150 },
  { id: "userPh", label: "USER PHONE NO", minWidth: 130 },
  { id: "createdDate", label: "CREATED", minWidth: 130 },
];

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Users = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <>
      <div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white">
        <div className="flex items-center w-full px-5 justify-between">
          <div className="col w-[20%]">
            <h2 className="text-[18px] font-[600]">Users List</h2>
          </div>

          <div className="col w-[40%] ml-auto">
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
              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4 w-[70px]">
                    <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                      <Link to="/product/124">
                        <img
                          src="https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/7.webp"
                          className="w-full group-hover:scale-105 transition-all"
                        ></img>
                      </Link>
                    </div>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Harshvardhan
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex gap-2 items-center">
                    <MdOutlineMarkEmailRead />
                    contact@toodlers.in
                  </span>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex gap-2 items-center">
                    <MdLocalPhone />
                    +91-9799246628
                  </span>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex gap-2 items-center">
                    <SlCalender />
                    07-06-2025
                  </span>
                </TableCell>
              </TableRow>
            </TableBody>
             <TableBody>
              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4 w-[70px]">
                    <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                      <Link to="/product/124">
                        <img
                          src="https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/7.webp"
                          className="w-full group-hover:scale-105 transition-all"
                        ></img>
                      </Link>
                    </div>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Harshvardhan
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex gap-2 items-center">
                    <MdOutlineMarkEmailRead />
                    contact@toodlers.in
                  </span>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex gap-2 items-center">
                    <MdLocalPhone />
                    +91-9799246628
                  </span>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex gap-2 items-center">
                    <SlCalender />
                    07-06-2025
                  </span>
                </TableCell>
              </TableRow>
            </TableBody>
             <TableBody>
              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4 w-[70px]">
                    <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                      <Link to="/product/124">
                        <img
                          src="https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/7.webp"
                          className="w-full group-hover:scale-105 transition-all"
                        ></img>
                      </Link>
                    </div>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Harshvardhan
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex gap-2 items-center">
                    <MdOutlineMarkEmailRead />
                    contact@toodlers.in
                  </span>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex gap-2 items-center">
                    <MdLocalPhone />
                    +91-9799246628
                  </span>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex gap-2 items-center">
                    <SlCalender />
                    07-06-2025
                  </span>
                </TableCell>
              </TableRow>
            </TableBody>
             <TableBody>
              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4 w-[70px]">
                    <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                      <Link to="/product/124">
                        <img
                          src="https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/7.webp"
                          className="w-full group-hover:scale-105 transition-all"
                        ></img>
                      </Link>
                    </div>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Harshvardhan
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex gap-2 items-center">
                    <MdOutlineMarkEmailRead />
                    contact@toodlers.in
                  </span>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex gap-2 items-center">
                    <MdLocalPhone />
                    +91-9799246628
                  </span>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex gap-2 items-center">
                    <SlCalender />
                    07-06-2025
                  </span>
                </TableCell>
              </TableRow>
            </TableBody>
             <TableBody>
              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4 w-[70px]">
                    <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                      <Link to="/product/124">
                        <img
                          src="https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/7.webp"
                          className="w-full group-hover:scale-105 transition-all"
                        ></img>
                      </Link>
                    </div>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Harshvardhan
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex gap-2 items-center">
                    <MdOutlineMarkEmailRead />
                    contact@toodlers.in
                  </span>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex gap-2 items-center">
                    <MdLocalPhone />
                    +91-9799246628
                  </span>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex gap-2 items-center">
                    <SlCalender />
                    07-06-2025
                  </span>
                </TableCell>
              </TableRow>
            </TableBody>
             <TableBody>
              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4 w-[70px]">
                    <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                      <Link to="/product/124">
                        <img
                          src="https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/7.webp"
                          className="w-full group-hover:scale-105 transition-all"
                        ></img>
                      </Link>
                    </div>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Harshvardhan
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex gap-2 items-center">
                    <MdOutlineMarkEmailRead />
                    contact@toodlers.in
                  </span>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex gap-2 items-center">
                    <MdLocalPhone />
                    +91-9799246628
                  </span>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex gap-2 items-center">
                    <SlCalender />
                    07-06-2025
                  </span>
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
export default Users;
