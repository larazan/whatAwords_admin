import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTagById } from "../actions/tags_actions";

import Breadcrumb from "../components/Breadcrumb";
import SubHeader from "../components/SubHeader";

const TagDetail = ({ match }) => {
  const history = useHistory();

  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [hits, setHits] = useState(0)
  const dispatch = useDispatch();

  const tagDetail = useSelector((state) => state.tagDetail);
  const { loading, error, tag } = tagDetail;

  useEffect(() => {
    dispatch(getTagById(match.params.id));
  }, [dispatch, match]);

  console.log(tag);

  useEffect(() => {
    if (tag.name || tag._id === match.params.id) {
      setId(match.params.id)
      setName(tag.name)
      setHits(tag.hits)
    }
  }, [dispatch, tag])

  return (
    <>
      <div>
        <Breadcrumb currentPage="tag" />
        <SubHeader pageName="tag" linkTo="" />

        <div className="mt-6 sm:mt-4 md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Tag Detail
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
                        ID
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="author-id"
                          className="h-10 border mt-1 rounded flex-1 px-4 text-sm w-full border-gray-300 focus:outline-none bg-gray-50"
                          value={id}
                          readOnly
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
                        Tag Name
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="name"
                          className="h-10 border mt-1 rounded text-sm flex-1 px-4 w-full border-gray-300 focus:outline-none bg-gray-50"
                          value={name}
                          readOnly
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
                        Hits
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="hits"
                          className="h-10 border mt-1 rounded text-sm flex-1 px-4 w-full border-gray-300 focus:outline-none bg-gray-50"
                          value={hits}
                          readOnly
                        />
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
  );
};

export default TagDetail;
