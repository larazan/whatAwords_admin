import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateFaq, getDetailFaq } from "../actions/faq_actions";
import { FAQ_UPDATE_RESET } from '../actions/types';

import Breadcrumb from "../components/Breadcrumb";
import SubHeader from "../components/SubHeader";
import Loading from "../components/Loading";

const FaqEdit = ({ match }) => {
    const history = useHistory();
  const initialValues = { question: "", answer: "", status: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const dispatch = useDispatch();

  const faqDetail = useSelector((state) => state.faqDetail);
  const { loading, error, faq } = faqDetail;

  useEffect(() => {
    dispatch(getDetailFaq(match.params.id));
  }, [dispatch, match]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const faqUpdate = useSelector((state) => state.faqUpdate);
  const { 
    loading:loadingUpdate, 
    error:errorUpdate, 
    success:successUpdate   
  } = faqUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: FAQ_UPDATE_RESET })
      history.push('/admin/faqs')
    } else {
      setFormValues(faq)
    }
  }, [dispatch, history, faq, successUpdate, setFormValues])


  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);

    const { _id, question, answer, status } = formValues;

    dispatch(updateFaq({ _id, question, answer, status }));
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

    if (!values.question) {
      errors.question = "question is required!";
    }
    if (!values.status) {
      errors.status = "status is required!";
    }
    if (!values.answer) {
      errors.answer = "answer is required!";
    }

    return errors;
  };
    return (
        <>
            <div>
        <Breadcrumb currentPage="add author" />
        <SubHeader pageName="author" linkTo="" />

        <div className="mt-6 sm:mt-4 md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Add Faq
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
                  <div>
                    <label
                      htmlFor="question"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Question
                    </label>
                    <div className="mt-1">
                      <textarea
                        name="question"
                        rows={4}
                        className="w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 px-3 py-2 sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Enter bio author"
                        value={formValues.question}
                        onChange={handleChange}
                      />
                    </div>
                    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                      {formErrors.question}
                    </span>
                  </div>

                  <div>
                    <label
                      htmlFor="answer"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Answer
                    </label>
                    <div className="mt-1">
                      <textarea
                        name="answer"
                        rows={4}
                        className="w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 px-3 py-2 sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Enter bio author"
                        value={formValues.answer}
                        onChange={handleChange}
                      />
                    </div>
                    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                      {formErrors.answer}
                    </span>
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
    )
}

export default FaqEdit
