import React from 'react'

function Card({name,avail,image}) {
  return (
    <div className='flex flex-col items-center text-center bg-white shadow-xl rounded-xl py-6 px-4 w-64 cursor-pointer hover:-translate-y-4 b-trans'>
        <div>
            <img src={image} alt="loading.." className='bg-[#C1F1C6]  p-5 w-28 h-28 rounded-full'/>
        </div>
        <div className='mt-5 space-y-1'>
            <h6 className='font-bold text-lg'>{name}</h6>
            <p className='text-secondary text-sm'>{avail}</p>
        </div>
    </div>
  )
}

export default Card