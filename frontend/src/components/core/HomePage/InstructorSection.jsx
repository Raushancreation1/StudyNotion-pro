import React from 'react'
import CTAButton from "../../../components/core/HomePage/Button";
import { FaArrowRight } from "react-icons/fa";
import Instructor from "../../../assets/Images/Instructor.png";
import HighlightText from './HighlightText';

const InstructorSection = () => {
  return (
    <div className="px-4">
        <div className="flex flex-col lg:flex-row gap-10 sm:gap-20 items-center">
          <div className="w-full lg:w-[50%]">
            <img
              src={Instructor}
              alt=""
              className="w-full h-auto shadow-white shadow-[-10px_-10px_0_0] sm:shadow-[-20px_-20px_0_0]"
            />
          </div>
          <div className="w-full lg:w-[50%] flex gap-6 sm:gap-10 flex-col">
            <h1 className="w-full lg:w-[50%] text-2xl sm:text-3xl lg:text-4xl font-semibold">
              Become an
              <HighlightText text={"instructor"} />
            </h1>

            <p className="font-medium text-sm sm:text-base lg:text-[16px] text-justify w-full lg:w-[90%] text-richblack-300">
              Instructors from around the world teach millions of students on
               Rc coding all in one. We provide the tools and skills to teach what you
              love.
            </p>

            <div className="w-fit">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-3">
                  Start Teaching Today
                  <FaArrowRight />
                </div>
              </CTAButton>
            </div>
          </div>
        </div>
    </div>
  )
}

export default InstructorSection