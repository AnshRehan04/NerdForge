import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import CountryCode from '../../../../data/countrycode.json'
// import { apiConnector } from "../../../services/apiConnector"
// import { contactusEndpoint } from "../../../services/apis"


const ContactUsForm = () => {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm()

  const submitContactForm = async (data) => {
    // console.log("Form Data - ", data)
    try {
      setLoading(true)
      // const res = await apiConnector(
      //   "POST",
      //   contactusEndpoint.CONTACT_US_API,
      //   data
      // )
      // console.log("Email Res - ", res)
      setLoading(false)
    } catch (error) {
      console.log("ERROR WHILE CONATACT US  - ", error.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      })
    }
  }, [reset, isSubmitSuccessful])

  return (
    <form
      className="flex flex-col gap-7"
      onSubmit={handleSubmit(submitContactForm)}
    >
      <div className="flex flex-col gap-5 lg:flex-row">``
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="firstname" className="text-[#495057] font-medium mb-1">
            First Name
          </label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="Enter first name"
            className="w-full rounded-md bg-[#FFFFFF] border border-[#CED4DA] p-[12px] text-[#212529] placeholder-[#CED4DA] outline-none focus:ring-2 focus:ring-[#FFD43B] transition"
            {...register("firstname", { required: true })}
          />
          {errors.firstname && (
            <span className="-mt-1 text-[12px] text-[#FFD43B]">
              Please enter your name.
            </span>
          )}
        </div>
        
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="lastname" className="text-[#495057] font-medium mb-1">
            Last Name
          </label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Enter last name"
            className="w-full rounded-md bg-[#FFFFFF] border border-[#CED4DA] p-[12px] text-[#212529] placeholder-[#CED4DA] outline-none focus:ring-2 focus:ring-[#FFD43B] transition"
            {...register("lastname")}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-[#495057] font-medium mb-1">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter email address"
          className="w-full rounded-md bg-[#FFFFFF] border border-[#CED4DA] p-[12px] text-[#212529] placeholder-[#CED4DA] outline-none focus:ring-2 focus:ring-[#FFD43B] transition"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="-mt-1 text-[12px] text-[#FFD43B]">
            Please enter your Email address.
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="phonenumber" className="text-[#495057] font-medium mb-1">
          Phone Number
        </label>

        <div className="flex gap-5">
          <div className="flex w-[81px] flex-col gap-2">
            <select
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Enter first name"
              className="w-full rounded-md bg-[#FFFFFF] border border-[#CED4DA] p-[12px] text-[#212529] placeholder-[#CED4DA] outline-none focus:ring-2 focus:ring-[#FFD43B] transition"
              {...register("countrycode", { required: true })}
            >
              {CountryCode.map((ele, i) => {
                return (
                  <option key={i} value={ele.code} className="text-[#212529]">
                    {ele.code} -{ele.country}
                  </option>
                )
              })}
            </select>
          </div>

          <div className="flex w-[calc(100%-90px)] flex-col gap-2">
            <input
              type="number"
              name="phonenumber"
              id="phonenumber"
              placeholder="12345 67890"
              className="w-full rounded-md bg-[#FFFFFF] border border-[#CED4DA] p-[12px] text-[#212529] placeholder-[#CED4DA] outline-none focus:ring-2 focus:ring-[#FFD43B] transition"
              {...register("phoneNo", {
                required: {
                  value: true,
                  message: "Please enter your Phone Number.",
                },
                maxLength: { value: 12, message: "Invalid Phone Number" },
                minLength: { value: 10, message: "Invalid Phone Number" },
              })}
            />
          </div>
        </div>
        {errors.phoneNo && (
          <span className="-mt-1 text-[12px] text-[#FFD43B]">
            {errors.phoneNo.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-[#495057] font-medium mb-1">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          cols="30"
          rows="7"
          placeholder="Enter your message here"
          className="w-full rounded-md bg-[#FFFFFF] border border-[#CED4DA] p-[12px] text-[#212529] placeholder-[#CED4DA] outline-none focus:ring-2 focus:ring-[#FFD43B] transition"
          {...register("message", { required: true })}
        />
        {errors.message && (
          <span className="-mt-1 text-[12px] text-[#FFD43B]">
            Please enter your Message.
          </span>
        )}
      </div>

      <button
        disabled={loading}
        type="submit"
        className={`rounded-md bg-[#FFD43B] px-6 py-3 text-center text-[13px] font-bold text-[#212529] shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         ${!loading &&
          "transition-all duration-200 hover:scale-95 hover:bg-[#74C0FC] hover:text-white hover:shadow-none"
          }  disabled:bg-[#CED4DA] sm:text-[16px] `}
      >
        Send Message
      </button>
    </form>
  )
}

export default ContactUsForm