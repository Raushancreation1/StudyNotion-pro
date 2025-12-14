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
            if (data?.success) {
                    setReviews(data?.data)
                }
            } catch (error) {
                // Avoid unhandled promise rejection crashing the UI
                console.error("Failed to fetch reviews", error)
                setReviews([])
            }
        }
        fetchAllReviews()
    }, [])

    return (
        
            <div className="my-[50px] h-auto min-h-[184px] max-w-maxContentTab lg:max-w-maxContent px-4">
                <Swiper
                    slidesPerView={1}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 15,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 25,
                        },
                        1280: {
                            slidesPerView: 4,
                            spaceBetween: 25,
                        },
                    }}
                    spaceBetween={10}
                    loop={reviews.length > 4}
                    freeMode={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    modules={[FreeMode, Pagination, Autoplay]}
                    className="w-full"
                >

                    {
                        reviews.map((review, indexe) => {
                            const first = (review?.user?.firstName || "").trim()
                            const last = (review?.user?.lastName || "").trim()
                            const displayName = `${first} ${last}`.trim() || "Anonymous"
                            const rawImage = (review?.user?.image || "").trim()
                            const isValidImage = rawImage && !rawImage.includes("${") && !rawImage.toLowerCase().includes("undefined")
                            const avatarSrc = isValidImage
                                ? rawImage
                                : `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(displayName)}`
                            const courseName = (review?.course?.courseName || "").trim()
                            const reviewText = review?.review || ""
                            const words = reviewText.split(" ")
                            const truncated = words.length > truncateWords
                                ? `${words.slice(0, truncateWords).join(" ")} ...`
                                : reviewText

                            return (
                                <SwiperSlide key={indexe}>
                                    <div className="text-white flex gap-2">
                                        <img
                                            src={avatarSrc}
                                            alt={`Profile of ${displayName}`}
                                            className="h-9 w-9 rounded-full object-cover"
                                        />
                                        <div className="flex flex-col">
                                            <p className="font-semibold text-richblack-5">{displayName}</p>
                                            {courseName && (
                                                <p className="text-[12px] font-medium text-richblack-500">{courseName}</p>
                                            )}
                                        </div>
                                    </div>

                                    <p className="font-medium text-richblack-25">{truncated}</p>

                                    <div className="flex gap-2 items-center">
                                        <p className="font-semibold text-yellow-100">{review?.rating}</p>

                                        <ReactStars
                                            count={5}
                                            value={Number(review?.rating) || 0}
                                            size={20}
                                            edit={false}
                                            activeColor="#ffd700"
                                            emptyIcon={<FaStar />}
                                            fullIcon={<FaStar />}
                                        />
                                    </div>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </div>
       
    )
}

export default ReviewSlider