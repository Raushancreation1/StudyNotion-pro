import { useState } from "react"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { AiOutlineMenu } from "react-icons/ai"

import Sidebar from "../components/core/Dashboard/Sidebar"

function Dashboard() {
  const { loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-[900] bg-black/50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Content */}
      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        {/* Mobile top bar */}
        <div className="md:hidden sticky top-0 z-[800] bg-richblack-900/60 backdrop-blur px-4 py-3 border-b border-richblack-700">
          <button
            className="inline-flex items-center gap-2 rounded-md border border-richblack-700 px-3 py-2 text-richblack-100"
            onClick={() => setIsSidebarOpen(true)}
          >
            <AiOutlineMenu />
            <span>Menu</span>
          </button>
        </div>
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
