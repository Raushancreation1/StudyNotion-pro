import React from "react"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
// import "../../.."
// Import required modules
import { FreeMode, Pagination, Navigation, Autoplay } from "swiper/modules"

import Course_Card from "./Course_Card";

const CourseSlider = ({ Courses }) => {
    // Determine if loop should be enabled based on maximum slidesPerView (desktop = 3)
    const maxSlidesPerView = 3
    const loopEnabled = Array.isArray(Courses) && Courses.length > maxSlidesPerView
    
    return (
        <>
            {Courses?.length ? (
                <Swiper
                    slidesPerView={1}
                    spaceBetween={25}
                    loop={loopEnabled}
                    pagination={{ clickable: true }}
                    modules={[Autoplay, FreeMode, Pagination, Navigation]}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    navigation={true}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    watchOverflow={true}
                    className="max-h-[30rem]"
                >
                    {Courses?.map((course, i) => (
                        <SwiperSlide key={i}>
                            <Course_Card course={course} Height={"h-[250px]"} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <p className="text-xl text-richblack-5">No Course Found</p>
            )}
        </>
    )
}

export default CourseSlider

