import { useEffect } from "react"
import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { formattedDate } from "../../../utils/dateFormatter"
import IconBtn from "../../common/IconBtn"
import Img from './../../common/Img';

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate();

  // Scroll to the top of the page when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-8 px-2">
      <h1 className="mb-14 text-4xl font-medium text-[#111827] font-boogaloo text-center sm:text-left"> My Profile</h1>

      <div className="flex items-center justify-between rounded-2xl border border-[#E5E7EB] bg-[#FFFFFF] p-8 px-3 sm:px-12 shadow">
        <div className="flex items-center gap-x-4">
          <div className="aspect-square w-[78px] rounded-full flex items-center justify-center bg-[#F87171] text-white text-3xl font-bold">
            {user?.image ? (
              <Img
                src={user?.image}
                alt={`profile-${user?.firstName}`}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span>{user?.firstName?.[0]}{user?.lastName?.[0]}</span>
            )}
          </div>
          <div className="space-y-1">
            <p className="text-lg font-semibold text-[#111827] capitalize">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm text-[#6B7280]">{user?.email}</p>
          </div>
        </div>

        <IconBtn
          text="Edit"
          onclick={() => {
            navigate("/dashboard/settings")
          }}
          customClasses="bg-[#FACC15] hover:bg-[#EAB308] text-[#111827]"
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>

      <div className="my-10 flex flex-col gap-y-10 rounded-2xl border border-[#E5E7EB] bg-[#FFFFFF] p-8 px-7 sm:px-12 shadow">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-[#111827]">About</p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
            customClasses="bg-[#FACC15] hover:bg-[#EAB308] text-[#111827]"
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>

        <p
          className={`${user?.additionalDetails?.about
            ? "text-[#111827]"
            : "text-[#6B7280]"
            } text-sm font-medium`}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>

      <div className="my-10 flex flex-col gap-y-10 rounded-2xl border border-[#E5E7EB] bg-[#FFFFFF] p-8 px-7 sm:px-12 shadow">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-[#111827]">
            Personal Details
          </p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
            customClasses="bg-[#FACC15] hover:bg-[#EAB308] text-[#111827]"
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>

        <div className="flex max-w-[500px] justify-between ">
          <div className="flex flex-col gap-y-5">

            <div>
              <p className="mb-2 text-sm text-[#6B7280]">First Name</p>
              <p className="text-sm font-semibold text-[#111827] capitalize">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-[#6B7280]">Account Type</p>
              <p className="text-sm font-semibold text-[#111827] capitalize">
                {user?.accountType}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-[#6B7280]">Email</p>
              <p className="text-sm font-semibold text-[#111827]">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-[#6B7280]">Gender</p>
              <p className="text-sm font-semibold text-[#111827]">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-[#6B7280]">Last Name</p>
              <p className="text-sm font-semibold text-[#111827] capitalize">
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-[#6B7280]">Phone Number</p>
              <p className="text-sm font-semibold text-[#111827]">
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-[#6B7280]">Date Of Birth</p>
              <p className="text-sm font-semibold text-[#111827]">
                {formattedDate(user?.additionalDetails?.dateOfBirth) ?? "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}