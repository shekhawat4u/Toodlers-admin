import React, { useState } from "react";
import { Button } from "@mui/material";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import Badge from "../../components/Badge";
import SearchBox from "../../Components/SearchBox/Index";

const Orders = () => {
  const [isOpenOrderProduct, setIsOpenOrderProduct] = useState(null);

  const isShowOrderProduct = (index) => {
    if (isOpenOrderProduct === index) {
      setIsOpenOrderProduct(null);
    } else {
      setIsOpenOrderProduct(index);
    }
  };
  return (
    <div className="card my-4 shadow-md sm:rounded-lg bg-white">
      <div className="flex items-center justify-between px-5 py-5">
        <h2 className="text-[18px] font-[600]">Recent Orders</h2>
        <div className="w-[40%]">
          <SearchBox />
        </div>
      </div>
      <div className="relative overflow-x-auto mt-5 pb-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                &nbsp;
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Order Id
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Payment Id
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Name
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Address
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Pincode
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Total Amount
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Email
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                User Id
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Order Status
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b">
              <td className="px-6 py-4">
                <Button
                  className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]"
                  onClick={() => isShowOrderProduct(0)}
                >
                  {isOpenOrderProduct === 0 ? (
                    <FaAngleUp className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                  ) : (
                    <FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                  )}
                </Button>
              </td>
              <td className="px-6 py-4">
                <span className="text-[#3872fa] font-[600]">2378462874254</span>
              </td>
              <td className="px-6 py-4">
                <span className="text-[#3872fa] font-[600]">
                  pay_PYR35467842
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">Harshvardhan</td>
              <td className="px-6 py-4">9799246628</td>
              <td className="px-6 py-4">
                <span className="block w-[300px]">
                  Birla Institue of Technology Pilani, Pilani, Rajasthan
                </span>
              </td>
              <td className="px-6 py-4">333031</td>
              <td className="px-6 py-4">₹ 2999.00</td>
              <td className="px-6 py-4">contact@toodlers.in</td>
              <td className="px-6 py-4">
                <span className="text-[#3872fa] font-[600]">
                  4235fd5462387ohfi
                </span>
              </td>
              <td className="px-6 py-4">
                <Badge status="pending" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">2025-06-03</td>
            </tr>
            {isOpenOrderProduct === 0 && (
              <tr>
                <td className="pl-20" colSpan="6">
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 whitespace-nowrap"
                          >
                            Product Id
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 whitespace-nowrap"
                          >
                            Product Title
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 whitespace-nowrap"
                          >
                            Image
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 whitespace-nowrap"
                          >
                            Quantity
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 whitespace-nowrap"
                          >
                            Price
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 whitespace-nowrap"
                          >
                            Sub Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white border-b">
                          <td className="px-6 py-4">
                            {" "}
                            <span className="text-gray-600">2378462874254</span>
                          </td>
                          <td className="px-6 py-4">
                            A-Line kurti With Sharana & Dupatta
                          </td>
                          <td className="px-6 py-4">
                            <img
                              src="https://api.spicezgold.com/download/file_1734529362999_gosriki-women-s-pink-ethnic-motifs-printed-kurta-with-trouser-dupatta-product-images-rvpkyh5qdr-0-202310141511.webp"
                              className="w-[40px] h-[40px] rounded-md object-cover"
                            />
                          </td>
                          <td className="px-6 py-4">2</td>
                          <td className="px-6 py-4">₹ 2999.00</td>
                          <td className="px-6 py-4">₹ 2999.00</td>
                        </tr>
                        <tr className="bg-white border-b">
                          <td className="px-6 py-4">
                            {" "}
                            <span className="text-gray-600">2378462874254</span>
                          </td>
                          <td className="px-6 py-4">
                            A-Line kurti With Sharana & Dupatta
                          </td>
                          <td className="px-6 py-4">
                            <img
                              src="https://api.spicezgold.com/download/file_1734529362999_gosriki-women-s-pink-ethnic-motifs-printed-kurta-with-trouser-dupatta-product-images-rvpkyh5qdr-0-202310141511.webp"
                              className="w-[40px] h-[40px] rounded-md object-cover"
                            />
                          </td>
                          <td className="px-6 py-4">2</td>
                          <td className="px-6 py-4">₹ 2999.00</td>
                          <td className="px-6 py-4">₹ 2999.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            )}

            <tr className="bg-white border-b">
              <td className="px-6 py-4">
                <Button
                  className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]"
                  onClick={() => isShowOrderProduct(1)}
                >
                  {isOpenOrderProduct === 1 ? (
                    <FaAngleUp className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                  ) : (
                    <FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                  )}
                </Button>
              </td>
              <td className="px-6 py-4">
                <span className="text-[#3872fa] font-[600]">2378462874254</span>
              </td>
              <td className="px-6 py-4">
                <span className="text-[#3872fa] font-[600]">
                  pay_PYR35467842
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">Harshvardhan</td>
              <td className="px-6 py-4">9799246628</td>
              <td className="px-6 py-4">
                <span className="block w-[300px]">
                  Birla Institue of Technology Pilani, Pilani, Rajasthan
                </span>
              </td>
              <td className="px-6 py-4">333031</td>
              <td className="px-6 py-4">₹ 2999.00</td>
              <td className="px-6 py-4">contact@toodlers.in</td>
              <td className="px-6 py-4">
                <span className="text-[#3872fa] font-[600]">
                  4235fd5462387ohfi
                </span>
              </td>
              <td className="px-6 py-4">
                <Badge status="pending" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">2025-06-03</td>
            </tr>
            {isOpenOrderProduct === 1 && (
              <tr>
                <td className="pl-20" colSpan="6">
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 whitespace-nowrap"
                          >
                            Product Id
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 whitespace-nowrap"
                          >
                            Product Title
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 whitespace-nowrap"
                          >
                            Image
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 whitespace-nowrap"
                          >
                            Quantity
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 whitespace-nowrap"
                          >
                            Price
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 whitespace-nowrap"
                          >
                            Sub Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white border-b">
                          <td className="px-6 py-4">
                            {" "}
                            <span className="text-gray-600">2378462874254</span>
                          </td>
                          <td className="px-6 py-4">
                            A-Line kurti With Sharana & Dupatta
                          </td>
                          <td className="px-6 py-4">
                            <img
                              src="https://api.spicezgold.com/download/file_1734529362999_gosriki-women-s-pink-ethnic-motifs-printed-kurta-with-trouser-dupatta-product-images-rvpkyh5qdr-0-202310141511.webp"
                              className="w-[40px] h-[40px] rounded-md object-cover"
                            />
                          </td>
                          <td className="px-6 py-4">2</td>
                          <td className="px-6 py-4">₹ 2999.00</td>
                          <td className="px-6 py-4">₹ 2999.00</td>
                        </tr>
                        <tr className="bg-white border-b">
                          <td className="px-6 py-4">
                            {" "}
                            <span className="text-gray-600">2378462874254</span>
                          </td>
                          <td className="px-6 py-4">
                            A-Line kurti With Sharana & Dupatta
                          </td>
                          <td className="px-6 py-4">
                            <img
                              src="https://api.spicezgold.com/download/file_1734529362999_gosriki-women-s-pink-ethnic-motifs-printed-kurta-with-trouser-dupatta-product-images-rvpkyh5qdr-0-202310141511.webp"
                              className="w-[40px] h-[40px] rounded-md object-cover"
                            />
                          </td>
                          <td className="px-6 py-4">2</td>
                          <td className="px-6 py-4">₹ 2999.00</td>
                          <td className="px-6 py-4">₹ 2999.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
