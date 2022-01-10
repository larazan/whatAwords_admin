import React from "react";

import { gradients } from "../../assets/data/gradients"

const GradientList = () => {

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
            {gradients.map((color) => (
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
