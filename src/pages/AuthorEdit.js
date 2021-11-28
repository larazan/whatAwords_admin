import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from 'axios'
import { updateAuthor, getDetailAuthor } from "../actions/authors_actions";
import { AUTHOR_UPDATE_RESET } from "../actions/types";

import Breadcrumb from "../components/Breadcrumb";
import SubHeader from "../components/SubHeader";
import Loading from "../components/Loading";

const AuthorEdit = ({ match }) => {
  const [images, setImages] = useState(false)
  const [loading, setLoading] = useState(false)
  const history = useHistory();
  const initialValues = { _id: "", name: "", bio: "", file: "", status: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const dispatch = useDispatch();

  const authorDetail = useSelector((state) => state.authorDetail);
  const { loading:loadingDetail, error, author } = authorDetail;

  useEffect(() => {
    dispatch(getDetailAuthor(match.params.id));
  }, [dispatch, match]);

  console.log(author);

  const authorUpdate = useSelector((state) => state.authorUpdate);
  const { 
    loading:loadingUpdate, 
    error:errorUpdate, 
    success:successUpdate   
  } = authorUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: AUTHOR_UPDATE_RESET })
      history.push('/admin/authors')
    } else {
      setFormValues(author)
    }
  }, [dispatch, history, author, successUpdate, setFormValues])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    
    const { _id, name, bio, file, status } = formValues;

    dispatch(updateAuthor({ _id, name, bio, file, status }));
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
        console.log(formValues);
    }
  }, [formErrors])

  const validate = (values) => {
    const errors = {}
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
  
    if (!values.name) {
      errors.name = "name is required!";
    }
    if (!values.status) {
      errors.status = "status is required!";
    }
    if (!values.bio) {
      errors.bio = "bio is required!";
    }

    return errors;
  }

  const handleUpload = async e =>{
    e.preventDefault()
    try {
        const file = e.target.files[0]
        
        if(!file) return alert("File not exist.")

        if(file.size > 5024 * 5024) // 1mb
            return alert("Size too large!")

        if(file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/svg+xml') // 1mb
            return alert("File format is incorrect.")

        let formData = new FormData()
        formData.append('file', file)

        setLoading(true)
        const res = await axios.post('/api/upload', formData, {
            headers: {'content-type': 'multipart/form-data'}
        })
        setLoading(false)
        setImages(res.data)

    } catch (err) {
        alert(err.response.data.msg)
    }
}

const handleDestroy = async () => {
  try {
      setLoading(true)
      await axios.post('/api/destroy', {public_id: images.public_id})
      setLoading(false)
      setImages(false)
  } catch (err) {
      alert(err.response.data.msg)
  }
}

    return (
        <>
            <div>
        <Breadcrumb currentPage="add author" />
        <SubHeader pageName="author" linkTo="" />

        <div className="mt-6 sm:mt-4 md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Edit Author
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
               <div class="flex bg-green-100 rounded-lg p-4 mb-4 text-sm text-green-700" role="alert">
                <svg class="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                <div>
                    <span class="font-medium">Success alert!</span> Successfully Submit data.
                </div>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">

                <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="image"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Image
                      </label>
                      
                        <div className="flex items-center py-3">
                          <div className="w-20 h-20 mr-4 flex-none rounded-xl border overflow-hidden">
                            <img
                              className="w-20 h-20 mr-4 object-cover"
                              src="https://images.unsplash.com/photo-1611867967135-0faab97d1530?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1352&amp;q=80"
                              alt="Avatar Upload"
                            />
                          </div>
                        
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="h-10 border mt-1 rounded flex-1 px-4 w-full sm:text-sm border-gray-300"
                          placeholder="Enter author name"
                          value={ formValues.name }
                          onChange={handleChange}
                        />
                      </div>
                      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                      { formErrors.name }
                    </span>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="bio"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Bio
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="bio"
                        name="bio"
                        rows={4}
                        className="w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 px-3 py-2 sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Enter bio author"
                        value={ formValues.bio }
                        onChange={handleChange}
                      />
                    </div>
                    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                      { formErrors.bio }
                    </span>
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
                        <input type="file" name="file" id="file_up" onChange={handleUpload}/>
                        {
                            loading ? <div id="file_img"><Loading /></div>

                            :<div id="file_img" className={`${images ? 'block' : 'hidden'}`}>
                                <img src={images ? images.url : ''} alt=""/>
                                <span onClick={handleDestroy}>X</span>
                            </div>
                        }
                                        
                        </div>
                      </div>
                      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                      { formErrors.file }
                    </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Photo
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

                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="status"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Status
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <select
                        id="status"
                          name="status"
                          className="mt-1 block h-10 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          value={ formValues.status }
                          onChange={handleChange}
                        >
                          <option>-- Please select --</option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                      { formErrors.status }
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
            </form>
          </div>
        </div>
      </div>
        </>
    )
}

export default AuthorEdit
