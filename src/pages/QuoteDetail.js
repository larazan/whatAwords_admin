import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getWord } from "../actions/words_actions";

import Breadcrumb from "../components/Breadcrumb";
import SubHeader from "../components/SubHeader";

const QuoteDetail = ({ match }) => {
  const history = useHistory();
  
  const wordList = useSelector((state) => state.wordList);
  const dispatch = useDispatch();
  const {
    loading,
    error,
    word,
    authorName,
    createdBy,
    tagsList,
    bgColor,
    fontFamily,
    creatorId,
    likeTot,
    likes,
    followersTot,
    followers,
    collects,
  } = wordList;

  const wordLike = useSelector((state) => state.wordLike);

  useEffect(() => {
    dispatch(getWord(match.params.id));
    window.scrollTo(0, 0);
  }, [dispatch, match]);

  console.log(word);

  return (
    <>
      <div>
        <Breadcrumb currentPage="quote" />
        <SubHeader pageName="quote" linkTo="add-quote" />

        <div className="mt-6 sm:mt-4">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Quote Detail
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  This information will be displayed publicly so be careful what
                  you share.
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form action="#" method="POST">
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          ID
                        </label>
                        <input
                          type="text"
                          name="first-name"
                          className="h-10 border mt-1 rounded text-sm flex-1 px-4 w-full border-gray-300 focus:outline-none bg-gray-50"
                          value={word._id}
                          readOnly
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Slug
                        </label>
                        <input
                          type="text"
                          name="last-name"
                          className="h-10 border mt-1 rounded text-sm flex-1 px-4 w-full border-gray-300 focus:outline-none bg-gray-50"
                          value={word.slug}
                          readOnly
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="email-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Category
                        </label>
                        <input
                          type="text"
                          name="email-address"
                          className="h-10 border mt-1 rounded text-sm flex-1 px-4 w-full border-gray-300 focus:outline-none bg-gray-50"
                          value={word.category}
                          readOnly
                        />
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="about"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Quote
                        </label>
                        <div className="mt-1">
                          <textarea
                            name="about"
                            rows={4}
                            className="w-full shadow-sm mt-1 px-3 py-2 sm:text-sm border border-gray-300 rounded-md focus:outline-none bg-gray-50"
                            value={word.words}
                            readOnly
                          />
                        </div>
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="street-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          File
                        </label>
                        <input
                          type="text"
                          name="street-address"
                          className="w-full shadow-sm mt-1 px-3 py-2 sm:text-sm border border-gray-300 rounded-md focus:outline-none bg-gray-50"
                          value={word.file}
                          readOnly
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Font Family
                        </label>
                        <input
                          type="text"
                          name="city"
                          className="w-full shadow-sm mt-1 px-3 py-2 sm:text-sm border border-gray-300 rounded-md focus:outline-none bg-gray-50"
                          value={fontFamily}
                          readOnly
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label
                          htmlFor="region"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Font Size
                        </label>
                        <input
                          type="text"
                          name="region"
                          className="w-full shadow-sm mt-1 px-3 py-2 sm:text-sm border border-gray-300 rounded-md focus:outline-none bg-gray-50"
                          value={fontFamily}
                          readOnly
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label
                          htmlFor="postal-code"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Font Color
                        </label>
                        <input
                          type="text"
                          name="postal-code"
                          className="w-full shadow-sm mt-1 px-3 py-2 sm:text-sm border border-gray-300 rounded-md focus:outline-none bg-gray-50"
                          value={fontFamily}
                          readOnly
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Font Weight
                        </label>
                        <input
                          type="text"
                          name="first-name"
                          className="h-10 border mt-1 rounded text-sm flex-1 px-4 w-full border-gray-300 focus:outline-none bg-gray-50"
                          value={fontFamily}
                          readOnly
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Background Color
                        </label>
                        <input
                          type="text"
                          name="last-name"
                          className="h-10 border mt-1 rounded text-sm flex-1 px-4 w-full border-gray-300 focus:outline-none bg-gray-50"
                          value={bgColor}
                          readOnly
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Author
                        </label>
                        <input
                          type="text"
                          name="first-name"
                          className="h-10 border mt-1 rounded text-sm flex-1 px-4 w-full border-gray-300 focus:outline-none bg-gray-50"
                          value={authorName}
                          readOnly
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Creator
                        </label>
                        <input
                          type="text"
                          name="last-name"
                          className="h-10 border mt-1 rounded text-sm flex-1 px-4 w-full border-gray-300 focus:outline-none bg-gray-50"
                          value={createdBy}
                          readOnly
                        />
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="street-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Tags
                        </label>
                        <input
                          type="text"
                          name="street-address"
                          className="w-full shadow-sm mt-1 px-3 py-2 sm:text-sm border border-gray-300 rounded-md focus:outline-none bg-gray-50"
                          value={word.tags}
                          readOnly
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Views
                        </label>
                        <input
                          type="text"
                          name="city"
                          className="w-full shadow-sm mt-1 px-3 py-2 sm:text-sm border border-gray-300 rounded-md focus:outline-none bg-gray-50"
                          value={word.views}
                          readOnly
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label
                          htmlFor="region"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Downloads
                        </label>
                        <input
                          type="text"
                          name="region"
                          className="w-full shadow-sm mt-1 px-3 py-2 sm:text-sm border border-gray-300 rounded-md focus:outline-none bg-gray-50"
                          value={word.download}
                          readOnly
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label
                          htmlFor="postal-code"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Likes
                        </label>
                        <input
                          type="text"
                          name="postal-code"
                          className="w-full shadow-sm mt-1 px-3 py-2 sm:text-sm border border-gray-300 rounded-md focus:outline-none bg-gray-50"
                          value={likeTot}
                          readOnly
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Status
                        </label>
                        <select
                          id="country"
                          name="country"
                          autoComplete="country-name"
                          className="mt-1 block h-10 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="">Active</option>
                          <option value="">Inactive</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right space-x-4 sm:px-6">
                  <button
                    type="button"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                    onClick={() => history.goBack()}
                  >
                    Back
                  </button>
                </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuoteDetail;
