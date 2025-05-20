import { useEffect, useState } from "react"
import ProgressBar from "@ramonak/react-progress-bar"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"
import Img from './../../common/Img';



export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [enrolledCourses, setEnrolledCourses] = useState(null)

  // fetch all users enrolled courses
  const getEnrolledCourses = async () => {
    try {
      const res = await getUserEnrolledCourses(token);
      setEnrolledCourses(res);
    } catch (error) {
      console.log("Could not fetch enrolled courses.")
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, [])

  // Loading Skeleton
  const sklItem = () => {
    return (
      <div className="flex border border-richblack-700 px-5 py-3 w-full">
        <div className="flex flex-1 gap-x-4 ">
          <div className='h-14 w-14 rounded-lg skeleton '></div>

          <div className="flex flex-col w-[40%] ">
            <p className="h-2 w-[50%] rounded-xl  skeleton"></p>
            <p className="h-2 w-[70%] rounded-xl mt-3 skeleton"></p>
          </div>
        </div>

        <div className="flex flex-[0.4] flex-col ">
          <p className="h-2 w-[20%] rounded-xl skeleton mt-2"></p>
          <p className="h-2 w-[40%] rounded-xl skeleton mt-3"></p>
        </div>
      </div>
    )
  }

  // return if data is null
  if (enrolledCourses?.length == 0) {
    return (
      <p className="grid h-[50vh] w-full place-content-center text-center text-[#333333] text-3xl bg-[#FAF9FF]">
        You have not enrolled in any course yet.
      </p>)
  }



  return (
    <div className="min-h-screen bg-[#FAF9FF] py-8">
      <div className="text-4xl text-[#333333] font-boogaloo text-center sm:text-left mb-8">Enrolled Courses</div>
      <div className="my-8 text-[#333333] max-w-5xl mx-auto">
        {/* Headings */}
        <div className="flex rounded-t-2xl bg-[#E6E6FA] border border-[#DCDCDC]">
          <p className="w-[45%] px-5 py-3 font-semibold">Course Name</p>
          <p className="w-1/4 px-2 py-3 font-semibold">Duration</p>
          <p className="flex-1 px-2 py-3 font-semibold">Progress</p>
        </div>
        {/* loading Skeleton */}
        {!enrolledCourses && <div >
          {sklItem()}
          {sklItem()}
          {sklItem()}
          {sklItem()}
          {sklItem()}
        </div>}
        {/* Course Names */}
        {enrolledCourses?.map((course, i, arr) => (
          <div
            className={`flex flex-col sm:flex-row sm:items-center border border-[#DCDCDC] ${i === arr.length - 1 ? "rounded-b-2xl" : "rounded-none"} bg-[#FFFFFF]`}
            key={i}
          >
            <div
              className="flex sm:w-[45%] cursor-pointer items-center gap-4 px-5 py-3 group"
              onClick={() => {
                navigate(
                  `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                )
              }}
            >
              <Img
                src={course.thumbnail}
                alt="course_img"
                className="h-14 w-14 rounded-lg object-cover"
              />
              <div className="flex max-w-xs flex-col gap-2">
                <p className="font-semibold text-[#333333] group-hover:text-[#5A189A] transition-colors duration-200">{course.courseName}</p>
                <p className="text-xs text-[#666666]">
                  {course.courseDescription.length > 50
                    ? `${course.courseDescription.slice(0, 50)}...`
                    : course.courseDescription}
                </p>
              </div>
            </div>
            {/* only for smaller devices */}
            <div className='sm:hidden'>
              <div className=" px-2 py-3 text-[#666666]">{course?.totalDuration}</div>
              <div className="flex sm:w-2/5 flex-col gap-2 px-2 py-3">
                <p className="text-[#666666]">Progress: {course.progressPercentage || 0}%</p>
                <ProgressBar
                  completed={course.progressPercentage || 0}
                  height="8px"
                  isLabelVisible={false}
                  baseBgColor="#E6E6FA"
                  bgColor="#9B5DE5"
                />
              </div>
            </div>
            {/* only for larger devices */}
            <div className="hidden w-1/5 sm:flex px-2 py-3 text-[#666666]">{course?.totalDuration}</div>
            <div className="hidden sm:flex w-1/5 flex-col gap-2 px-2 py-3">
              <p className="text-[#666666]">Progress: {course.progressPercentage || 0}%</p>
              <ProgressBar
                completed={course.progressPercentage || 0}
                height="8px"
                isLabelVisible={false}
                baseBgColor="#E6E6FA"
                bgColor="#9B5DE5"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}