import React, { useContext, useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "@mui/material";
import { AiOutlineEdit } from "react-icons/ai";
import { GoTrash } from "react-icons/go";
import TooltipMUI from "@mui/material/Tooltip";
import { MyContext } from "../../App";
import {
  fetchDataFromApi,
  postData,
  deleteData,
  editData,
} from "../../utils/api";

const AddWEIGHT = () => {
  const [name, setName] = useState();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editId, seteditId] = useState("");

  const context = useContext(MyContext);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setIsLoading(true);
    fetchDataFromApi("/api/product/productWEIGHT/get").then((res) => {
      setData(res?.data);
      setIsLoading(false);
    });
  };

  const deleteItem = (id) => {
    deleteData(`/api/product/productWEIGHT/${id}`).then((res) => {
      context.alertBox("success", "Product Weight deleted successfully");
      getData();
    });
  };

  const editItem = (id) => {
    fetchDataFromApi(`/api/product/productWEIGHT/${id}`).then((res) => {
      setName(res?.data?.name);
      seteditId(res?.data?._id);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (name === "" || name === undefined) {
      context.alertBox("error", "Please enter product Weight");
      setIsLoading(false);
      return false;
    }

    if (editId === "") {
      postData(`/api/product/productWEIGHT/create`, { name: name }).then(
        (res) => {
          context.alertBox("success", "Product Weight added successfully");
          setTimeout(() => {
            getData();
            setName("");
            setIsLoading(false);
          }, 1000);
        }
      );
    }

    if (editId !== "") {
      editData(`/api/product/productWEIGHT/${editId}`, { name: name }).then(
        (res) => {
          context.alertBox("success", "Product Weight edited successfully");
          setTimeout(() => {
            getData();
            setName("");
            setIsLoading(false);
          }, 1000);
        }
      );
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-2 py-0 mt-3">
        <h2 className="text-[18px] font-[600]">Add Product WEIGHT</h2>
      </div>

      <div className="card my-4 pt-5 pb-5 shadow-md sm:rounded-lg bg-white w-[65%]">
        <form className="form p-6 py-3" onSubmit={handleSubmit}>
          <div className="col mb-4">
            <h3 className="text-[14px] font-[500] mb-1 text-black">
              PRODUCT WEIGHT
            </h3>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm p-3"
            />
          </div>

          <Button type="submit" className="btn-blue btn-lg w-full flex gap-2">
            {isLoading === true ? (
              <CircularProgress color="inherit" />
            ) : (
              <>
                <FaCloudUploadAlt className="text-[25px] text-white" />
                Publish and View
              </>
            )}
          </Button>
        </form>
      </div>

      {data?.length !== 0 && (
        <div className="card my-4 pt-5 pb-5 shadow-md sm:rounded-lg bg-white w-[65%]">
          <div className="relative overflow-x-auto mt-5 pb-5">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 whitespace-nowrap"
                    width="60%"
                  >
                    PRODUCT WEIGHT
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 whitespace-nowrap"
                    width="30%"
                  >
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item, index) => {
                  return (
                    <tr
                      class="odd:bg-white even:bg-gray-50 order-b border-gray-200"
                      key={index}
                    >
                     

                      <td className="px-6 py-2">
                        <span className="font-[600]">{item?.name}</span>
                      </td>

                      <td className="px-6 py-2">
                        <div className="flex items-center gap-1">
                          <TooltipMUI title="Edit SIZE" placement="top">
                            <Button
                              onClick={() => editItem(item?._id)}
                              className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full !hover:bg-[#f1f1f1]"
                            >
                              <AiOutlineEdit className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                            </Button>
                          </TooltipMUI>

                          <TooltipMUI title="Remove SIZE" placement="top">
                            <Button
                              onClick={() => deleteItem(item?._id)}
                              className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full !hover:bg-[#f1f1f1]"
                            >
                              <GoTrash className="text-[18px] text-[rgba(0,0,0,0.7)]" />
                            </Button>
                          </TooltipMUI>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default AddWEIGHT;
