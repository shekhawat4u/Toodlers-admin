import { Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { MyContext } from "../../App";
import { FaAngleDown } from "react-icons/fa6";
import EditSubCatBox from "./editSubCatBox";

const SubCategoryList = () => {
  const [isOpen, setIsOpen] = useState(0);
  const context = useContext(MyContext);

  const expend = (index) => {
    if (isOpen === index) {
      setIsOpen(!isOpen);
    } else {
      setIsOpen(index);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-2 py-0 mt-3">
        <h2 className="text-[18px] font-[600]">Sub Category List</h2>

        <div className="col w-[35%] ml-auto flex justify-end items-center gap-3">
          <Button
            className="btn-blue btn-sm"
            onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "Add New Sub Category",
              })
            }
          >
            Add New Sub Category
          </Button>
        </div>
      </div>

      <div className="card my-4 pt-5 pb-5 px-5 shadow-md sm:rounded-lg bg-white">
        {context?.catData?.length !== 0 && (
          <ul className="w-full">
            {context?.catData?.map((firstLevelCat, index) => {
              return (
                <li className="w-full mb-1" key={index}>
                  <div className="flex items-center w-full p-2 bg-[#f1f1f1] rounded-sm px-4">
                    <span className="font-[500] flex items-center gap-4 text-[14px]">
                      {firstLevelCat?.name}
                    </span>
                    <Button
                      className="!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black !ml-auto"
                      onClick={() => expend(index)}
                    >
                      <FaAngleDown />
                    </Button>
                  </div>
                  {isOpen === index && (
                    <>
                      {firstLevelCat?.children?.length !== 0 && (
                        <ul className="w-full pl-6 border-l-2 border-blue-200 ml-2">
                          {firstLevelCat?.children?.map((subCat, index_) => {
                            return (
                              <li className="w-full py-1 pl-3 bg-blue-50 mb-1 rounded-md" key={index_}>
                                <EditSubCatBox
                                  name={subCat?.name}
                                  catData={context?.catData}
                                  id={subCat?._id}
                                  index={index_}
                                  selectedCat={subCat?.parentId}
                                  selectedCatName={subCat?.parentCatName}
                                />

                                {subCat?.children?.length !== 0 && (
                                  <ul className="pl-8 border-l-2 border-gray-300 ml-4 mt-2">
                                    {subCat?.children?.map(
                                      (thirdLevel, index__) => {
                                        return (
                                          <li
                                            key={index__}
                                            className="w-full hover:bg-[#f9f9f9] pl-4 py-2 bg-gray-50 mb-1 rounded-md border-l-4 border-orange-300"
                                          >
                                            <EditSubCatBox
                                              name={thirdLevel?.name}
                                              catData={firstLevelCat?.children}
                                              index={index__}
                                              selectedCat={thirdLevel?.parentId}
                                              selectedCatName={
                                                thirdLevel?.parentCatName
                                              }
                                              id={thirdLevel?._id}
                                            />
                                          </li>
                                        );
                                      }
                                    )}
                                  </ul>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
};
export default SubCategoryList;
