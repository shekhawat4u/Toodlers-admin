import React from "react";
import { Button } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { fetchDataFromApi, postData } from "../../utils/api";
import { useContext } from "react";
import { MyContext } from "../../App";

const AddAddress = () => {
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [status, setStatus] = useState(false);
  const context = useContext(MyContext);

  const [formFields, setFormFields] = useState({
    address_line1: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    mobile: "",
    status: "",
    selected: false,
  });

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
    setFormFields((prevState) => ({
      ...prevState,
      status: event.target.value,
    }));
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (formFields.address_line1 === "") {
      context.alertBox("error", "Please enter address line 1");
      return false;
    }
    if (formFields.city === "") {
      context.alertBox("error", "Please enter city");
      return false;
    }
    if (formFields.state === "") {
      context.alertBox("error", "Please enter state");
      return false;
    }
    if (formFields.pincode === "") {
      context.alertBox("error", "Please enter pincode");
      return false;
    }
    if (formFields.country === "") {
      context.alertBox("error", "Please enter country");
      return false;
    }
    if (phone === "") {
      context.alertBox("error", "Please enter your 10 digit mobile number");
      return false;
    }

    postData(`/api/address/add`, formFields, { withCredentials: true }).then(
      (res) => {
        if (res?.error !== true) {
          setIsLoading(false);
          context.alertBox(
            "success",
            res?.data?.message || "User details updated successfully"
          );

          context?.setIsOpenFullScreenPanel({
            open: false,
          });

          fetchDataFromApi(
            `/api/address/get?userId=${context?.userData?._id}`
          ).then((res) => {
            context?.setAddress(res.data);
          });
        } else {
          context.alertBox(
            "error",
            res?.data?.message || "Something went wrong"
          );
          setIsLoading(false);
        }
      }
    );
  };

  return (
    <section className="p-5 bg-gray-50">
      <form className="form p-8 py-3" onSubmit={handleSubmit}>
        <div className="scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4">
          <div className="grid grid-cols-2 mb-3 gap-4">
            <div className="col w-[100%]">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Address Line 1
              </h3>
              <input
                type="text"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm p-3"
                onChange={onChangeInput}
                name="address_line1"
                value={formFields.address_line1}
              />
            </div>
            <div className="col w-[100%]">
              <h3 className="text-[14px] font-[500] mb-1 text-black">City</h3>
              <input
                type="text"
                name="city"
                onChange={onChangeInput}
                value={formFields.city}
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm p-3"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 mb-3 gap-4">
            <div className="col w-[100%]">
              <h3 className="text-[14px] font-[500] mb-1 text-black">State</h3>
              <input
                type="text"
                name="state"
                onChange={onChangeInput}
                value={formFields.state}
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm p-3"
              />
            </div>
            <div className="col w-[100%]">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Pincode
              </h3>
              <input
                type="text"
                name="pincode"
                onChange={onChangeInput}
                value={formFields.pincode}
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm p-3"
              />
            </div>
            <div className="col w-[100%]">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Country
              </h3>
              <input
                type="text"
                name="country"
                onChange={onChangeInput}
                value={formFields.country}
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm p-3"
              />
            </div>
            <div className="col w-[100%]">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Mobile Number
              </h3>
              <PhoneInput
                defaultCountry="in"
                value={phone}
                onChange={(phone) => {
                  setPhone(phone);

                  setFormFields((prevState) => ({
                    ...prevState,
                    mobile: phone,
                  }));
                }}
                disabled={isLoading === true ? true : false}
              />
            </div>

            <div className="col w-[100%]">
              <h3 className="text-[14px] font-[500] mb-1 text-black">Status</h3>
              <Select
                value={status}
                onChange={handleChangeStatus}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                size="small"
                className="w-full"
              >
                <MenuItem value={true}>True</MenuItem>
                <MenuItem value={false}>False</MenuItem>
              </Select>
            </div>
          </div>
          <br />
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

export default AddAddress;
