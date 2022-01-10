import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { createWord } from "../actions/words_actions";
import { getAuthors } from "../actions/authors_actions";
import { getCategories } from "../actions/category_actions";
import { QUOTE_CREATE_RESET } from "../actions/types";

import Breadcrumb from "../components/Breadcrumb";
import SubHeader from "../components/SubHeader";
import TagsInput from "../components/TagsInput";
import Loading from "../components/Loading";
import CustomSelect from "../components/Form/CustomSelect";

import { fontFamily } from "../assets/data/fontFamily";
import { gradients } from "../assets/data/gradients";

const QuoteAdd = () => {
  const [toggle, setToggle] = useState(true);
  const [isFormQuoteVisible, setIsFormQuoteVisible] = useState(true);
  const [title, setTitle] = useState("Quote");
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const initialValues = {
    words: "",
    file: [],
    author: "",
    category: "",
    createdBy: "",
    status: "",
    publish: true,
    tags: "",
    size: "",
    style: "",
    color: "",
    weight: "",
    bgColor: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [tags, setTags] = useState([]);
  const [errors, setErrors] = useState({});

  const changeHandler = (name, value) => {
    if (name === "tags") {
      setTags(value);
      if (value.length > 0 && errors.tags) {
        setErrors((prev) => {
          const prevErrors = { ...prev };
          delete prevErrors.tags;
          return prevErrors;
        });
      }
    }
  };

  const dispatch = useDispatch();

  const wordCreate = useSelector((state) => state.wordCreate);
  const { loading: loadingCreate, error, word } = wordCreate;

  const categoriesList = useSelector((state) => state.categoriesList);
  const {
    loading: loadingCategory,
    error: errorCategory,
    categories,
  } = categoriesList;

  const authorsList = useSelector((state) => state.authorsList);
  const { loading: loadingAuthor, error: errorAuthor, authors } = authorsList;

  const bold = [
    "thin",
    "extralight",
    "light",
    "normal",
    "medium",
    "semibold",
    "bold",
    "extrabold",
    "black",
  ];

  const fontColor = [
    "white",
    "black"
  ];

  const hue = [
    {
      name: "Blue",
      color: "#49607c",
    },
    {
      name: "Black",
      color: "#3b3b3b",
    },
    {
      name: "Red",
      color: "#b14754",
    },
    {
      name: "Pink",
      color: "#dfabb5",
    },
    {
      name: "Brown",
      color: "#bd9474",
    },
    {
      name: "Yellow",
      color: "#ead99a",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);

    const {
      words,
      file,
      author,
      category,
      createdBy,
      status,
      publish,
      tags,
      size,
      style,
      color,
      weight,
      bgColor,
    } = formValues;

    dispatch(
      createWord({
        words,
        file,
        author,
        category,
        createdBy,
        status,
        publish,
        tags,
        size,
        style,
        color,
        weight,
        bgColor,
      })
    );
  };

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getAuthors());

    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  console.log(authors);
  console.log(categories);

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

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];

      if (!file) return alert("File not exist.");

      if (file.size > 5024 * 5024)
        // 1mb
        return alert("Size too large!");

      if (
        file.type !== "image/jpeg" &&
        file.type !== "image/png" &&
        file.type !== "image/svg+xml"
      )
        // 1mb
        return alert("File format is incorrect.");

      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      const res = await axios.post("/api/upload", formData, {
        headers: { "content-type": "multipart/form-data" },
      });
      setLoading(false);
      setImages(res.data);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleDestroy = async () => {
    try {
      setLoading(true);
      await axios.post("/api/destroy", { public_id: images.public_id });
      setLoading(false);
      setImages(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const switchHandler = () => {
    setToggle(!toggle);
    setIsFormQuoteVisible(!isFormQuoteVisible);
    setTitle("Audio");
  };

  const toggleClass = " transform translate-x-5";

  const showOptions = (data) => {
    let option = null;
    if (data) {
      option = data.map(data => (
        <option 
            key={data._id} 
            value={data._id} 
            className="py-1 capitalize"
        >
            {data.name}
        </option>
    ))
    }

    return option;
  }

  const fontOptions = (data) => {
    let option = data.map(we => (
      <option value={we} className={`py-1 capitalize font-${we} bg-${we}-300`}>{we}</option>
    ))

    return option;
  }

  const fontFamilyOptions = (data) => {
    let option = data.map(we => (
      <option value={we} className={`py-2 text-lg `} style={{ fontFamily: `${we}` }}>{we}</option>
    ))

    return option;
  }

  return (
    <div>
      <Breadcrumb currentPage="add quote" />
      <SubHeader pageName="quote" linkTo="" />
      <div className="mt-6 sm:mt-4">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Add Quote
              </h3>

              <div class="mt-2 flex w-full mb-2">
                <label for="toggleB" class="flex items-center cursor-pointer">
                  <div class="relative">
                    <input
                      type="checkbox"
                      id="toggleB"
                      class="sr-only"
                      onClick={switchHandler}
                    />
                    <div class="block bg-gray-600 w-14 h-8 rounded-full"></div>
                    <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                  </div>
                  <div class="ml-3 text-gray-700 font-medium">Toggle Me!</div>
                </label>
              </div>
              <p className="mt-1 text-sm text-gray-600">
                This information will be displayed publicly so be careful what
                you share.
              </p>

              <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmit}>
      {isFormQuoteVisible ? (
       
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
                        <option value="">-- Please select --</option>
                        {showOptions(categories)}
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

                    <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                      <label
                        htmlFor="style"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Font Family
                      </label>
                      <select
                        id="style"
                        name="style"
                        className="mt-1 block h-10 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={formValues.style}
                        onChange={handleChange}
                      >
                        <option value="">-- Please Select --</option>
                        {fontFamilyOptions(fontFamily)}
                      </select>
                      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        {formErrors.style}
                      </span>
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                      <label
                        htmlFor="size"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Font Size
                      </label>
                      <input
                        id="size"
                        type="number"
                        name="size"
                        min="12"
                        max="18"
                        className="h-10 border mt-1 rounded flex-1 px-4 w-full sm:text-sm border-gray-300"
                        value={formValues.size}
                        onChange={handleChange}
                      />
                      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        {formErrors.size}
                      </span>
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                      <label
                        htmlFor="color"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Font Color
                      </label>
                      <select
                        id="weight"
                        name="weight"
                        className="mt-1 block h-10 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={formValues.color}
                        onChange={handleChange}
                      >
                        <option value="">-- Please select --</option>
                        {fontOptions(fontColor)}
                      </select>
                      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        {formErrors.color}
                      </span>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="weight"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Font Weight
                      </label>
                      <select
                        id="weight"
                        name="weight"
                        className="mt-1 block h-10 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={formValues.weight}
                        onChange={handleChange}
                      >
                        <option value="">-- Please select --</option>
                        {fontOptions(bold)}
                      </select>
                      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        {formErrors.weight}
                      </span>
                    </div>

                    <div className="col-span-6 sm:col-span-6">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Background Color
                      </label>
                  
                      <div className="flex flex-wrap space-x-1">
                        {gradients.map((color) => (
                          <div className="flex inline py-2">
                            <button className="h-8 w-8 flex flex-col border border-gray-300 rounded-full overflow-hidden focus:ring-2 focus:ring-offset-1 focus:ring-gray-900 focus:outline-none">
                              <span className="h-full w-full flex flex-col transform">
                                <span
                                  className={`h-8 w-8 ${color.tail}`}
                                ></span>
                              </span>
                            </button>
                          </div>
                        ))}
                      </div>
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
                        htmlFor="tags"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Tags
                      </label>
                      <TagsInput
                        label="Tags"
                        id="tags"
                        name="tags"
                        placeholder="Add tag"
                        onChange={changeHandler}
                        error={errors.tags}
                        defaultTags={tags}
                      />
                      {/* <input
                        type="text"
                        name="tags"
                        id="tags"
                        className="h-10 border mt-1 rounded flex-1 px-4 w-full sm:text-sm border-gray-300"
                        value={formValues.tags}
                        onChange={handleChange}
                      /> */}
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
                        value={formValues.status}
                        onChange={handleChange}
                      >
                        <option>-- Please select --</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        {formErrors.status}
                      </span>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="publish"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Publish
                      </label>
                      <select
                        id="status"
                        name="publish"
                        className="mt-1 block h-10 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={formValues.publish}
                        onChange={handleChange}
                      >
                        <option>-- Please select --</option>
                        <option value={true}>Publish</option>
                        <option value={false}>Unpublish</option>
                      </select>
                      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        {formErrors.publish}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right space-x-4 sm:px-6">
                  <button
                    type="button"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                    onClick={() => history.goBack()}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </div>
           

      ) : (
       
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
                <div className="px-4 py-3 bg-gray-50 text-right space-x-4 sm:px-6">
                  <button
                    type="button"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                    onClick={() => history.goBack()}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </div>
           
      )}
       </form>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default QuoteAdd;
