import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { createArticle } from "../actions/articles_actions";
import { ARTICLE_CREATE_RESET } from "../actions/types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

import Breadcrumb from "../components/Breadcrumb";
import SubHeader from "../components/SubHeader";
import Loading from "../components/Loading";

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const ArticleAdd = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const initialValues = {
    title: "",
    markdown: "",
    image: "",
    date: "",
    status: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [convertedContent, setConvertedContent] = useState(null);
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );

  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
    // setConvertedContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  }

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  }
  const createMarkup = (html) => {
    return  {
      __html: DOMPurify.sanitize(html)
    }
  }

  const dispatch = useDispatch();

  const articleCreate = useSelector((state) => state.articleCreate);
  const { loading: loadingCreate, error, success, article } = articleCreate;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);

    const { title, markdown, image, date, status } = formValues;

    dispatch(createArticle({ title, markdown, image, date, status }));
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

    if (!values.title) {
      errors.title = "title is required!";
    }
    if (!values.status) {
      errors.status = "status is required!";
    }
    if (!values.markdown) {
      errors.markdown = "markdown is required!";
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

  return (
    <>
      <div>
        <Breadcrumb currentPage="add article" />
        <SubHeader pageName="article" linkTo="" />

        <div className="mt-6 sm:mt-4 md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Add Article
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                This information will be displayed publicly so be careful what
                you share.
              </p>
              <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            {Object.keys(formErrors).length === 0 && isSubmit && (
              <div
                class="flex bg-green-100 rounded-lg p-4 mb-4 text-sm text-green-700"
                role="alert"
              >
                <svg
                  class="w-5 h-5 inline mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <div>
                  <span class="font-medium">Success alert!</span> Successfully
                  Submit data.
                </div>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="company-website"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Title
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="title"
                          className="h-10 border mt-1 rounded flex-1 px-4 w-full sm:text-sm border-gray-300"
                          placeholder="Enter title"
                          value={formValues.title}
                          onChange={handleChange}
                        />
                      </div>
                      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        {formErrors.title}
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="company-website"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Image
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <div className="upload">
                          <input
                            type="file"
                            name="image"
                            id="file_up"
                            onChange={handleUpload}
                          />
                          {loading ? (
                            <div id="file_img">
                              <Loading />
                            </div>
                          ) : (
                            <div
                              id="file_img"
                              className={`${images ? "block" : "hidden"}`}
                            >
                              <img src={images ? images.url : ""} alt="" />
                              <span onClick={handleDestroy}>X</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        {formErrors.file}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Markdown
                    </label>
                    <div className="mt-1">
                      <Editor
                        editorState={editorState}
                        wrapperClassName="wrapper-class"
                        editorClassName="editor-class"
                        onEditorStateChange={handleEditorChange}
                        // onEditorStateChange={formValues.markdown}
                        // onEditorStateChange={newState => {
                        //     setEditorState(newState);
                        //     setContent(draftToHtml(convertToRaw(newState.getCurrentContent())));
                        // }}
                        toolbar={{
                          options: [
                            "inline",
                            "blockType",
                            "fontSize",
                            "list",
                            "textAlign",
                            "history",
                            "embedded",
                            "emoji",
                            "image",
                          ],
                          inline: { inDropdown: true },
                          list: { inDropdown: true },
                          textAlign: { inDropdown: true },
                          link: { inDropdown: true },
                          history: { inDropdown: true },
                        }}
                      />
                      
                    </div>
                    <div className="preview" dangerouslySetInnerHTML={createMarkup(convertedContent)}></div>
                    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                      {formErrors.markdown}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="company-website"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Date
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                        />
                      </div>
                      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        {formErrors.date}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="company-website"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Status
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <select
                          name="status"
                          className="mt-1 block h-10 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          value={formValues.status}
                          onChange={handleChange}
                        >
                          <option>-- Please select --</option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        {formErrors.status}
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
                    onSubmit={handleSubmit}
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleAdd;
