import { useEffect, useRef, useState } from "react"
import { useDropzone } from "react-dropzone"
import { FiUploadCloud } from "react-icons/fi"
import { useSelector } from "react-redux"

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
  const { course } = useSelector((state) => state.course)
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  )
  const [errorMsg, setErrorMsg] = useState("")
  const inputRef = useRef(null)

  // Validate image: 16:9 aspect ratio and at least 1024x576
  const validateImage = (file) =>
    new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        const { width, height } = img
        const ratio = width / height
        const target = 16 / 9
        const withinTolerance = Math.abs(ratio - target) < 0.02 // ~2% tolerance
        const meetsSize = width >= 1024 && height >= 576
        if (!withinTolerance) {
          resolve({ ok: false, message: "Image must have 16:9 aspect ratio." })
          return
        }
        if (!meetsSize) {
          resolve({ ok: false, message: "Minimum size is 1024x576 pixels." })
          return
        }
        resolve({ ok: true })
      }
      img.onerror = () => resolve({ ok: false, message: "Invalid image file." })
      img.src = URL.createObjectURL(file)
    })

  const onDrop = async (acceptedFiles, fileRejections) => {
    setErrorMsg("")
    // Handle any dropzone-level rejections first
    if (fileRejections && fileRejections.length > 0) {
      const reason = fileRejections[0]?.errors?.[0]?.message || "Unsupported file"
      setErrorMsg(reason)
      setSelectedFile(null)
      setPreviewSource("")
      setValue(name, null)
      return
    }
    const file = acceptedFiles?.[0]
    if (!file) return

    if (!video) {
      const result = await validateImage(file)
      if (!result.ok) {
        setErrorMsg(result.message)
        setSelectedFile(null)
        setPreviewSource("")
        setValue(name, null)
        return
      }
    }

    previewFile(file)
    setSelectedFile(file)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
    multiple: false,
    maxFiles: 1,
    onDrop,
  })

  const previewFile = (file) => {
    // For videos, prefer Object URL to avoid huge data URLs
    if (video) {
      const url = URL.createObjectURL(file)
      setPreviewSource(url)
      return
    }
    // For images, use Data URL for easy inline preview
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  useEffect(() => {
    register(name, { required: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [register])

  useEffect(() => {
    setValue(name, selectedFile)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile, setValue])

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} {!viewData && <sup className="text-pink-200">*</sup>}
      </label>
      <div
        className={`${
          isDragActive ? "bg-richblack-600" : "bg-richblack-700"
        } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
      >
        {previewSource ? (
          <div className="flex w-full flex-col p-6">
            {!video ? (
              <img
                src={previewSource}
                alt="Preview"
                className="h-full w-full rounded-md object-cover"
              />
            ) : (
              <video
                src={previewSource}
                controls
                className="w-full rounded-md"
                style={{ aspectRatio: "16 / 9" }}
              />
            )}
            {!viewData && (
              <button
                type="button"
                onClick={() => {
                  setPreviewSource("")
                  setSelectedFile(null)
                  setValue(name, null)
                }}
                className="mt-3 text-richblack-400 underline"
              >
                Cancel
              </button>
            )}
            {!viewData && (
              <button
                type="button"
                onClick={() => inputRef.current && inputRef.current.click()}
                className="mt-2 w-max rounded-md bg-yellow-50 px-3 py-1 text-sm font-semibold text-richblack-900"
              >
                Change file
              </button>
            )}
          </div>
        ) : (
          <div
            className="flex w-full flex-col items-center p-6"
            {...getRootProps()}
          >
            <input {...getInputProps()} ref={inputRef} />
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>
            <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
              Drag and drop an {!video ? "image" : "video"}, or click to{" "}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  inputRef.current && inputRef.current.click()
                }}
                className="font-semibold text-yellow-50 underline"
              >
                Browse
              </button>{" "}
              a file
            </p>
            <ul className="mt-10 flex list-disc justify-between space-x-12 text-center  text-xs text-richblack-200">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
            {errorMsg && (
              <p className="mt-3 text-xs text-pink-200">{errorMsg}</p>
            )}
          </div>
        )}
      </div>
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  )
}