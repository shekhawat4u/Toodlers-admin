import React, { useState } from "react";
import UploadBox from "../../Components/UploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IoMdClose } from "react-icons/io";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Button } from "@mui/material";

const AddCategory = () => {
  const [previews, setPreviews] = useState([]);

  const [formFields, setFormFields] = useState({
    name: "",
    images: [],
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

  const setPreviewsFun = (previewsArr) => {
    setPreviews(previewsArr);
  };

  return (
    <section className="p-5 bg-gray-50">
      <form className="form p-8 py-3">
        <div className="scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4">
          <div className="grid grid-cols-1 mb-3">
            <div className="col w-[25%]">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Category Name
              </h3>
              <input
                type="text"
                onChange={onChangeInput}
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm p-3"
              />
            </div>
          </div>
          <br />
          <h3 className="text-[18px] font-[500] mb-1 text-black">
            Category Image
          </h3>

          <br />
          <div className="grid grid-cols-7 gap-4">
            {previews && Array(previews).isArray && previews?.length > 1 ? (
              previews?.map((image, index) => {
                return (
                  <div className="uploadBoxWrapper relative" key={index}>
                    <span className="absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer">
                      <IoMdClose className="text-white text-[17px]" />
                    </span>
                    <div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex flex-col items-center justify-center relative">
                      <LazyLoadImage
                        className="w-full h-full object-cover"
                        effect="blur"
                        wrapperProps={{ style: { transitionDelay: "1s" } }}
                        alt={"image"}
                        src={image}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="uploadBoxWrapper relative">
                <span className="absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer">
                  <IoMdClose className="text-white text-[17px]" />
                </span>
                <div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex flex-col items-center justify-center relative">
                  <LazyLoadImage
                    className="w-full h-full object-cover"
                    effect="blur"
                    wrapperProps={{ style: { transitionDelay: "1s" } }}
                    alt={"image"}
                    src={image}
                  />
                </div>
              </div>
            )}

            <UploadBox
              multiple={true}
              setPreviewsFun={setPreviewsFun}
              name="images"
              url="/api/category/uploadImages"
            />
          </div>
        </div>
        <br />
        <br />
        <div className="w-[250px]">
          <Button type="submit" className="btn-blue btn-lg w-full flex gap-2">
            <FaCloudUploadAlt className="text-[25px] text-white" />
            Publish and View
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AddCategory;
