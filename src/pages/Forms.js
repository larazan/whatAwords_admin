import React, { useState } from "react";

import Breadcrumb from "../components/Breadcrumb";
import SubHeader from "../components/SubHeader";

import countries from "../assets/data/countries"; 

const Forms = () => {
  const [ values, setValues ] = useState({
    username: '',
    email: '',
    address: ''
  })

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value
    });
  }

  return (
    <>
      <div className="">
        <Breadcrumb currentPage="Form" />

        <SubHeader pageName="form" linkTo="add-product" />

        <div className="flex flex-wrap mb-20">
          <div className="mt-6">

            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Personal Details</p>
                  <p>Please fill out all the fields.</p>
                </div>

                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label for="email">Image / Logo</label>
                      <div className="flex items-center py-3">
                        <div className="w-20 h-20 mr-4 flex-none rounded-xl border overflow-hidden">
                          <img className="w-20 h-20 mr-4 object-cover" src="https://images.unsplash.com/photo-1611867967135-0faab97d1530?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1352&amp;q=80" alt="Avatar Upload" />
                        </div>
                        <label className="cursor-pointer ">
                          <span className="focus:outline-none text-white text-sm py-2 px-4 rounded-full bg-green-400 hover:bg-green-500 hover:shadow-lg">Browse</span>
                          <input type="file" className="hidden" />
                        </label>
                      </div>
                    </div>

                    <div className="md:col-span-5">
                      <label for="full_name">Full Name</label>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 border-red-500"
                        value={values.username}
                        onChange={handleChange}
                      />
                      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        Invalid username field !
                      </span>
                    </div>

                    <div className="md:col-span-5">
                      <label for="email">Email Address</label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={values.email}
                        onChange={handleChange}
                        placeholder="email@domain.com"
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label for="address">Address / Street</label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value=""
                        placeholder=""
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label for="city">City</label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value=""
                        placeholder=""
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label for="country">Country / region</label>
                      <div className="h-10 relative bg-gray-50 flex2 border border-gray-200 rounded items-center mt-1">
                        <button
                          type="button"
                          className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          aria-haspopup="listbox"
                          aria-expanded="true"
                          aria-labelledby="listbox-label"
                          onClick=""
                        >
                          <span className="block truncate flex items-center">Italia</span>
                          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <svg
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
                          <div className="sticky top-0 z-10 bg-white">
                            <li className=" text-gray-900 cursor-default select-none relative py-2 px-3">
                              <input type="search" name="serch" placeholder="Search something..." className="bg-white focus:ring-blue-500 focus:border-blue-500 h-10 w-full px-5 rounded-lg border text-sm focus:outline-none" />
                              {/* <input type="search" name="search" autocomplete="off" className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Search a country" /> */}
                            </li>
                            <hr />
                          </div>

                          <div
                            className={
                              'max-h-64 scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-600 scrollbar-thumb-rounded'
                            }
                          >
                            <li className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9">
                              No data found
                            </li>
                            
                            <li
                              key=""
                              className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 flex items-center hover:bg-gray-50 transition"
                              id="listbox-option-0"
                              role="option"
                              onClick=""
                            >
                              <span className="font-normal truncate">title</span>
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
                            </li>
                            <li
                              key=""
                              className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 flex items-center hover:bg-gray-50 transition"
                              id="listbox-option-0"
                              role="option"
                              onClick=""
                            >
                              <span className="font-normal truncate">title</span>
                              
                            </li>
                            <li
                              key=""
                              className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 flex items-center hover:bg-gray-50 transition"
                              id="listbox-option-0"
                              role="option"
                              onClick=""
                            >
                              <span className="font-normal truncate">title</span>
                              
                            </li>
                            <li
                              key=""
                              className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 flex items-center hover:bg-gray-50 transition"
                              id="listbox-option-0"
                              role="option"
                              onClick=""
                            >
                              <span className="font-normal truncate">title</span>
                              
                            </li>
                            <li
                              key=""
                              className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 flex items-center hover:bg-gray-50 transition"
                              id="listbox-option-0"
                              role="option"
                              onClick=""
                            >
                              <span className="font-normal truncate">title</span>
                              
                            </li>
                          </div>

                        </ul>
                        
                      </div>
                    </div>

                    <div className="md:col-span-2">
                    

                      <label for="state">State / province</label>
                      <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        
                        <select className="w-full bg-gray-50 px-3 py-2 outline-none">
                            <option className="py-1">Option 1</option>
                            <option className="py-1">Option 2</option>
                            <option className="py-1">Option 3</option>
                        </select>
                        
                      </div>
                    </div>

                    <div className="md:col-span-1">
                      <label for="zipcode">Zipcode</label>
                      <input
                        type="text"
                        name="zipcode"
                        id="zipcode"
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder=""
                        value=""
                      />
                    </div>

                    <div className="md:col-span-5">
                      <div className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="billing_same"
                          id="billing_same"
                          className="form-checkbox"
                        />
                        <label for="billing_same" className="ml-2">
                          My billing address is different than above.
                        </label>
                      </div>
                    </div>

                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </>
  );
};

export default Forms;
