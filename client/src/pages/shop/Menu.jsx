import React, { useState, useEffect } from "react";
import SpecialCard from "../../components/SpecialCard";
import { BsFilterLeft } from "react-icons/bs";
import Slider from "react-slick";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Menu() {
  const [settings, setSettings] = useState({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    rows: 2,
    slidesPerRow: 1,
    customPaging: (i) => (
      <div className="bg-zinc-400 rounded-full">
        <h1>{i + 1}</h1>
      </div>
    ),
  });
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [options, setOptions] = useState("default");

  //loading the data
  useEffect(() => {
    const loadData = async () => {
      try {
        await axios.get("http://localhost:3000/menu").then((response) => {
          setMenu(response.data.menu);
          setFilteredItems(response.data.menu);
          console.log(response);
        });
      } catch (error) {
        console.log("error" + error);
      }
    };
    loadData();
  }, []);
  //filtering the items based on category
  function filterItems(category) {
    const items =
      category === "all"
        ? menu
        : menu.filter((item) => item.category === category);
    setFilteredItems(items);
    setSelectedCategory(category);
  }
  //sorting options
  function sortItems(order) {
    setOptions(order);
    switch (order) {
      case "A-Z":
        setFilteredItems((old) =>
          old.sort((i1, i2) => i1.name.localeCompare(i2.name))
        );
        break;
      case "Z-A":
        setFilteredItems((old) =>
          old.sort((i1, i2) => i2.name.localeCompare(i1.name))
        );
        break;
      case "high-to-low":
        setFilteredItems((old) => old.sort((i1, i2) => i2.price - i1.price));
        break;
      case "low-to-high":
        setFilteredItems((old) => old.sort((i1, i2) => i1.price - i2.price));
        break;
      default:
        setFilteredItems((old) => old);
        break;
    }
  }
  return (
    <div className="section-container bg-gradient-to-b from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
      <div className="md:w-full py-48 flex flex-col gap-y-10 text-center items-center ">
        <h2 className="font-bold md:text-5xl text-4xl leading-snug">
          For the Love of Delicious <span className="text-primary">Food</span>
        </h2>
        <p className="text-secondary">
          Where Each Plate Weaves a Story of Culinary
          <br />
          Mastery and Passionate Craftsmanship Where Each Plate Weaves a Story
          of Culinary
          <br />
          Mastery and Passionate Craftsmanship
        </p>
        <div className="flex gap-4">
          <button className="bg-primary text-white px-8 py-3 rounded-full">
            Order Now
          </button>
        </div>
      </div>
      <div>
        <div className=" mb-12 flex flex-row justify-between flex-wrap">
          <div className="flex flex-row gap-3 justify-start mb-4 md:mb-0 md:items-center md:gap-8 md:pl-4 b-trans">
            {["All", "Salad", "Pizza", "Soup", "Dessert", "Drink"].map(
              (val, index) => (
                <button
                  key={index}
                  onClick={() => filterItems(val.toLowerCase())}
                  className={`${
                    selectedCategory === val.toLowerCase()
                      ? "text-primary underline font-semibold"
                      : "text-zinc-700"
                  } b-trans`}
                >
                  {val}
                </button>
              )
            )}
          </div>
          <div className="flex gap-1 items-center">
            <BsFilterLeft className="bg-zinc-700 text-white text-2xl rounded-lg p-1" />
            <select
              name="sort"
              id="sort"
              onChange={(e) => sortItems(e.target.value)}
              value={options}
              className="text-white bg-zinc-700 p-1 rounded-lg"
            >
              {["Default", "A-Z", "Z-A", "high-to-low", "low-to-high"].map(
                (val) => (
                  <option value={val}>{val}</option>
                )
              )}
            </select>
          </div>
        </div>
        <div>
          <Slider {...settings}>
            {filteredItems.map((item) => (
              <SpecialCard key={item._id} item={item}/>
            ))}
          </Slider>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme="colored"
      />
    </div>
  );
}

export default Menu;
