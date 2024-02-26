import React from 'react'

function Hero() {
  return (
    <div className='section-container bg-gradient-to-b from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%'>
        <div className="py-10 flex flex-col md:flex-row-reverse justify-between items-center gap-8">
            {/* image */}
            <div className="md:w-1/2">
                <img src="/images/home/banner.png" alt="loading.."/>
                <div className='flex gap-12 -mt-14 ml-6'>
                    <div className='flex gap-6 bg-white shadow-md w-80 rounded-lg items-center px-6 py-2'>
                        <img src="/images/home/b-food1.png" alt='loading..' className='rounded-xl'/>
                        <div>
                            <h3 className='text-red font-semibold text-md mb-2'>Special Spicy noodles</h3>
                            <div className="rating rating-sm">
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" readOnly />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" readOnly checked />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" readOnly />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" readOnly />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" readOnly />
                            </div>
                            <p>$25.00</p>
                        </div>
                    </div>
                    <div className='hidden md:flex gap-6 bg-white shadow-md w-80 rounded-lg items-center px-6 py-2'>
                        <img src="/images/home/b-food1.png" alt='loading..' className='rounded-xl'/>
                        <div>
                            <h3 className='text-red font-semibold text-md mb-2'>Spicy noodles</h3>
                            <div className="rating rating-sm">
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" readOnly />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" readOnly />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" readOnly />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" readOnly checked />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" readOnly />
                            </div>
                            <p>$18.00</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* side text */}
            <div className="md:w-1/2 flex flex-col gap-y-8">
                <h2 className='font-bold md:text-5xl text-4xl leading-snug'>Dive into Delights Of Delectable <span className='text-primary'>Food</span></h2>
                <p className='text-secondary'>Where Each Plate Weaves a Story of Culinary<br/>Mastery and Passionate Craftsmanship</p>
                <div className='flex gap-4'>
                    <button className='bg-primary text-white px-8 py-3 rounded-full'>Order Now</button>
                    <button>Watch Video</button>
                </div>
            </div>
            
        </div>


    </div>
  )
}

export default Hero