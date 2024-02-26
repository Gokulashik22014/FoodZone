import React, { useEffect, useRef, useState } from 'react'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import SpecialCard from '../../components/SpecialCard';
import { IoIosArrowForward,IoIosArrowBack } from "react-icons/io";

function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        onClick={onClick}
      />
    );
  }
  
  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        onClick={onClick}
      />
    );
  }

function SpecialDishes() {
    const [special,setSpecial]=useState([])
    const slider=useRef(null)
    useEffect(()=>{
        fetch("/menu.json").then(response=>response.json()).then(data=>{
            setSpecial(data.filter(item=>item.category == "popular"))
        })
    },[])
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ],
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    }
  return (
    <div className='section-container mt-24 mb-12 relative'>
         <div className='text-left mb-12'>
            <p className='subtitle'>Special Dishes</p>
            <h2 className='title'>Standout Dishes<br/>From Our Menu</h2>
        </div>
        <div className='md:absolute right-32 top-24 space-x-4'>
            <button onClick={()=>slider?.current?.slickPrev()} className='hover:bg-zinc-400 b-trans bg-zinc-300 rounded-full text-white p-1 text-3xl'>
                <IoIosArrowBack className='w-full'/>
            </button>
            <button onClick={()=>slider?.current?.slickNext()} className='hover:bg-zinc-400 b-trans bg-primary rounded-full text-white p-1 text-3xl'>
                <IoIosArrowForward className='w-full'/>
            </button>
        </div>
        <div className='md:px-20'>
          <Slider ref={slider} {...settings}>
            {
              special.map((item,index)=><SpecialCard key={index} item={item}/>)
            }
          </Slider>
        </div>
    </div>
  )
}

export default SpecialDishes