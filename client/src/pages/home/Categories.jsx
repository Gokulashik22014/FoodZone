import React from 'react'
import Card from '../../components/Card'

const categories=[
    {id:1,name:"Main Dish",avail:"(86 dishes)",image:"/images/home/category/img1.png"},
    {id:2,name:"Break Fast",avail:"(12 dishes)",image:"/images/home/category/img2.png"},
    {id:3,name:"Dessert",avail:"(48 dishes)",image:"/images/home/category/img3.png"},
    {id:4,name:"Browse All",avail:"(288 dishes)",image:"/images/home/category/img4.png"},
]

function Categories() {
  return (
    <div className='section-container mt-12'>
        <div className='text-center'>
            <p className='subtitle'>Customer Favorites</p>
            <h2 className='title'>Popular Categories</h2>
        </div>
        <div className='flex flex-col md:flex-row justify-around gap-8 items-center mt-16'>
            {
                categories.map(item=><Card key={item.id} name={item.name} avail={item.avail} image={item.image}/>)
            }
        </div>
    </div>
  )
}

export default Categories