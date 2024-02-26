import React from 'react'
import Hero from '../../components/Hero'
import Categories from './Categories'
import SpecialDishes from './SpecialDishes'
import Testimonials from './Testimonials'
import OurServices from './OurServices'

function Home() {
  return (
    <div>
      <Hero/>
      <Categories/>
      <SpecialDishes/>
      <Testimonials/>
      <OurServices/>
    </div>
  )
}

export default Home