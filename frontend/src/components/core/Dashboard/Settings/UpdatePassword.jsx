import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { changePassword } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../common/IconBtn"

export default function UpdatePassword() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitPasswordForm = async (data) => {
    console.log("password Data - ", data)
    try {
      await changePassword(token, data)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(submitPasswordForm)}>
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-[#E0E0E0] bg-[#FFFFFF] p-8 px-6 sm:px-12">
          <h2 className="text-lg font-semibold text-[#5A5A5A]">Password</h2>

          <div className="flex flex-col gap-5 lg:flex-row">
          {/* Current Password */}
            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="oldPassword" className="text-[#7A7A7A] font-medium mb-1">
                Current Password
              </label>

              <input
                type={showOldPassword ? "text" : "password"}
                name="oldPassword"
                id="oldPassword"
                placeholder="Enter Current Password"
                className="w-full rounded-[0.5rem] bg-[#F5F5F5] border border-[#D1D1D1] p-[12px] text-[#5A5A5A] placeholder-[#9E9E9E] outline-none focus:ring-2 focus:ring-[#8BB8E8] transition"
                {...register("oldPassword", { required: true })}
              />

              <span
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showOldPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>

              {errors.oldPassword && (
                <span className="-mt-1 text-[12px] text-[#FFA5A5]">
                  Please enter your Current Password.
                </span>
              )}
            </div>

            {/* new password */}
            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="newPassword" className="text-[#7A7A7A] font-medium mb-1">
                New Password
              </label>

              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                placeholder="Enter New Password"
                className="w-full rounded-[0.5rem] bg-[#F5F5F5] border border-[#D1D1D1] p-[12px] text-[#5A5A5A] placeholder-[#9E9E9E] outline-none focus:ring-2 focus:ring-[#8BB8E8] transition"
                {...register("newPassword", { required: true })}
              />

              <span
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
              {errors.newPassword && (
                <span className="-mt-1 text-[12px] text-[#FFA5A5]">
                  Please enter your New Password.
                </span>
              )}
            </div>

            {/*confirm new password */}
            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="confirmNewPassword" className="text-[#7A7A7A] font-medium mb-1">
                Confirm New Password
              </label>

              <input
                type={showConfirmNewPassword ? "text" : "password"}
                name="confirmNewPassword"
                id="confirmNewPassword"
                placeholder="Enter Confirm New Password"
                className="w-full rounded-[0.5rem] bg-[#F5F5F5] border border-[#D1D1D1] p-[12px] text-[#5A5A5A] placeholder-[#9E9E9E] outline-none focus:ring-2 focus:ring-[#8BB8E8] transition"
                {...register("confirmNewPassword", { required: true })}
              />

              <span
                onClick={() => setShowConfirmNewPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showConfirmNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
              {errors.confirmNewPassword && (
                <span className="-mt-1 text-[12px] text-[#FFA5A5]">
                  Please enter your Confirm New Password.
                </span>
              )}
            </div>

          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => { navigate("/dashboard/my-profile") }}
            className="cursor-pointer rounded-md bg-[#FFA5A5] hover:bg-[#FF7E7E] py-2 px-5 font-semibold text-white"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Update" customClasses="bg-[#FACC15] hover:bg-[#EAB308] text-[#111827]" />
        </div>

      </form>
    </>
  )
}