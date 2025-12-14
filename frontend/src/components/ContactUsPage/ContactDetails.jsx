import React from "react"
import * as Icon1 from "react-icons/bi"
import * as Icon3 from "react-icons/hi2"
import * as Icon2 from "react-icons/io5"

const contactDetails = [
  {
    icon: "HiChatBubbleLeftRight",
    heading: "Chat on us",
    description: "Our friendly team is here to help.",
    details: "info@rccodingallinone.com",
  },
  {
    icon: "BiWorld",
    heading: "Visit us",
    description: "Come and say hello at our office HQ.",
    details:
      "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
  },
  {
    icon: "IoCall",
    heading: "Call us",
    description: "Mon - Fri From 8am to 5pm",
    details: "+123 456 7869",
  },
]

const ContactDetails = () => {
  return (
    <div className="flex flex-col gap-4 sm:gap-6 rounded-xl bg-richblack-800 p-4 sm:p-5 lg:p-6">
      {contactDetails.map((ele, i) => {
        let Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon]
        return (
          <div
            className="flex flex-col gap-[2px] p-2 sm:p-3 text-xs sm:text-sm text-richblack-200"
            key={i}
          >
            <div className="flex flex-row items-center gap-2 sm:gap-3">
              <Icon size={20} className="sm:w-[25px] sm:h-[25px]" />
              <h1 className="text-base sm:text-lg font-semibold text-richblack-5">
                {ele?.heading}
              </h1>
            </div>
            <p className="font-medium text-xs sm:text-sm">{ele?.description}</p>
            <p className="font-semibold text-xs sm:text-sm break-words">{ele?.details}</p>
          </div>
        )
      })}
    </div>
  )
}

export default ContactDetails
