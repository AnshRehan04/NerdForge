import React from "react"
import { HiChatBubbleLeftRight } from "react-icons/hi2"
import { BiWorld } from "react-icons/bi"
import { IoCall } from "react-icons/io5"
import { MdEmail } from "react-icons/md"

const contactDetails = [
  {
    icon: HiChatBubbleLeftRight,
    heading: "Chat on us",
    description: "Our friendly team is here to help.",
    details: "info@NerdForge.com",
  },
  {
    icon: BiWorld,
    heading: "Visit us",
    description: "Come and say hello at our office HQ.",
    details:
      "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
  },
  {
    icon: IoCall,
    heading: "Call us",
    description: "Mon - Fri From 8am to 5pm",
    details: "+123 456 7869",
  },
  {
    icon: MdEmail,
    heading: "Email Us",
    description: "Send us an email anytime",
    details: "info@NerdForge.com",
  },
]

const ContactDetails = () => {
  return (
    <div className="flex flex-col gap-6 rounded-xl bg-[#FFFFFF] border border-[#CED4DA] shadow-[0_2px_8px_0_rgba(0,0,0,0.05)] p-4 lg:p-6">
      {contactDetails.map((ele, i) => {
        const Icon = ele.icon
        return (
          <div
            className="flex flex-col gap-[2px] p-3 text-sm"
            key={i}
          >
            <div className="flex flex-row items-center gap-3 mb-1">
              <Icon size={25} className="text-[#FFD43B]" />
              <h1 className="text-lg font-semibold text-[#212529]">
                {ele.heading}
              </h1>
            </div>

            <p className="font-medium text-[#495057]">{ele.description}</p>
            <p className="font-semibold text-[#212529]">{ele.details}</p>
          </div>
        )
      })}
    </div>
  )
}

export default ContactDetails