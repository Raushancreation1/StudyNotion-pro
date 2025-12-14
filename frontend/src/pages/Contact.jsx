import React from "react"

import Footer from '../components/common/Footer'
 import ReviewSlider from "../components/common/ReviewSlider"
import ContactDetails from "../components/ContactUsPage/ContactDetails"
import ContactForm from "../components/ContactUsPage/ContactForm"

const Contact = () => {
  return (
    <div>
      <div className="mx-auto mt-10 sm:mt-16 lg:mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-6 sm:gap-8 lg:gap-10 text-white lg:flex-row px-4">
        {/* Contact Details */}
        <div className="w-full lg:w-[40%]">
          <ContactDetails />
        </div>

        {/* Contact Form */}
        <div className="w-full lg:w-[60%]">
          <ContactForm />
        </div>
      </div>
      <div className="relative mx-auto my-10 sm:my-16 lg:my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white px-4">
        {/* Reviws from Other Learner */}
        <h1 className="text-center text-2xl sm:text-3xl lg:text-4xl font-semibold mt-6 sm:mt-8">
          Reviews from other learners
        </h1>
        <ReviewSlider />
      </div>
      <Footer />
    </div>
  )
}

export default Contact
