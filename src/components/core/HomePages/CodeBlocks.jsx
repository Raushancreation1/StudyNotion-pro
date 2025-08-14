import React from 'react'
import CTAButton from './Button';
import { FaArrowRight } from 'react-icons/fa';
import HighlightText from './HighlightText';
import { TypeAnimation } from 'react-type-animation';

const CodeBlocks = ({
    position, heading, subheading, ctabtn1, ctabtn2, codeblocks, backgroundGradient, codeColor
}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10`}>

        {/*section 1*/}
        <div className='w-[50%] flex flex-col gap-8'>
            {heading}
            <div className='text-richblack-300 font-bold'>
                {subheading}
            </div>

            <div className='flex gap-7 mt-7'>
                <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                    <div className='flex gap-2 items-center'>
                        {ctabtn1.btnText}
                        <FaArrowRight/>
                    </div>

                 </CTAButton>

                 <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                        {ctabtn2.btnText}
                 </CTAButton>

            </div>
        </div>

        {/*section 2 */}

        <div className='h-fit flex flex-row text-10[px] w-[100%] py-4 lg:w-[500px]'>
            {/*WH: -> BG gradient*/}

            <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
                <p1>1</p1>
                <p1>2</p1>
                <p1>3</p1>
                <p1>4</p1>
                <p1>5</p1>
                <p1>6</p1>
                <p1>7</p1>
                <p1>8</p1>
                <p1>9</p1>
                <p1>10</p1>
                <p1>11</p1>
            </div>

            <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
                <TypeAnimation
                sequence={[codeblocks, 2000, ""]}
                repeat={Infinity}
                cursor={true}
                
                style={
                    {
                        whiteSpace:"pre-line",
                        display:"block"
                    }
                }
                omitDeletionAnimation={true}
                />

            </div>
        </div>

    </div>
  )
}

export default CodeBlocks