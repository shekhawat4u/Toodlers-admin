import React, { useEffect, useRef, useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import {
  MdBrandingWatermark,
  MdFilterVintage,
  MdRateReview,
} from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { BsPatchCheckFill } from "react-icons/bs";
import Rating from "@mui/material/Rating";
import { CircularProgress } from "@mui/material";

const ProductDetails = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [product, setProduct] = useState();
  const zoomSliderBig = useRef();
  const zoomSliderSml = useRef();

  const { id } = useParams();

  const goto = (index) => {
    setSlideIndex(index);
    zoomSliderSml.current.swiper.slideTo(index);
    zoomSliderBig.current.swiper.slideTo(index);
  };

  useEffect(() => {
    fetchDataFromApi(`/api/product/${id}`).then((res) => {
      if (res?.error === false) {
        setTimeout(() => {
          setProduct(res?.product);
        }, 1500);
      }
    });
  }, []);

  return (
    <>
      <div className="flex items-center justify-between px-2 py-0 mt-3">
        <h2 className="text-[18px] font-[600]">Products Details</h2>
      </div>

      <br />

      {product?._id !== "" &&
      product?._id !== undefined &&
      product?._id !== null ? (
        <>
          <div className="productDetails flex gap-8">
            <div className="w-[40%]">
              {product?.images?.length !== 0 && (
                <div className="flex gap-3">
                  <div className="slider w-[15%]">
                    <Swiper
                      ref={zoomSliderSml}
                      direction={"vertical"}
                      slidesPerView={5}
                      spaceBetween={10}
                      navigation={true}
                      modules={[Navigation]}
                      className={`zoomProductSliderThumbs h-[400px] overflow-hidden ${
                        product?.images?.length > 5 && "space"
                      }`}
                    >
                      {product?.images?.map((item, index) => {
                        return (
                          <SwiperSlide key={index}>
                            <div
                              className={`item rounded-md overflow-hidden cursor-pointer group ${
                                slideIndex === index
                                  ? "opacity-100"
                                  : "opacity-30"
                              }`}
                              onClick={() => goto(index)}
                            >
                              <img
                                src={item}
                                alt="Slider"
                                className="w-full transition-all group-hover:!scale-105"
                              />
                            </div>
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  </div>

                  <div className="zoomContainer w-[85%] overflow-hidden rounded-md">
                    <Swiper
                      ref={zoomSliderBig}
                      slidesPerView={1}
                      spaceBetween={0}
                      navigation={false}
                    >
                      {product?.images?.map((item, index) => {
                        return (
                          <SwiperSlide key={index}>
                            <InnerImageZoom
                              zoomType="hover"
                              zoomScale={1}
                              src={item}
                            />
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  </div>
                </div>
              )}
            </div>

            <div className="w-[60%]">
              <h1 className="text-[25px] font-[500] mb-4">{product?.name}</h1>

              <div className="flex items-center py-1">
                <span className="w-[20%] font-[500] flex items-center gap-2 text-[14px]">
                  <MdBrandingWatermark className="opacity-65" />
                  Brand :{" "}
                </span>
                <span className="text-[14px]">{product?.brand}</span>
              </div>
              <div className="flex items-center py-1">
                <span className="w-[20%] font-[500] flex items-center gap-2 text-[14px]">
                  <BiSolidCategoryAlt className="opacity-65" />
                  Category :{" "}
                </span>
                <span className="text-[14px]">{product?.catName}</span>
              </div>
              {product?.productWeight?.size !== 0 && (
                <div className="flex items-center py-1">
                  <span className="w-[20%] font-[500] flex items-center gap-2 text-[14px]">
                    <MdFilterVintage className="opacity-65" />
                    Weight :{" "}
                  </span>
                  <div className="flex items-center gap-2">
                    {product?.productWeight?.map((weight, index) => (
                      <span
                        key={index}
                        className="text-[12px] inline-block p-1 bg-[#fff] shadow-sm rounded-md font-[500]"
                      >
                        {weight}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex items-center py-1">
                <span className="w-[20%] font-[500] flex items-center gap-2 text-[14px]">
                  <MdRateReview className="opacity-65" />
                  Reviews :{" "}
                </span>
                <span className="text-[14px]">
                  ({product?.reviews?.length > 0 ? product?.reviews?.length : 0}
                  ) reviews
                </span>
              </div>
              <div className="flex items-center py-1">
                <span className="w-[20%] font-[500] flex items-center gap-2 text-[14px]">
                  <BsPatchCheckFill className="opacity-65" />
                  Published :{" "}
                </span>
                <span className="text-[14px]">
                  {product?.createdAt?.split("T")[0]}
                </span>
              </div>

              <br />

              <h2 className="text-[20px] font-[500] mb-3">
                Product Description
              </h2>
              {product?.description && (
                <p className="text-[14px]">{product?.description}</p>
              )}
            </div>
          </div>

          <br />
          <h2 className="text-[18px] font-[500]">Customer Reviews</h2>

          <div className="reviewsWrap mt-3">
            <div className="reviews w-full h-auto mb-3 p-4 bg-white shadow-md rounded-sm flex items-center justify-between">
              <div className="flex items-center gap-8">
                <div className="img w-[85px] h-[85px] rounded-full overflow-hidden">
                  <img
                    src="https://media.licdn.com/dms/image/v2/D4D03AQFWM-GfONxvSA/profile-displayphoto-shrink_200_200/B4DZbDsicQHEAY-/0/1747039958333?e=1753315200&v=beta&t=Muxt5CRuD6jq-gQyYkWT0ZfNPdbWilJCzUzFRylB0N4"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="info w-[80%]">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[16px] font-[500]">
                      Harshvardhan Singh Shekhawat
                    </h4>
                    <Rating name="read-only" value={4} readOnly size="small" />
                  </div>
                  <span className="text-[13px]">2025-07-10</span>
                  <p className="text-[13px] mt-2">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Modi, perferendis vitae? Libero consequuntur quidem quasi,
                    doloremque dolorem ea porro similique!
                  </p>
                </div>
              </div>
            </div>
            <div className="reviews w-full h-auto mb-3 p-4 bg-white shadow-md rounded-sm flex items-center justify-between">
              <div className="flex items-center gap-8">
                <div className="img w-[85px] h-[85px] rounded-full overflow-hidden">
                  <img
                    src="https://media.licdn.com/dms/image/v2/D4D03AQFWM-GfONxvSA/profile-displayphoto-shrink_200_200/B4DZbDsicQHEAY-/0/1747039958333?e=1753315200&v=beta&t=Muxt5CRuD6jq-gQyYkWT0ZfNPdbWilJCzUzFRylB0N4"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="info w-[80%]">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[16px] font-[500]">
                      Harshvardhan Singh Shekhawat
                    </h4>
                    <Rating name="read-only" value={4} readOnly size="small" />
                  </div>
                  <span className="text-[13px]">2025-07-10</span>
                  <p className="text-[13px] mt-2">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Modi, perferendis vitae? Libero consequuntur quidem quasi,
                    doloremque dolorem ea porro similique!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-96">
          <CircularProgress color="inherit" />
        </div>
      )}
    </>
  );
};

export default ProductDetails;
