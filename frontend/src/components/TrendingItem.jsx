import React from "react";

function TrendingItem({ coin }) {
  const { name, small, point1, point2, point3 } = coin.item;

  return (
    <div className="flex flex-col items-center sm:items-start justify-start text-center sm:text-left  p-6 sm:p-8 md:p-10  transition-all duration-300">
      <img
        src={small}
        alt={name}
        className="w-16 h-16 sm:w-20 sm:h-20 object-contain mb-4 sm:mb-6"
      />

      <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">
        {name}
      </h2>

      <ul className="text-sm sm:text-base text-gray-300 space-y-2">
        <li>{point1}</li>
        <li>{point2}</li>
        <li>{point3}</li>
      </ul>
    </div>
  );
}

export default TrendingItem;
