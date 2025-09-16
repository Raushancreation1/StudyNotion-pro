import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../common/IconBtn'

const MyProfile = () => {

  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate();
  return (
    <div className='text-white'>
      <h1>
        My Profile
      </h1>

      <div>

        <div>
          <img 
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
            />

          <div className="space-y-1">
            <p className="text-lg font-semibold text-richblack-5"> 
              {user?.firstName +  " " + user?.lastName} </p>
            <p className="text-sm text-richblack-300"> {user?.email} </p>
          </div>
        </div>
            <IconBtn 
                 text="Edit"
                 onclick={() => {
                     navigate("/dashboard/settings")
                 }}>
            </IconBtn >
      </div>
    </div>
  )
}

export default MyProfile