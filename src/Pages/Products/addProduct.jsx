import React, { useState, useContext } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Button, Rating } from "@mui/material";
import UploadBox from "../../Components/UploadBox";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IoMdClose } from "react-icons/io";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MyContext } from "../../App";
import { deleteImages, fetchDataFromApi, postData } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect } from "react";

const AddProduct = () => {
  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    images: [],
    brand: "",
    price: "",
    category: "",
    oldPrice: "",
    catName: "",
    catId: "",
    subCat: "",
    subCatId: "",
    thirdsubCatId: "",
    thirdsubCat: "",
    countInStock: "",
    rating: "",
    isFeatured: false,
    discount: "",
    size: [],
    productWeight: [],
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };

  const [productCat, setProductCat] = useState("");
  const [productSubCat, setProductSubCat] = useState("");
  const [productThirdLevelCat, setProductThirdLevelCat] = useState("");
  const [productFeatured, setProductFeatured] = useState("");
  const [productWeight, setProductWeight] = useState([]);
  const [productWeightData, setProductWeightData] = useState([]);
  const [productSize, setProductSize] = useState([]);
  const [productSizeData, setProductSizeData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [previews, setPreviews] = useState([]);
  const context = useContext(MyContext);
  const history = useNavigate();

  useEffect(() => {
    fetchDataFromApi("/api/product/productSIZE/get").then((res) => {
      if (res?.error === false) {
        setProductSizeData(res?.data);
      }
    });

    fetchDataFromApi("/api/product/productWEIGHT/get").then((res) => {
      if (res?.error === false) {
        setProductWeightData(res?.data);
      }
    });
  }, []);

  const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
    formFields.catId = event.target.value;
    formFields.category = event.target.value;
  };

  const selectCatByName = (name) => {
    formFields.catName = name;
  };

  const handleChangeProductSubCat = (event) => {
    setProductSubCat(event.target.value);
    formFields.subCatId = event.target.value;
  };

  const selectSubCatByName = (name) => {
    formFields.subCat = name;
  };

  const handleChangeProductThirdLevelCat = (event) => {
    setProductThirdLevelCat(event.target.value);
    formFields.thirdsubCatId = event.target.value;
  };

  const selectThirdLevelCatByName = (name) => {
    formFields.thirdsubCat = name;
  };

  const handleChangeProductFeatured = (event) => {
    setProductFeatured(event.target.value);
    formFields.isFeatured = event.target.value;
  };

  const handleChangeProductWeight = (event) => {
    const {
      target: { value },
    } = event;
    setProductWeight(typeof value === "string" ? value.split(",") : value);
    formFields.productWeight = value;
  };

  const handleChangeProductSize = (event) => {
    const {
      target: { value },
    } = event;
    setProductSize(typeof value === "string" ? value.split(",") : value);
    formFields.size = value;
  };

  const onChangeRating = (e) => {
    setFormFields(() => ({
      ...formFields,
      rating: e.target.value,
    }));
  };

  const setPreviewsFun = (previewsArr) => {
    setPreviews(previewsArr);
    formFields.images = previewsArr;
  };

  const removeImg = (image, index) => {
    var imageArr = [];
    imageArr = previews;
    deleteImages(`/api/category/deleteImage?img=${image}`).then(() => {
      imageArr.splice(index, 1);
      setPreviews([]);
      setTimeout(() => {
        setPreviews(imageArr);
        formFields.images = imageArr;
      }, 100);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(0);

    setIsLoading(true);

    if (formFields.name === "") {
      context.alertBox("error", "Please enter product name");
      setIsLoading(false);
      return false;
    }
    if (formFields.description === "") {
      context.alertBox("error", "Please enter product description");
      setIsLoading(false);
      return false;
    }
    if (formFields.catId === "") {
      context.alertBox("error", "Please select product category");
      setIsLoading(false);
      return false;
    }
    if (formFields.price === "") {
      context.alertBox("error", "Please enter product price");
      setIsLoading(false);
      return false;
    }
    if (formFields.oldPrice === "") {
      context.alertBox("error", "Please enter product old price");
      setIsLoading(false);
      return false;
    }

    if (formFields.countInStock === "") {
      context.alertBox("error", "Please enter product stock");
      setIsLoading(false);
      return false;
    }
    if (formFields.brand === "") {
      context.alertBox("error", "Please enter product brand");
      setIsLoading(false);
      return false;
    }

    if (formFields.discount === "") {
      context.alertBox("error", "Please enter product discount");
      setIsLoading(false);
      return false;
    }
    if (formFields.rating === "") {
      context.alertBox("error", "Please enter product rating");
      setIsLoading(false);
      return false;
    }
    if (previews?.length === 0) {
      context.alertBox("error", "Please select product image");
      setIsLoading(false);
      return false;
    }

    setIsLoading(true);

    postData("/api/product/create", formFields).then((res) => {
      if (res?.error === false) {
        context.alertBox("success", res?.message);

        setTimeout(() => {
          setIsLoading(false);
          context.setIsOpenFullScreenPanel({
            open: false,
          });
          history("/products");
        }, 1000);
      } else {
        setIsLoading(false);
        context.alertBox("error", res?.message);
      }
    });
  };

  return (
    <section className="p-5 bg-gray-50">
      <form className="form p-8 py-3" onSubmit={handleSubmit}>
        <div className="scroll max-h-[72vh] overflow-y-scroll pr-4">
          <div className="grid grid-cols-1 mb-3">
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Name
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

          <div className="grid grid-cols-1 mb-3">
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Description
              </h3>
              <textarea
                type="text"
                name="description"
                value={formFields.description}
                onChange={onChangeInput}
                className="w-full h-[140px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm p-3"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 mb-3 gap-4">
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Category
              </h3>

              {context?.catData?.length !== 0 && (
                <Select
                  labelId="demo-simple-select-label"
                  id="productCatDrop"
                  className="w-full"
                  size="small"
                  value={productCat}
                  label="Category"
                  onChange={handleChangeProductCat}
                >
                  {context?.catData?.map((cat, item) => {
                    return (
                      <MenuItem
                        value={cat?._id}
                        onClick={() => selectCatByName(cat?.name)}
                      >
                        {cat?.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Sub Category
              </h3>
              {context?.catData?.length !== 0 && (
                <Select
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
                          <MenuItem
                            value={subCat?._id}
                            onClick={() => selectSubCatByName(subCat?.name)}
                          >
                            {subCat?.name}
                          </MenuItem>
                        );
                      })
                    );
                  })}
                </Select>
              )}
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Third Level Category
              </h3>
              {context?.catData?.length !== 0 && (
                <Select
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
                              <MenuItem
                                value={thirdLevelCat?._id}
                                key={index}
                                onClick={() =>
                                  selectThirdLevelCatByName(thirdLevelCat?.name)
                                }
                              >
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

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Price
              </h3>
              <input
                type="number"
                name="price"
                value={formFields.price}
                onChange={onChangeInput}
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm p-3"
              />
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Old Price
              </h3>
              <input
                type="number"
                name="oldPrice"
                value={formFields.oldPrice}
                onChange={onChangeInput}
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm p-3"
              />
            </div>
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Is Featured?
              </h3>
              <Select
                labelId="demo-simple-select-label"
                id="productCatDrop"
                className="w-full"
                size="small"
                value={productFeatured}
                label="Category"
                onChange={handleChangeProductFeatured}
              >
                <MenuItem value={true}>True</MenuItem>
                <MenuItem value={false}>False</MenuItem>
              </Select>
            </div>
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Stock
              </h3>
              <input
                type="number"
                name="countInStock"
                value={formFields.countInStock}
                onChange={onChangeInput}
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm p-3"
              />
            </div>
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Brand
              </h3>
              <input
                type="text"
                name="brand"
                value={formFields.brand}
                onChange={onChangeInput}
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm p-3"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 mb-3 gap-4">
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Discount
              </h3>
              <input
                type="number"
                name="discount"
                value={formFields.discount}
                onChange={onChangeInput}
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm p-3"
              />
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Weight
              </h3>
              {productWeightData?.length !== 0 && (
                <Select
                  multiple
                  labelId="demo-simple-select-label"
                  id="productCatDrop"
                  className="w-full"
                  size="small"
                  value={productWeight}
                  label="Category"
                  onChange={handleChangeProductWeight}
                >
                  {productWeightData?.map((item, index) => {
                    return (
                      <MenuItem value={index} key={index}>
                        {item?.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Size
              </h3>
              {productSizeData?.length !== 0 && (
                <Select
                  multiple
                  labelId="demo-simple-select-label"
                  id="productCatDrop"
                  className="w-full"
                  size="small"
                  value={productSize}
                  label="Category"
                  onChange={handleChangeProductSize}
                >
                  {productSizeData?.map((item, index) => {
                    return (
                      <MenuItem value={index} key={index}>
                        {item?.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 mb-3 gap-4">
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Rating
              </h3>
              <Rating
                name="half-rating"
                defaultValue={1}
                precision={0.5}
                onChange={onChangeRating}
              />
            </div>
          </div>

          <div className="col w-full p-5 px-0">
            <h3 className="font-[700] text-[18px] mb-3">Media & Images</h3>

            <div className="grid grid-cols-7 gap-4">
              {previews?.length !== 0 &&
                previews?.map((image, index) => {
                  return (
                    <div className="uploadBoxWrapper relative" key={index}>
                      <span
                        onClick={() => removeImg(image, index)}
                        className="absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer"
                      >
                        <IoMdClose className="text-white text-[17px]" />
                      </span>
                      <div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex flex-col items-center justify-center relative">
                        <img src={image} className="w-100" />
                      </div>
                    </div>
                  );
                })}

              <UploadBox
                multiple={true}
                setPreviewsFun={setPreviewsFun}
                name="images"
                url="/api/product/uploadImages"
              />
            </div>
          </div>
        </div>
        <hr /> <br />
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
    </section>
  );
};

export default AddProduct;
