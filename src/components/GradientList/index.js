import React from "react";

const GradientList = () => {
  const bgColors = [
    {
      name: "HYPER",
      tail: "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500",
    },
    {
      name: "OCEANIC",
      tail: "bg-gradient-to-r from-green-300 via-blue-500 to-purple-600",
    },
    {
      name: "COTTON CANDY",
      tail: "bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400",
    },
    {
      name: "SUNSET",
      tail: "bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100",
    },
    {
      name: "BEACHSIDE",
      tail: "bg-gradient-to-r from-yellow-200 via-green-200 to-green-500",
    },
    {
      name: "PEACHY",
      tail: "bg-gradient-to-r from-red-200 via-red-300 to-yellow-200",
    },
    {
      name: "SEAFOAM",
      tail: "bg-gradient-to-r from-green-200 via-green-300 to-blue-500",
    },
    {
      name: "PUMPKIN",
      tail: "bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-700",
    },
    {
      name: "PANDORA",
      tail: "bg-gradient-to-r from-green-200 via-green-400 to-purple-700",
    },
    {
      name: "VALENTINE",
      tail: "bg-gradient-to-r from-red-200 to-red-600",
    },
    {
      name: "HAWAII",
      tail: "bg-gradient-to-r from-green-300 via-yellow-300 to-pink-300",
    },
    {
      name: "LAVENDER",
      tail: "bg-gradient-to-r from-indigo-300 to-purple-400",
    },
    {
      name: "WINTERGREEN",
      tail: "bg-gradient-to-r from-green-200 to-green-500",
    },
    {
      name: "HUCKLEBERRY",
      tail: "bg-gradient-to-r from-purple-200 via-purple-400 to-purple-800",
    },
    {
      name: "ARENDELLE",
      tail: "bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500",
    },
    {
      name: "SPEARMINT",
      tail: "bg-gradient-to-r from-green-200 via-green-400 to-green-500",
    },
    {
      name: "MINNESOTA",
      tail: "bg-gradient-to-r from-purple-400 to-yellow-400",
    },
    {
      name: "SONORA",
      tail: "bg-gradient-to-r from-yellow-200 to-yellow-500",
    },
    {
      name: "PARADISE",
      tail: "bg-gradient-to-r from-blue-300 via-green-200 to-yellow-300",
    },
    {
      name: "SIERRA MIST",
      tail: "bg-gradient-to-r from-yellow-200 via-green-200 to-green-300",
    },
    {
      name: "CREAMSICLE",
      tail: "bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400",
    },
    {
      name: "BOREALIS",
      tail: "bg-gradient-to-r from-green-300 to-purple-400",
    },
    {
      name: "STRAWBERRY",
      tail: "bg-gradient-to-r from-yellow-200 via-pink-200 to-pink-400",
    },
    {
      name: "FLAMINGO",
      tail: "bg-gradient-to-r from-pink-400 to-pink-600",
    },
    {
      name: "BURNING SUNRISE",
      tail: "bg-gradient-to-r from-yellow-600 to-red-600",
    },
    {
      name: "APPLE",
      tail: "bg-gradient-to-r from-green-500 to-green-700",
    },
    {
      name: "FLARE",
      tail: "bg-gradient-to-r from-yellow-600 to-yellow-500",
    },
    {
      name: "LUST",
      tail: "bg-gradient-to-r from-red-700 to-pink-600",
    },
    {
      name: "SUBLIME",
      tail: "bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500",
    },
    {
      name: "SOLID BLUE",
      tail: "bg-gradient-to-r from-blue-500 to-blue-600",
    },
    {
      name: "SKY",
      tail: "bg-gradient-to-b from-sky-400 to-sky-200",
    },
    {
      name: "HORIZON",
      tail: "bg-gradient-to-b from-orange-500 to-yellow-300",
    },
    {
      name: "MORNING",
      tail: "bg-gradient-to-r from-rose-400 to-yellow-300",
    },
    {
      name: "EARTH",
      tail: "bg-gradient-to-r from-teal-200 to-lime-200",
    },
    {
      name: "MESSENGER",
      tail: "bg-gradient-to-r from-sky-400 to-blue-500",
    },
    {
      name: "SEA",
      tail: "bg-gradient-to-r from-cyan-200 to-cyan-400",
    },
    {
      name: "PAYMENT",
      tail: "bg-gradient-to-r from-sky-400 to-cyan-300",
    },
    {
      name: "VIDEO",
      tail: "bg-gradient-to-r from-red-500 to-red-800",
    },
    {
      name: "FLOWER",
      tail: "bg-gradient-to-r from-violet-300 to-violet-400",
    },
    {
      name: "COOL SUNSET",
      tail: "bg-gradient-to-r from-yellow-300 to-rose-300",
    },
    {
      name: "PINK NEON",
      tail: "bg-gradient-to-r from-fuchsia-600 to-pink-600",
    },
    {
      name: "EMERALD",
      tail: "bg-gradient-to-r from-emerald-500 to-lime-600",
    },
    {
      name: "RELAXED ROSE",
      tail: "bg-gradient-to-r from-rose-300 to-rose-500",
    },
    {
      name: "PURPLE HAZE",
      tail: "bg-gradient-to-r from-purple-800 via-violet-900 to-purple-800",
    },
    {
      name: "SILVER",
      tail: "bg-gradient-to-r from-cool-gray-100 to-cool-gray-300",
    },
    {
      name: "yellow CORAL",
      tail: "bg-gradient-to-r from-yellow-400 to-rose-400",
    },
    {
      name: "BLUE CORAL",
      tail: "bg-gradient-to-r from-blue-400 to-emerald-400",
    },
    // {
    //   name: "HIGH TIDE",
    //   tail: "bg-conic-to-tl from-sky-500 via-yellow-200 to-yellow-600",
    // },
    // {
    //   name: "HUNNIEPOP",
    //   tail: "bg-conic-to-bl from-fuchsia-300 via-green-400 to-rose-700",
    // },
    // {
    //   name: "CORAL SUN",
    //   tail: "bg-conic-to-tl from-yellow-200 via-emerald-200 to-yellow-200",
    // },
    {
      name: "BIG SUR",
      tail: "bg-gradient-to-tr from-pink-500 to-yellow-300",
    },
  ];

  return (
    <>
      <div class="w-full bg-gray-800">
        <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
          <div class="text-center pb-12">
            <h2 class="text-base font-bold text-indigo-600">
              Gradient List
            </h2>
            <h3 class="font-bold text-2xl md:text-2xl lg:text-2xl font-heading text-white">
              Check our awesome gradient color list
            </h3>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bgColors.map((color) => (
              <div class={`w-full ${color.tail} rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row`}>
                <div class={`h-64 rounded-3xl`}>

                </div>
                <span class="mt-2 ml-2 inline-flex bg-pink-600 text-white rounded h-6 px-3 justify-center items-center text-xs font-medium lowercase">{color.name}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default GradientList;
