import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from 'axios'
import { getWord, updateWord } from "../actions/words_actions";
import { getAuthors } from "../actions/authors_actions";
import { getCategories } from "../actions/category_actions";
import { WORD_UPDATE_RESET } from "../actions/types";

import Breadcrumb from "../components/Breadcrumb";
import SubHeader from "../components/SubHeader";

const QuoteEdit = ({ match }) => {
  const history = useHistory();
  const initialValues = {
    _id: "",
    words: "",
    file: [],
    author: "",
    category: "",
    createdBy: "",
    status: "",
    tags: {},
    size: "",
    style: "",
    color: "",
    weight: "",
    bgColor: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

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

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getAuthors());
    dispatch(getWord(match.params.id));
    window.scrollTo(0, 0);
  }, [dispatch, match]);

  console.log(word);

  const wordUpdate = useSelector((state) => state.wordUpdate);
  const { 
    loading:loadingUpdate, 
    error:errorUpdate, 
    success:successUpdate   
  } = wordUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: WORD_UPDATE_RESET })
      history.push('/admin/quotes')
    } else {
      setFormValues(word)
    }
  }, [dispatch, history, word, successUpdate, setFormValues])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);

    const {
      _id,
      words,
      file,
      author,
      category,
      createdBy,
      status,
      tags,
      size,
      style,
      color,
      weight,
      bgColor,
    } = formValues;

    dispatch(updateWord({
      _id,
      words,
      file,
      author,
      category,
      createdBy,
      status,
      tags,
      size,
      style,
      color,
      weight,
      bgColor, 
    }));
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;

    if (!values.words) {
      errors.words = "qoute is required!";
    }
    if (!values.status) {
      errors.status = "status is required!";
    }

    return errors;
  };

  return (
    <>
      <div>
        <Breadcrumb currentPage="add quote" />
        <SubHeader pageName="quote" linkTo="" />

        <div className="mt-6 sm:mt-4">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Edit Quote
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  This information will be displayed publicly so be careful what
                  you share.
                </p>
                <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form onSubmit={handleSubmit}>
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="category"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Category
                        </label>
                        <select
                          name="category"
                          className="mt-1 block h-10 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          value={formValues.category}
                          onChange={handleChange}
                        >
                          <option>-- Please select --</option>
                          <option value="">1</option>
                          <option value="">2</option>
                        </select>
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          {formErrors.category}
                        </span>
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="words"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Quote
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="words"
                            name="words"
                            rows={4}
                            className="w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 px-3 py-2 sm:text-sm border border-gray-300 rounded-md"
                            value={formValues.words}
                            onChange={handleChange}
                          />
                        </div>
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          {formErrors.words}
                        </span>
                      </div>

                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label
                          htmlFor="style"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Font Family
                        </label>
                        <select
                          name="style"
                          className="mt-1 block h-10 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          value={formValues.style}
                          onChange={handleChange}
                        >
                          <option>-- Please select --</option>
                          <option value="">1</option>
                          <option value="">2</option>
                        </select>
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          {formErrors.style}
                        </span>
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label
                          htmlFor="size"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Font Size
                        </label>
                        <input
                          type="number"
                          name="size"
                          className="h-10 border mt-1 rounded flex-1 px-4 w-full sm:text-sm border-gray-300"
                          value={formValues.size}
                          onChange={handleChange}
                        />
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          {formErrors.size}
                        </span>
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
                          className="h-10 border mt-1 rounded flex-1 px-4 w-full sm:text-sm border-gray-300"
                          value={""}
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="weight"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Font Weight
                        </label>
                        <select
                          name="weight"
                          className="mt-1 block h-10 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          value={formValues.weight}
                          onChange={handleChange}
                        >
                          <option value="">1</option>
                          <option value="">2</option>
                        </select>
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          {formErrors.weight}
                        </span>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="bgColor"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Background Color
                        </label>
                        <select
                          name="bgColor"
                          className="mt-1 block h-10 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          value={formValues.bgColor}
                          onChange={handleChange}
                        >
                          <option value="">1</option>
                          <option value="">2</option>
                        </select>
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          {formErrors.bgColor}
                        </span>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="author"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Author
                        </label>
                        <select
                          name="author"
                          className="mt-1 block h-10 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          value={formValues.author}
                          onChange={handleChange}
                        >
                          <option value="">1</option>
                          <option value="">2</option>
                        </select>
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          {formErrors.author}
                        </span>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="tags"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Tags
                        </label>
                        <input
                          type="text"
                          name="tags"
                          className="h-10 border mt-1 rounded flex-1 px-4 w-full sm:text-sm border-gray-300"
                          value={formValues.tags}
                          onChange={handleChange}
                        />
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          {formErrors.tags}
                        </span>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="status"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Status
                        </label>
                        <select
                          id="status"
                          name="status"
                          className="mt-1 block h-10 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="">Active</option>
                          <option value="">Inactive</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-6 sm:mt-4">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Add Audio
                </h3>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form onSubmit={handleSubmit}>
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="category"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Category
                        </label>
                        <select
                          id="category"
                          name="category"
                          className="mt-1 block h-10 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          value={formValues.category}
                          onChange={handleChange}
                        >
                          <option value="">1</option>
                          <option value="">2</option>
                        </select>
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          {formErrors.category}
                        </span>
                      </div>

                      <div className="col-span-6">
                        <label className="block text-sm font-medium text-gray-700">
                          File
                        </label>
                        <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                              >
                                <span>Upload a file</span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  className="sr-only"
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, GIF up to 10MB
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="author"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Author
                        </label>
                        <select
                          id="author"
                          name="author"
                          className="mt-1 block h-10 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          value={formValues.author}
                          onChange={handleChange}
                        >
                          <option value="">1</option>
                          <option value="">2</option>
                        </select>
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          {formErrors.author}
                        </span>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="createdBy"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Creator
                        </label>
                        <input
                          id="createdBy"
                          type="text"
                          name="createdBy"
                          className="h-10 border mt-1 rounded flex-1 px-4 w-full sm:text-sm border-gray-300"
                          value={""}
                        />
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          {formErrors.createdBy}
                        </span>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="tags"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Tags
                        </label>
                        <input
                          id="tags"
                          type="text"
                          name="tags"
                          className="h-10 border mt-1 rounded flex-1 px-4 w-full sm:text-sm border-gray-300"
                          value={formValues.tags}
                          onChange={handleChange}
                        />
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          {formErrors.tags}
                        </span>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="status"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Status
                        </label>
                        <select
                          id="status"
                          name="status"
                          className="mt-1 block h-10 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="">Active</option>
                          <option value="">Inactive</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save
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

export default QuoteEdit;
