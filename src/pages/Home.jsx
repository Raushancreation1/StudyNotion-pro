import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import HighlightText from '../components/core/HomePages/HighlightText';
import CTAButton from '../components/core/HomePages/Button';
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from '../components/core/HomePages/CodeBlocks';

const Home = () => {
  return (
    <div>
            {/* Section1 */}
            <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent flex-col items-center text-white justify-between '>

                
                    <Link to={"/singup"}>

                        <div className="group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">

                            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
                                <p>Become an Instructor</p>
                                 <FaArrowRight />
                            </div>
                        </div>

                    </Link>

                    <div className='text-center tex-4xl font-semibold '>
                        Empower Your Future with
                        <HighlightText text={"Coding Skills"}/> 
                    </div>

                    <div className='mt-3 w-[90%] text-center text-lg font-bold text-richblack-300'>
                        With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
                    </div>

                    <div className="flex flex-row gap-7 mt-8">

                        <CTAButton active={true} linkto={"/signup"}>
                            Learn More
                        </CTAButton>

                        <CTAButton active={false} linkto={"/login"}>
                            Book a Demo
                        </CTAButton>

                    </div>

                    {/* Video */}
                    <div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200">

                        <video
                        className="shadow-[20px_20px_rgba(255,255,255)]"
                        muted
                        loop
                        autoPlay
                        >

                            <source src={Banner} type="video/mp4" />
                        </video> 

                    </div>

                    {/*Code section1 */}
                    <div>
                        <CodeBlocks
                             position={"lg:flex-row"}
                                heading={
                                    <div className='text-4xl font-semibold'>
                                        Unlock Your
                                        <HighlightText text={"Coding Potential"}/>
                                        with our online courses
                                    </div>

                                }
                                subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}

                            ctabtn1={
                                {
                                    btnText:"Try it Yourself",
                                    linkto:"/signup",
                                    active:true,
                                }
                            }
                             
                            ctabtn2={
                                {
                                    btnText:"learn More",
                                    linkto:"/login",
                                    active:false,
                                }
                            }

                            codeblocks={`<<!DOCTYPE html>\n<html>\n<head><title>Example</title><linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>>`}
                            backgroundGradient={<div className="codeblock1 absolute"></div>}
                            
                        />
                    </div>


                    {/*Code section2 */}
                    <div>
                        <CodeBlocks
                             position={"lg:flex-row-reverse"}
                                heading={
                                    <div className="w-[100%] text-4xl font-semibold lg:w-[50%] ">
                                        Start
                                        <HighlightText text={"coding in seconds"}/>
                                        
                                    </div>

                                }
                                subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}

                            ctabtn1={
                                {
                                    btnText:"Continue Lesson",
                                    linkto:"/signup",
                                    active:true,
                                }
                            }
                             
                            ctabtn2={
                                {
                                    btnText:"learn More",
                                    linkto:"/login",
                                    active:false,
                                }
                            }
                               
                            codeColor={"text-white"}
                            
                            codeblocks={`<<!DOCTYPE html>\n<html>\n<head><title>Example</title><linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>>`}
                            backgroundGradient={<div className="codeblock2 absolute"></div>}
                            
                        />
                    </div>
            </div>

        {/* Section2 */}
        <div className="bg-pure-greys-5 text-richblack-700 ">
            <div className="homepage_bg h-[333px]">

            </div>
        </div>

        {/* Section3 */}

        {/* Footer */}
    </div>
  )
}

export default Home