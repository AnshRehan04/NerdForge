import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { updateProfile } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../common/IconBtn"

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

export default function EditProfile() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { register, handleSubmit, formState: { errors } } = useForm()

  const submitProfileForm = async (data) => {
    // console.log("Form Data - ", data)
    try {
      dispatch(updateProfile(token, data))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(submitProfileForm)}>
        {/* Profile Information */}
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-[#E0E0E0] bg-[#FFFFFF] p-8 px-6 sm:px-12">
          <h2 className="text-lg font-semibold text-[#5A5A5A]">
            Profile Information
          </h2>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="firstName" className="text-[#7A7A7A] font-medium mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter first name"
                className="w-full rounded-[0.5rem] bg-[#F5F5F5] border border-[#D1D1D1] p-[12px] text-[#5A5A5A] placeholder-[#9E9E9E] outline-none focus:ring-2 focus:ring-[#8BB8E8] transition"
                {...register("firstName", { required: true })}
                defaultValue={user?.firstName}
              />
              {errors.firstName && (
                <span className="-mt-1 text-[12px] text-[#FFA5A5]">
                  Please enter your first name.
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="lastName" className="text-[#7A7A7A] font-medium mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter last name"
                className="w-full rounded-[0.5rem] bg-[#F5F5F5] border border-[#D1D1D1] p-[12px] text-[#5A5A5A] placeholder-[#9E9E9E] outline-none focus:ring-2 focus:ring-[#8BB8E8] transition"
                {...register("lastName", { required: true })}
                defaultValue={user?.lastName}
              />
              {errors.lastName && (
                <span className="-mt-1 text-[12px] text-[#FFA5A5]">
                  Please enter your last name.
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="dateOfBirth" className="text-[#7A7A7A] font-medium mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                className="w-full rounded-[0.5rem] bg-[#F5F5F5] border border-[#D1D1D1] p-[12px] text-[#5A5A5A] placeholder-[#9E9E9E] outline-none focus:ring-2 focus:ring-[#8BB8E8] transition"
                {...register("dateOfBirth", {
                  required: {
                    value: true,
                    message: "Please enter your Date of Birth.",
                  },
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future.",
                  },
                })}
                defaultValue={user?.additionalDetails?.dateOfBirth}
              />
              {errors.dateOfBirth && (
                <span className="-mt-1 text-[12px] text-[#FFA5A5]">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="gender" className="text-[#7A7A7A] font-medium mb-1">
                Gender
              </label>
              <select
                type="text"
                name="gender"
                id="gender"
                className="w-full rounded-[0.5rem] bg-[#F5F5F5] border border-[#D1D1D1] p-[12px] text-[#5A5A5A] outline-none focus:ring-2 focus:ring-[#8BB8E8] transition"
                {...register("gender", { required: true })}
                defaultValue={user?.additionalDetails?.gender}
              >
                {genders.map((ele, i) => {
                  return (
                    <option key={i} value={ele} className="text-[#5A5A5A]">
                      {ele}
                    </option>
                  )
                })}
              </select>
              {errors.gender && (
                <span className="-mt-1 text-[12px] text-[#FFA5A5]">
                  Please enter your Date of Birth.
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="contactNumber" className="text-[#7A7A7A] font-medium mb-1">
                Contact Number
              </label>
              <input
                type="tel"
                name="contactNumber"
                id="contactNumber"
                placeholder="Enter Contact Number"
                className="w-full rounded-[0.5rem] bg-[#F5F5F5] border border-[#D1D1D1] p-[12px] text-[#5A5A5A] placeholder-[#9E9E9E] outline-none focus:ring-2 focus:ring-[#8BB8E8] transition"
                {...register("contactNumber", {
                  required: {
                    value: true,
                    message: "Please enter your Contact Number.",
                  },
                  maxLength: { value: 12, message: "Invalid Contact Number" },
                  minLength: { value: 10, message: "Invalid Contact Number" },
                })}
                defaultValue={user?.additionalDetails?.contactNumber}
              />
              {errors.contactNumber && (
                <span className="-mt-1 text-[12px] text-[#FFA5A5]">
                  {errors.contactNumber.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="about" className="text-[#7A7A7A] font-medium mb-1">
                About
              </label>
              <input
                type="text"
                name="about"
                id="about"
                placeholder="Enter Bio Details"
                className="w-full rounded-[0.5rem] bg-[#F5F5F5] border border-[#D1D1D1] p-[12px] text-[#5A5A5A] placeholder-[#9E9E9E] outline-none focus:ring-2 focus:ring-[#8BB8E8] transition"
                {...register("about", { required: true })}
                defaultValue={user?.additionalDetails?.about}
              />
              {errors.about && (
                <span className="-mt-1 text-[12px] text-[#FFA5A5]">
                  Please enter your About.
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
          <IconBtn type="submit" text="Save" customClasses="bg-[#FACC15] hover:bg-[#EAB308] text-[#111827]" />
        </div>

      </form>
    </>
  )
}