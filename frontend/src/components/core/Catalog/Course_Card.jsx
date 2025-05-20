import React, { useEffect, useState } from "react"
// Icons
// import { FaRegStar, FaStar } from "react-icons/fa"
// import ReactStars from "react-rating-stars-component"
import { Link } from "react-router-dom"

import GetAvgRating from "../../../utils/avgRating"
import RatingStars from "../../common/RatingStars"
import Img from './../../common/Img';



function Course_Card({ course, Height }) {
  // const avgReviewCount = GetAvgRating(course.ratingAndReviews)
  // console.log(course.ratingAndReviews)
  const [avgReviewCount, setAvgReviewCount] = useState(0)
  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReviews)
    setAvgReviewCount(count)
  }, [course])
  // console.log("count............", avgReviewCount)

  return (
    <div className='hover:scale-[1.03] transition-all duration-200 z-50'>
      <Link to={`/courses/${course._id}`}>
        <div className="bg-[#FFFFFF] border border-[#DEE2E6] rounded-xl shadow-[0_2px_8px_0_rgba(0,0,0,0.05)] overflow-hidden flex flex-col h-full hover:bg-[#F1F3F5] transition-colors duration-200">
          <Img
            src={course?.thumbnail}
            alt="course thumnail"
            className={`${Height} w-full rounded-t-xl object-cover`}
          />
          <div className="flex flex-col gap-2 px-4 py-4 flex-1">
            <p className="text-lg font-semibold text-[#212529]">{course?.courseName}</p>
            <p className="text-sm text-[#6C757D]">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-[#FFD43B] font-bold">{avgReviewCount || 0}</span>
              <RatingStars Review_Count={avgReviewCount} Star_Size={20} Star_Color="#FFD43B" />
              <span className="text-[#6C757D] text-xs">
                {course?.ratingAndReviews?.length} Ratings
              </span>
            </div>
            <p className="text-lg font-bold text-[#212529] mt-2">Rs. {course?.price}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Course_Card
