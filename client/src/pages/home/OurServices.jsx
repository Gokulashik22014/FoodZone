import React from 'react'

function OurServices() {
    const services=[
        {id:1,image:"/images/home/services/icon1.png",title:"Catering",subtitle:"Delight your guests with our flavors and  presentation"},
        {id:2,image:"/images/home/services/icon2.png",title:"Fast delivery",subtitle:"We deliver your order promptly to your door"},
        {id:3,image:"/images/home/services/icon3.png",title:"Online Ordering",subtitle:"Explore menu & order with ease using our Online Ordering "},
        {id:4,image:"/images/home/services/icon4.png",title:"Gift Cards",subtitle:"Give the gift of exceptional dining with Foodi Gift Cards"},
    ]
  return (
    <div className='section-container mt-16'>
        <div className='md:flex-row flex flex-col gap-4'>
            <div className='md:w-1/2 space-y-10'>
                <h2 className='subtitle'>Our Story & Services</h2>
                <h1 className='title'>Our Culinary Journey And Services</h1>
                <blockquote className='text-secondary text-md'>
                    Rooted in passion, we curate unforgettable dining<br/> experiences and offer exceptional services,<br/> blending culinary artistry with warm hospitality.
                </blockquote>
                <button className='bg-primary text-white py-3 px-8 rounded-full'>Explore</button>
            </div>
            <div className='md:w-1/2'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center '>
                    {
                        services.map(service=>{
                            return (
                                <div key={service.id} className='bg-white text-center py-4 px-8 shadow-lg rounded-lg text-primary cursor-pointer b-trans hover:border hover:border-indigo-400'>
                                    <img src={service.image} alt="loading.." className='mx-auto'/>
                                    <div className='mt-6'>
                                        <h3 className='mb-2 font-semibold'>{service.title}</h3>
                                        <p>{service.subtitle}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default OurServices