import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { BuyCourse } from '../services/operations/studentFeaturesAPI';

const CourseDetails = () => {

    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const courseId = useParams()

    const handleBuyCourse = () => {
        if(token) {
            BuyCourse(token, [courseId], user, navigate, dispatch);
            return;
        }
    }
  return (
    <div className='flex items-center '>
        <button className="bg-yellow-50 p-6 mt-10"
        onClick={() => handleBuyCourse ()}>
            Buy Now
        </button>
    </div>
  )
}

export default CourseDetails