import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI"
import { getInstructorData } from "../../../services/operations/profileAPI"
import InstructorChart from "./InstructorDashboard/InstructorChart"
import Img from './../../common/Img';



export default function Instructor() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)

  const [loading, setLoading] = useState(false)
  const [instructorData, setInstructorData] = useState(null)
  const [courses, setCourses] = useState([])


  // get Instructor Data
  useEffect(() => {
    ; (async () => {
      setLoading(true)
      const instructorApiData = await getInstructorData(token)
      const result = await fetchInstructorCourses(token)
      // console.log('INSTRUCTOR_API_RESPONSE.....', instructorApiData)
      if (instructorApiData.length) setInstructorData(instructorApiData)
      if (result) {
        setCourses(result)
      }
      setLoading(false)
    })()
  }, [])

  const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0)

  const totalStudents = instructorData?.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0)


  // skeleton loading
  const skItem = () => {
    return (
      <div className="mt-5 w-full flex flex-col justify-between  rounded-xl ">
        <div className="flex border p-4  ">
          <div className="w-full">
            <p className="w-[100px] h-4 rounded-xl skeleton"></p>
            <div className="mt-3 flex gap-x-5">
              <p className="w-[200px] h-4 rounded-xl skeleton"></p>
              <p className="w-[100px] h-4 rounded-xl skeleton"></p>
            </div>

            <div className="flex justify-center items-center flex-col">
              <div className="w-[80%] h-24 rounded-xl mt-5 skeleton"></div>
              {/* circle */}
              <div className="w-60 h-60 rounded-full  mt-4 grid place-items-center skeleton"></div>
            </div>
          </div>
          {/* right column */}
          <div className="sm:flex hidden min-w-[250px] flex-col rounded-xl p-6 skeleton"></div>
        </div>

        {/* bottom row */}
        <div className="flex flex-col gap-y-6  mt-5">
          <div className="flex justify-between">
            <p className="text-lg font-bold text-richblack-5 pl-5">Your Courses</p>
            <Link to="/dashboard/my-courses">
              <p className="text-xs font-semibold text-yellow-50 hover:underline pr-5">View All</p>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row  gap-6 ">
            <p className=" h-[201px] w-full rounded-xl  skeleton"></p>
            <p className=" h-[201px] w-full rounded-xl  skeleton"></p>
            <p className=" h-[201px] w-full rounded-xl  skeleton"></p>
          </div>
        </div>
      </div>
    )
  }


  return (
    <div className="min-h-screen  py-8">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-2 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center sm:text-left">
            Hii {user?.firstName} 👋
          </h1>
          <p className="font-medium text-gray-600 text-center sm:text-left">
            Let's start something new
          </p>
        </div>

        {loading ? (
          <div>
            {skItem()}
          </div>
        ) : courses.length > 0 ? (
          <div>
            <div className="my-4 flex h-[450px] space-x-6 flex-wrap">
              {/* Main Content Card (Chart) */}
              <div className="flex-1 rounded-2xl bg-white border border-gray-200 shadow-lg p-8 flex flex-col justify-between">
                {totalAmount > 0 || totalStudents > 0 ? (
                  <InstructorChart courses={instructorData} />
                ) : (
                  <div className="flex-1 flex flex-col justify-center items-center">
                    <p className="text-lg font-bold text-gray-700">Visualize</p>
                    <p className="mt-4 text-xl font-medium text-gray-400">
                      Not Enough Data To Visualize
                    </p>
                  </div>
                )}
              </div>
              {/* Statistics Card - modern, all text white, beautiful gradient */}
              <div className="flex min-w-[300px] max-w-[35px] h-[450px] flex-col rounded-2xl bg-gradient-to-br from-[#283E51] to-[#485563] border border-blue-900 shadow-2xl p-10 items-center justify-center mx-auto my-auto">
                <p className="text-2xl font-bold text-yellow-300 mb-6 tracking-wide text-center drop-shadow">Statistics</p>
                <div className="space-y-10 w-full">
                  <div>
                    <p className="text-lg text-white text-center opacity-80">Total Courses</p>
                    <p className="text-5xl font-extrabold text-white mt-2 drop-shadow text-center">{courses.length}</p>
                  </div>
                  <div>
                    <p className="text-lg text-white text-center opacity-80">Total Students</p>
                    <p className="text-5xl font-extrabold text-white mt-2 drop-shadow text-center">{totalStudents}</p>
                  </div>
                  <div>
                    <p className="text-lg text-white text-center opacity-80">Total Income</p>
                    <p className="text-5xl font-extrabold text-white mt-2 drop-shadow text-center">Rs. {totalAmount}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Render 3 courses */}
            <div className="rounded-2xl bg-white border border-gray-200 shadow-lg p-8 mt-16 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <p className="text-2xl font-bold text-gray-800 tracking-wide">Your Courses</p>
                <Link to="/dashboard/my-courses">
                  <p className="text-sm font-semibold text-yellow-600 hover:text-blue-500 transition-colors duration-200">View All</p>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.slice(0, 3).map((course) => (
                  <div key={course._id} className="bg-white text-gray-900 rounded-xl border border-gray-200 shadow-md p-6 flex flex-col items-center gap-2 transition-transform hover:scale-105 hover:shadow-lg">
                    <Img
                      src={course.thumbnail}
                      alt={course.courseName}
                      className="h-[160px] w-full rounded-lg object-cover border border-gray-200 mb-4"
                    />
                    <div className="w-full text-center">
                      <p className="text-lg font-semibold text-gray-800 mb-2 truncate">
                        {course.courseName}
                      </p>
                      <div className="flex items-center justify-center space-x-2 text-gray-500 text-sm mb-2">
                        <span>{course.studentsEnrolled.length} students</span>
                        <span>|</span>
                        <span>Rs. {course.price}</span>
                      </div>
                      <p className="text-xs text-gray-400 truncate">{course.courseDescription?.slice(0, 60)}{course.courseDescription?.length > 60 ? '...' : ''}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-20 rounded-2xl bg-white border border-gray-200 shadow p-6 py-20">
            <p className="text-center text-2xl font-bold text-gray-700">
              You have not created any courses yet
            </p>
            <Link to="/dashboard/add-course">
              <p className="mt-1 text-center text-lg font-semibold text-yellow-600 hover:text-blue-500 transition-colors duration-200">
                Create a course
              </p>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
