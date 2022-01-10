import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetailArticle } from "../actions/articles_actions";

import Breadcrumb from "../components/Breadcrumb";
import SubHeader from "../components/SubHeader";

const ArticleDetail = ({ match }) => {
    const history = useHistory();

  const dispatch = useDispatch();

  const articleDetail = useSelector((state) => state.articleDetail);
  const { loading, error, article } = articleDetail;

  useEffect(() => {
    dispatch(getDetailArticle(match.params.id));
  }, [dispatch, match]);

  console.log(article);

    return (
        <>
            <div>
        <Breadcrumb currentPage="article" />
        <SubHeader pageName="article" linkTo="" />

        <div className="mt-6 sm:mt-4 md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Article Detail
              </h3>
              <p className="mt-1 text-sm text-gray-600"></p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  
                <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="company-website"
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
                          value={ article.title }
                        />
                      </div>
                    </div>
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
                        <input
                          type="text"
                          name="date"
                          className="h-10 border mt-1 rounded flex-1 px-4 w-full sm:text-sm border-gray-300"
                          placeholder="Enter title"
                          value={ article.date }
                        />
                      </div>
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
        </>
    )
}

export default ArticleDetail
