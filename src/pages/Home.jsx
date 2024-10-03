import React, { useState, useEffect } from "react";
import DishCard from "../components/DishCard";
import { FaSliders } from "react-icons/fa6";
import { foodItemsDummy } from "../constants";

function Home() {
  const [foodItems, setFoodItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState(""); // For veg/non-veg filter
  const [searchTerm, setSearchTerm] = useState(""); // For search input
  const [sortOption, setSortOption] = useState(""); // For sorting

  const handleCategoryFilter = (category) => {
    setCategoryFilter(category);
    let filtered = foodItems.filter((item) =>
      category === "" ? true : item.category === category
    );

    if (sortOption) {
      filtered = filtered.sort((a, b) => {
        if (sortOption === "priceAsc") return a.price - b.price;
        if (sortOption === "priceDesc") return b.price - a.price;
        if (sortOption === "ratingAsc") return a.rating - b.rating;
        if (sortOption === "ratingDesc") return b.rating - a.rating;
        return 0;
      });
    }

    setFilteredItems(filtered);
  };

  // Search filter function
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const searched = foodItems.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredItems(searched);
  };

  // Sort function for price and rating
  const handleSort = (option) => {
    setSortOption(option);
    const sorted = [...filteredItems].sort((a, b) => {
      if (option === "priceAsc") return a.price - b.price;
      if (option === "priceDesc") return b.price - a.price;
      if (option === "ratingAsc") return a.rating - b.rating;
      if (option === "ratingDesc") return b.rating - a.rating;
      return 0;
    });
    setFilteredItems(sorted);
  };

  const [sortingMenuOpen, setSortingMenuOpen] = useState(false);

  useEffect(() => {
    setFoodItems(foodItemsDummy);
    setFilteredItems(foodItemsDummy);
  }, []);
  return (
    <div className="bg-white px-5 flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h3 className="p-0 m-0 text-2xl font-bold aref-ruqaa-ink-bold text-yellow-500">
          Find{" "}
          <span className="aref-ruqaa-ink-bold text-[#296E4E] text-3xl">
            the Best food
          </span>
        </h3>
        <p className="m-0 p-0 text-[#050505] text-xl aref-ruqaa-ink-regular">
          Order & Eat
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex gap-2 justify-between items-center relative">
        <input
          className="border-2 p-2 rounded-md basis-[85%] border-gray-200"
          type="text"
          placeholder="Search for food..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <span
          className="p-2 border-2 rounded-md basis-1"
          onClick={() => {
            setSortingMenuOpen(!sortingMenuOpen);
          }}
        >
          <FaSliders size={24} className="bg-white" color={"#296E4E"} />
        </span>

        {/* Sorting Dropdown */}
        {sortingMenuOpen && (
          <div className="absolute border right-0 top-12 rounded-md">
            <select
              value={sortOption}
              onChange={(e) => handleSort(e.target.value)}
              className="bg-gray-200 p-3 rounded-md text-[#296E4E] font-semibold"
            >
              <option disabled value="">
                Sort By
              </option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
              <option value="ratingAsc">Rating: Low to High</option>
              <option value="ratingDesc">Rating: High to Low</option>
            </select>
          </div>
        )}
      </div>

      {/* Veg/Non-Veg Filter Icons */}
      <div className="flex items-center justify-between">
        <button
          className={`basis-[30%] border ${
            categoryFilter === "" ? "bg-[#296E4E] text-white font-semibold" : ""
          } p-2 py-3 rounded-xl `}
          onClick={() => handleCategoryFilter("")}
        >
          All food
        </button>
        <button
          onClick={() => handleCategoryFilter("veg")}
          className={`basis-[30%] border ${
            categoryFilter === "veg"
              ? "bg-[#296E4E] text-white font-semibold"
              : ""
          } p-2 py-3 rounded-xl`}
        >
          Veg
        </button>
        <button
          onClick={() => handleCategoryFilter("nonveg")}
          className={`basis-[30%] border ${
            categoryFilter === "nonveg"
              ? "bg-[#296E4E] text-white font-semibold"
              : ""
          } p-2 py-3 rounded-xl`}
        >
          Non-Veg
        </button>
      </div>

      {/* Food Items List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        {filteredItems?.map((item) => (
          <DishCard dish={item} />
        ))}
      </div>
    </div>
  );
}

export default Home;
