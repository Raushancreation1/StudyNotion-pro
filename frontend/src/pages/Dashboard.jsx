import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { useState } from "react"
import { IoMenu } from "react-icons/io5"

import Sidebar from "../components/core/Dashboard/Sidebar"

function Dashboard() {
  const { loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
      <Sidebar isOpen={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />
      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          {/* Mobile sidebar toggle */}
          <div className="mb-4 lg:hidden">
            <button
              type="button"
              aria-label="Open sidebar"
              onClick={() => setMobileSidebarOpen(true)}
              className="inline-flex items-center gap-2 rounded-md bg-richblack-800 px-3 py-2 text-sm font-medium text-richblack-100 ring-1 ring-inset ring-richblack-700 hover:bg-richblack-700"
            >
              <IoMenu className="text-xl" />
              Menu
            </button>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
