import React from 'react'
import {FaStar} from "react-icons/fa"

function Testimonials() {
    const testimonials=["testimonial1.png","testimonial2.png","testimonial3.png"]
  return (
    <div className='section-container mt-12'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-12'>
            <div className='md:w-1/2'>
                <img src="/images/home/testimonials/testimonials.png" alt="loading.."/>
            </div>
            <div className='md:w-1/2 space-y-12'>
                <h3 className='subtitle'>Testimonials</h3>
                <h1 className='title'>What Our Customers Say About Us</h1>
                <p className='text-secondary text-md leading-relaxed'>“I had the pleasure of dining at FoodZone last night, and <br/> I'm still raving about the experience! The attention to detail in<br/> presentation and service was impeccable”</p>
                <div className='flex gap-6'>
                    <div className='avatar-group -space-x-6 rtl:space-x-reverse'>
                        {
                            testimonials.map((image,index)=>{
                                return(
                                    <div className='avatar w-16 h-16' key={index}>
                                        <img src={`/images/home/testimonials/${image}`} key={index} />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div>
                        <h4 className='font-semibold text-xl'>Customer Feedback</h4>
                        <p className='flex gap-2 items-center text-[#454545]'><FaStar className='text-yellow-400'/>4.9 <span className='text-secondary'>(18.9k Reviews)</span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Testimonials