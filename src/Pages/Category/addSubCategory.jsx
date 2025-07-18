import React, { useState, useContext } from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Button } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { MyContext } from "../../App";
import CircularProgress from "@mui/material/CircularProgress";
import { postData } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const AddSubCategory = () => {
  const [productCat, setProductCat] = useState("");
  const [productCat2, setProductCat2] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const history = useNavigate()

  const [formFields, setFormFields] = useState({
    name: "",
    parentCatName: null,
    parentId: null,
  });
  const [formFields2, setFormFields2] = useState({
    name: "",
    parentCatName: null,
    parentId: null,
  });

  const context = useContext(MyContext);

  const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
    formFields.parentId = event.target.value;
  };
  const handleChangeProductCat2 = (event) => {
    setProductCat2(event.target.value);
    formFields2.parentId = event.target.value;
  };

  const selectCatFun = (catName) => {
    formFields.parentCatName = catName;
  };
  const selectCatFun2 = (catName) => {
    formFields2.parentCatName = catName;
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    const catId = productCat;
    setProductCat(catId);
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };

  const onChangeInput2 = (e) => {
    const { name, value } = e.target;

    const catId = productCat2;
    setProductCat2(catId);
    setFormFields2(() => {
      return {
        ...formFields2,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);
    if (productCat === "") {
      context.alertBox("error", "Please select a parent category");
      setIsLoading(false);
      return false;
    }
    if (formFields.name === "") {
      context.alertBox("error", "Please enter sub category name");
      setIsLoading(false);
      return false;
    }

    postData("/api/category/create", formFields).then((res) => {
      setTimeout(() => {
        setIsLoading(false);
        context.setIsOpenFullScreenPanel({
          open: false,
        });
        context?.getCat();
         history("/subCategory/list");
      }, 2500);
    });
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();

    setIsLoading2(true);
    if (productCat2 === "") {
      context.alertBox("error", "Please select a parent category");
      setIsLoading2(false);
      return false;
    }
    if (formFields2.name === "") {
      context.alertBox("error", "Please enter sub category name");
      setIsLoading2(false);
      return false;
    }

    postData("/api/category/create", formFields2).then((res) => {
      setTimeout(() => {
        setIsLoading2(false);
        context.setIsOpenFullScreenPanel({
          open: false,
        });
        context?.getCat();
      }, 2500);
    });
  };

  return (
    <section className="p-5 bg-gray-50 grid grid-cols-2 gap-10">
      <form className="form p-8 py-3" onSubmit={handleSubmit}>
        <h4 className="font-[600]">Add Sub Category</h4>
        <div className="scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4">
          <div className="grid grid-cols-2 mb-3 gap-5">
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Sub Category Name
              </h3>
              <Select
                labelId="demo-simple-select-label"
                id="productCatDrop"
                className="w-full"
                size="small"
                value={productCat}
                label="Category"
                onChange={handleChangeProductCat}
              >
                {context?.catData?.length !== 0 &&
                  context?.catData?.map((item, index) => {
                    return (
                      <MenuItem
                        key={index}
                        value={item?._id}
                        onClick={() => selectCatFun(item?.name)}
                      >
                        {item?.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Sub Category Name
              </h3>
              <input
                type="text"
                name="name"
                value={formFields.name}
                onChange={onChangeInput}
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm p-3"
              />
            </div>
          </div>
          <br />
        </div>
        <div className="w-[250px]">
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
        </div>
      </form>

      <form className="form p-8 py-3" onSubmit={handleSubmit2}>
        <h4 className="font-[600]">Add Third Level Category</h4>
        <div className="scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4">
          <div className="grid grid-cols-2 mb-3 gap-5">
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Sub Category Name
              </h3>
              <Select
                labelId="demo-simple-select-label"
                id="productCatDrop"
                className="w-full"
                size="small"
                value={productCat2}
                label="Category"
                onChange={handleChangeProductCat2}
              >
                {context?.catData?.length !== 0 &&
                  context?.catData?.map((item, index) => {
                    return (
                      item?.children?.length !== 0 &&
                      item?.children?.map((item2, index) => {
                        return (
                          <MenuItem
                            key={index}
                            value={item2?._id}
                            onClick={() => selectCatFun2(item2?.name)}
                          >
                            {item2?.name}
                          </MenuItem>
                        );
                      })
                    );
                  })}
              </Select>
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Sub Category Name
              </h3>
              <input
                type="text"
                name="name"
                value={formFields2.name}
                onChange={onChangeInput2}
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm p-3"
              />
            </div>
          </div>
          <br />
        </div>
        <div className="w-[250px]">
          <Button type="submit" className="btn-blue btn-lg w-full flex gap-2">
            {isLoading2 === true ? (
              <CircularProgress color="inherit" />
            ) : (
              <>
                <FaCloudUploadAlt className="text-[25px] text-white" />
                Publish and View
              </>
            )}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AddSubCategory;
