import React from 'react'
import { data } from 'react-router-dom';


const Stats = [
  { count: "5K", label: "Active Students" },
  { count: "10+", label: "Mentors" },
  { count: "200+", label: "Courses" },
  { count: "50+", label: "Awards" },
];

const StatsComponent = () => {
  return (
    <div>
        <div>
            {
                Stats.map((data, index) => {
                    return (
                        <div key={index}>
                            <h1>
                                {data.count}
                            </h1>
                            <h2>
                                {data.label}
                            </h2>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default StatsComponent