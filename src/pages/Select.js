import React, { useEffect, useState } from "react";

import Breadcrumb from "../components/Breadcrumb";
import SubHeader from "../components/SubHeader";

import { countries } from "../assets/data/countries";

const Select = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Default this to a country's code to preselect it
  const [country, setCountry] = useState("BE");
  const [query, setQuery] = useState("");

  return (
    <>
      <div className="">
        <Breadcrumb currentPage="Select" />

        <SubHeader pageName="select" linkTo="" />

        <div className="flex flex-wrap mb-20">
          <div className="mt-10 flex flex-col justify-center items-center">
            <div className="w-96 px-5 mt-auto">
              <label class="block text-sm font-medium text-gray-700">
                Select a country
              </label>
              <div>
                <div className="mt-1 relative">
                  <button
                    type="button"
                    className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    aria-haspopup="listbox"
                    aria-expanded="true"
                    aria-labelledby="listbox-label"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <span className="block truncate flex items-center">
                      {
                        countries.find((option) => option.value === country)
                          .title
                      }
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg
                        animate={`${isOpen ? 'rotate: 90deg' : 'rotate: 0deg'}`}
                        className="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </button>
                {isOpen && (
                  <ul
                    //  initial={{opacity: 0}}
                    //  animate={{opacity: 1}}
                    //  exit={{opacity: 0}}
                    //  transition={{duration: 0.1}}
                    className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-80 rounded-md text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                    tabIndex="-1"
                    role="listbox"
                    aria-labelledby="listbox-label"
                    aria-activedescendant="listbox-option-3"
                  >
                    <div class="sticky top-0 z-10 bg-white">
                      <li class=" text-gray-900 cursor-default select-none relative py-2 px-3">
                        <input
                          type="search"
                          name="serch"
                          placeholder="Search something..."
                          class="bg-white focus:ring-blue-500 focus:border-blue-500 h-10 w-full px-5 rounded-lg border text-sm focus:outline-none"
                          onChange={(e) => setQuery(e.target.value)}
                        />
                        {/* <input type="search" name="search" autocomplete="off" class="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Search a country" /> */}
                      </li>
                      <hr />
                    </div>

                    <div className="max-h-64 scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-600 scrollbar-thumb-rounded">
                      {countries.filter((country) =>
                        country.title.toLowerCase().startsWith(query.toLowerCase())
                      ).length === 0 ? (
                        <li className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9">
                          No data found
                        </li>
                      ) : (
                        countries
                          .filter((country) => country.title.toLowerCase().startsWith(query.toLowerCase()))
                          .map((value, index) => {
                            return (
                              <li
                                key={`${index}`}
                                className="text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9 flex items-center hover:bg-gray-50 transition"
                                id="listbox-option-0"
                                role="option"
                                onClick={() => {
                                    setCountry(value.value);
                                    setQuery('');
                                    setIsOpen(!isOpen);
                                }}
                              >
                                <span className="font-normal truncate">
                                  {value.title}
                                </span>
                                {value.value ===
                                countries.find(
                                  (option) => option.value === country
                                ).value ? (
                                  <span className="text-blue-600 absolute inset-y-0 right-0 flex items-center pr-8">
                                    <svg
                                      className="h-5 w-5"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                      aria-hidden="true"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </span>
                                ) : null}
                              </li>
                            );
                          })
                      )}
                    </div>
                  </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Select;
