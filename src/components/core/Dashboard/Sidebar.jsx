import React from 'react'
import {sidebarLinks} from "../../../data/dashboard"
import {logout} from "../../../services/operations/authAPI"
import { useSelector } from 'react-redux'

const Sidebar = () => {

    const {user, loading: profileLoading} = useSelector((state) => state.profile);
    const {loading:authLoading} = useSelector((state) => state.auth);

    if(profileLoading || authLoading) {
        return (
            <div>
                <div className="spinner"></div>
            </div>
        )
    }
  return (
    <div>
         <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">

            <div className='flex flex-col'> 
                {
                    sidebarLinks.map((link, index) => {
                        if(link.type && user?.accountType !== link.type) return null;
                        return (
                            <SidebarLinks/>
                        )
                    })
                }

            </div>
         </div>
    </div>
  )
}

export default Sidebar