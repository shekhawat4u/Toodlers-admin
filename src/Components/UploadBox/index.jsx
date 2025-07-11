import React, { useState } from "react";
import { FaRegImages } from "react-icons/fa";
import { uploadImage } from "../../utils/api";
import { useContext } from "react";
import { MyContext } from "../../App";

const UploadBox = (props) => {
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);

  const context = useContext(MyContext);

  let selectedImages = [];

  const formdata = new FormData();

  const onChangeFile = async (e, apiEndPoint) => {
    try {
      setPreviews([]);
      const files = e.target.files;
      setUploading(true);

      for (var i = 0; i < files.length; i++) {
        if (
          files[i] &&
          (files[i].type === "image/jpeg" ||
            files[i].type === "image/png" ||
            files[i].type === "image/jpg" ||
            files[i].type === "image/webp")
        ) {
          const file = files[i];

          selectedImages.push(file);
          formdata.append(props?.name, file);
        } else {
          context.alertBox(
            "error",
            "Please select a valid image file (jpg, jpeg, png, webp)"
          );
          setUploading(false);
          return false;
        }
      }

      uploadImage(apiEndPoint, formdata).then((res) => {
        setUploading(false);
        props.setPreviewsFun(res?.data?.images);
      });
    } catch (error) {
      console.log("Error uploading file:", error);
    }
  };

  return (
    <div className="uploadBox p-3 rounded-md oveflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex flex-col items-center justify-center relative">
      <FaRegImages className="text-[40px] opacity-35 pointer-events-none" />
      <h4 className="text-[14px] pointer-events-none">Image Upload</h4>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => onChangeFile(e, props?.url)}
        multiple={props.multiple !== undefined ? props.multiple : false}
        className="absolute top-0 left-0 w-full h-full z-50 opacity-0"
        name="images"
      />
    </div>
  );
};

export default UploadBox;
