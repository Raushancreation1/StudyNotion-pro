import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import "video-react/dist/video-react.css"
import { useLocation } from "react-router-dom"
import { BigPlayButton, Player } from "video-react"

import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI"
import { updateCompletedLectures } from "../../../slices/viewCourseSlice"
import IconBtn from "../../common/IconBtn"

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const playerRef = useRef(null)
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse)

  const [videoData, setVideoData] = useState(null)
  const [previewSource, setPreviewSource] = useState("")
  const [videoEnded, setVideoEnded] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      if (!courseSectionData?.length) return
      if (!courseId || !sectionId || !subSectionId) {
        navigate(`/dashboard/enrolled-courses`)
        return
      }

      const section = courseSectionData.find((sec) => sec._id === sectionId)
      if (!section || !Array.isArray(section.subSection)) {
        // Missing section or subsections; avoid crashing
        setVideoData(null)
        return
      }

      const sub = section.subSection.find((s) => s._id === subSectionId)
      if (!sub) {
        // If subsection not found, avoid indexing [0]
        setVideoData(null)
        return
      }

      setVideoData(sub)
      setPreviewSource(courseEntireData?.thumbnail || "")
      setVideoEnded(false)
    })()
  }, [courseSectionData, courseEntireData, location.pathname, courseId, sectionId, subSectionId, navigate])

  // check if the lecture is the first video of the course
  const isFirstVideo = () => {
    if (!Array.isArray(courseSectionData) || !courseSectionData.length) return false
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    if (currentSectionIndx < 0) return false
    const subSections = courseSectionData[currentSectionIndx]?.subSection
    if (!Array.isArray(subSections) || !subSections.length) return false
    const currentSubSectionIndx = subSections.findIndex((data) => data._id === subSectionId)

    if (currentSectionIndx === 0 && currentSubSectionIndx === 0) {
      return true
    } else {
      return false
    }
  }

  // go to the next video
  const goToNextVideo = () => {
    if (!Array.isArray(courseSectionData) || !courseSectionData.length) return
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    if (currentSectionIndx < 0) return
    const subSections = courseSectionData[currentSectionIndx]?.subSection
    if (!Array.isArray(subSections) || !subSections.length) return
    const noOfSubsections = subSections.length
    const currentSubSectionIndx = subSections.findIndex((data) => data._id === subSectionId)

    // console.log("no of subsections", noOfSubsections)

    if (currentSubSectionIndx > -1 && currentSubSectionIndx !== noOfSubsections - 1) {
      const nextSubSectionId = subSections[currentSubSectionIndx + 1]?._id
      if (!nextSubSectionId) return
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      )
    } else {
      const nextSection = courseSectionData[currentSectionIndx + 1]
      if (!nextSection || !Array.isArray(nextSection.subSection) || !nextSection.subSection.length) return
      const nextSectionId = nextSection._id
      const nextSubSectionId = nextSection.subSection[0]?._id
      if (!nextSectionId || !nextSubSectionId) return
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      )
    }
  }

  // check if the lecture is the last video of the course
  const isLastVideo = () => {
    if (!Array.isArray(courseSectionData) || !courseSectionData.length) return false
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    if (currentSectionIndx < 0) return false
    const subSections = courseSectionData[currentSectionIndx]?.subSection
    if (!Array.isArray(subSections) || !subSections.length) return false
    const noOfSubsections = subSections.length
    const currentSubSectionIndx = subSections.findIndex((data) => data._id === subSectionId)

    if (
      currentSectionIndx === courseSectionData.length - 1 &&
      currentSubSectionIndx === noOfSubsections - 1
    ) {
      return true
    } else {
      return false
    }
  }

  // go to the previous video
  const goToPrevVideo = () => {
    if (!Array.isArray(courseSectionData) || !courseSectionData.length) return
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    if (currentSectionIndx < 0) return
    const subSections = courseSectionData[currentSectionIndx]?.subSection
    if (!Array.isArray(subSections) || !subSections.length) return
    const currentSubSectionIndx = subSections.findIndex((data) => data._id === subSectionId)

    if (currentSubSectionIndx !== 0) {
      const prevSubSectionId = subSections[currentSubSectionIndx - 1]?._id
      if (!prevSubSectionId) return
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      )
    } else {
      const prevSection = courseSectionData[currentSectionIndx - 1]
      if (!prevSection || !Array.isArray(prevSection.subSection) || !prevSection.subSection.length) return
      const prevSectionId = prevSection._id
      const prevSubSectionLength = prevSection.subSection.length
      const prevSubSectionId = prevSection.subSection[prevSubSectionLength - 1]?._id
      if (!prevSectionId || !prevSubSectionId) return
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      )
    }
  }

  const handleLectureCompletion = async () => {
    setLoading(true)
    const res = await markLectureAsComplete(
      { courseId: courseId, subSectionId: subSectionId },
      token
    )
    if (res) {
      dispatch(updateCompletedLectures(subSectionId))
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col gap-4 sm:gap-5 text-white px-2 sm:px-0">
      {!videoData ? (
        <img
          src={previewSource}
          alt="Preview"
          className="h-full w-full rounded-md object-cover"
        />
      ) : (
        <Player
          ref={playerRef}
          aspectRatio="16:9"
          playsInline
          onEnded={() => setVideoEnded(true)}
          src={videoData?.videoUrl}
        >
          <BigPlayButton position="center" />
          {/* Render When Video Ends */}
          {videoEnded && (
            <div
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1))",
              }}
              className="absolute inset-0 z-[100] grid h-full w-full place-content-center font-inter px-4"
            >
              {!completedLectures.includes(subSectionId) && (
                <IconBtn
                  disabled={loading}
                  onclick={() => handleLectureCompletion()}
                  text={!loading ? "Mark As Completed" : "Loading..."}
                  customClasses="text-base sm:text-lg lg:text-xl max-w-max px-4 mx-auto"
                />
              )}
              <IconBtn
                disabled={loading}
                onclick={() => {
                  if (playerRef?.current) {
                    // set the current time of the video to 0
                    playerRef?.current?.seek(0)
                    setVideoEnded(false)
                  }
                }}
                text="Rewatch"
                customClasses="text-base sm:text-lg lg:text-xl max-w-max px-4 mx-auto mt-2"
              />
              <div className="mt-6 sm:mt-8 flex w-full justify-center gap-3 sm:gap-4 text-base sm:text-lg lg:text-xl px-2">
                {!isFirstVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToPrevVideo}
                    className="blackButton"
                  >
                    Prev
                  </button>
                )}
                {!isLastVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToNextVideo}
                    className="blackButton"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </Player>
      )}

      <h1 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-semibold">{videoData?.title}</h1>
      <p className="pt-2 pb-6 text-sm sm:text-base">{videoData?.description}</p>
    </div>
  )
}

export default VideoDetails
// video
