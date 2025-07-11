import React from "react";
import { Button } from "@mui/material";
import { MdOutlineModeEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { useState } from "react";
import { useContext } from "react";
import { MyContext } from "../../App";
import { Select, MenuItem } from "@mui/material";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { deleteData, editData } from "../../utils/api";

export const EditSubCatBox = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [selectVal, setSelectVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(MyContext);
  const [formFields, setFormFields] = useState({
    name: "",
    parentCatName: null,
    parentId: null,
  });

  useEffect(() => {
    formFields.name = props?.name;
    formFields.parentCatName = props?.parentCatName;
    formFields.parentId = props?.parentId;
    setSelectVal(props?.selectedCat);
  }, []);

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    const catId = selectVal;
    setSelectVal(catId);

    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };

  const handleChange = (event) => {
    setSelectVal(event.target.value);
    formFields.parentId = event.target.value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (formFields.name === "") {
      context.alertBox("error", "Please enter sub category name");
      setIsLoading(false);
      return false;
    }

    editData(`/api/category/${props?.id}`, formFields).then((res) => {
      setTimeout(() => {
        context.alertBox("success", "Sub Category Updated Successfully");
        context?.getCat();
        setIsLoading(false);
      }, 1000);
    });
  };

  const deleteCat = (id) => {
    deleteData(`/api/category/${id}`).then((res) => {
      context.alertBox("success", "Sub Category Deleted Successfully");
      context?.getCat();
    });
  };

  return (
    <>
      <form
        className="w-full flex items-center gap-3 p-0 px-4"
        onSubmit={handleSubmit}
      >
        {editMode === true && (
          <>
            <div className="flex items-center justify-between py-2 gap-4">
              <div className="w-[150px]">
                <Select
                  style={{ zoom: "75%" }}
                  className="w-full"
                  size="small"
                  value={selectVal}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  {props?.catData?.length !== 0 &&
                    props?.catData?.map((item, index) => {
                      return (
                        <MenuItem
                          value={item?._id}
                          key={index}
                          onClick={() => {
                            formFields.parentCatName = item?.name;
                          }}
                        >
                          {item?.name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </div>
              <input
                type="text"
                className="w-full h-[30px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm"
                name="name"
                value={formFields?.name}
                onChange={onChangeInput}
              />

              <div className="flex items-center gap-2">
                <Button
                  className="btn-sml"
                  size="small"
                  type="submit"
                  variant="contained"
                >
                  {isLoading === true ? (
                    <CircularProgress color="inherit" />
                  ) : (
                    <>Edit</>
                  )}
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </>
        )}
        {editMode === false && (
          <>
            <span className="font-[500] text-[14px]">{props?.name}</span>
            <div className="flex items-center ml-auto gap-2">
              <Button
                className="!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black !ml-auto"
                onClick={() => {
                  setEditMode(true);
                }}
              >
                <MdOutlineModeEdit />
              </Button>
              <Button
                className="!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black !ml-auto"
                onClick={() => {
                  deleteCat(props?.id);
                }}
              >
                <FaRegTrashAlt />
              </Button>
            </div>
          </>
        )}
      </form>
    </>
  );
};

export default EditSubCatBox;
