import React, { useEffect, useState } from "react"
import ReactStars from "react-rating-stars-component"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "../../App.css"
// Icons
import { FaStar } from "react-icons/fa"
// Import required modules
import { FreeMode } from 'swiper/modules';
import { Pagination } from 'swiper/modules';
import { Autoplay } from 'swiper/modules';

// Get apiFunction and the endpoint
import { apiConnector } from "../../services/apiConnector"
import { ratingsEndpoints } from "../../services/apis"

const ReviewSlider = () => {

    const [reviews, setReviews] = useState([])
    const truncateWords = 15

    useEffect(() => {
        const fetchAllReviews = async () => {
            try {
                const { data } = await apiConnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API)
                console.log("printing :", data)
                if (data?.success) {
                    setReviews(data?.data || [])
                } else {
                    setReviews([])
                }
            } catch (error) {
                console.error("Failed to fetch reviews:", error)
                setReviews([])
            }
        }
        fetchAllReviews();
    }, []);

    return (
        
            <div className="my-[50px] min-h-[184px] max-w-maxContentTab lg:max-w-maxContent">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={25}
                    loop={reviews.length > 1}
                    freeMode={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    autoHeight={true}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        1280: { slidesPerView: 4 },
                    }}
                    modules={[FreeMode, Pagination, Autoplay]}
                    className="w-full "
                >

                    {
                        reviews.map((review, indexe) => (
                            <SwiperSlide key={indexe}>
                                <div className="text-white flex gap-2">
                                    <img
                                        src={
                                            review?.user?.image
                                                ? review?.user?.image
                                                : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                                        }
                                        alt='Profile Pic'
                                        className="h-9 w-9 rounded-full object-cover"
                                    />
                                    <div className="flex flex-col">
                                        <p className="font-semibold text-richblack-5">{review?.user?.firstName} {review?.user?.lastName}</p>
                                        <p className="text-[12px] font-medium text-richblack-500">{review?.course?.courseName}</p>
                                    </div>
                                </div>

                                <p className="font-medium text-richblack-25">
                                    {review?.review.split(" ").length > truncateWords
                                        ? `${review?.review
                                            .split(" ")
                                            .slice(0, truncateWords)
                                            .join(" ")} ...`
                                        : `${review?.review}`}
                                </p>

                                <div className="flex gap-2 items-center">
                                    <p className="font-semibold text-yellow-100">{review?.rating}</p>

                                    <ReactStars
                                        count={5}
                                        value={review.rating}
                                        size={20}
                                        edit={false}
                                        activeColor="#ffd700"
                                        emptyIcon={<FaStar />}
                                        fullIcon={<FaStar />}
                                    />
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
       
    )
}

export default ReviewSlider