import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../actions/user_actions";

import Breadcrumb from "../components/Breadcrumb";
import SubHeader from "../components/SubHeader";

const UserDetail = ({ match }) => {
  const history = useHistory();
  const initialValues = {
    name: "",
    email: "",
    bio: "",
    region: "",
    website: "",
    instagram: "",
    twitter: "",
    contactNumber: "",
    role: "",
  };
  const [formValues, setFormValues] = useState(initialValues);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  useEffect(() => {
    dispatch(getUserDetails(match.params.id));
  }, [dispatch, match]);

  console.log(user);

  useEffect(() => {
      setFormValues(user);
  }, [user, setFormValues]);

  return (
    <>
      <div>
        <Breadcrumb currentPage="user" />
        <SubHeader pageName="user" linkTo="add-user" />

        <div className="mt-6 sm:mt-4">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  User Detail
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

                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="id"
                          className="block text-sm font-medium text-gray-700"
                        >
                          ID
                        </label>
                        <input
                          type="text"
                          name="id"
                          className="h-10 border mt-1 rounded text-sm flex-1 px-4 w-full border-gray-300 focus:outline-none bg-gray-50"
                          value={match.params.id}
                          readOnly
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Username
                        </label>
                        <input
                          type="text"
                          name="name"
                          className="h-10 border mt-1 rounded text-sm flex-1 px-4 w-full border-gray-300 focus:outline-none bg-gray-50"
                          value={formValues.name}
                          readOnly
                        />
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="bio"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Bio
                        </label>
                        <div className="mt-1">
                          <textarea
                            name="bio"
                            rows={4}
                            className="w-full shadow-sm mt-1 px-3 py-2 sm:text-sm border border-gray-300 rounded-md focus:outline-none bg-gray-50"
                            value={formValues.bio}
                            readOnly
                          />
                        </div>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <input
                          type="text"
                          name="email"
                          className="h-10 border mt-1 rounded text-sm flex-1 px-4 w-full border-gray-300 focus:outline-none bg-gray-50"
                          value={formValues.email}
                          readOnly
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="contactNumber"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Phone
                        </label>
                        <input
                          type="text"
                          name="contactNumber"
                          className="h-10 border mt-1 rounded text-sm flex-1 px-4 w-full border-gray-300 focus:outline-none bg-gray-50"
                          value={formValues.contactNumber}
                          readOnly
                        />
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="region"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Region
                        </label>
                        <input
                          type="text"
                          name="region"
                          className="w-full shadow-sm mt-1 px-3 py-2 sm:text-sm border border-gray-300 rounded-md focus:outline-none bg-gray-50"
                          value={formValues.region}
                          readOnly
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label
                          htmlFor="role"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Role
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                        <select
                          id="role"
                          name="role"
                          className="mt-1 block h-10 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          value={formValues.role}
                        >
                          <option>-- Please select --</option>
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                          <option value="super-admin">Super Admin</option>
                        </select>
                      </div>
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label
                          htmlFor="twitter"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Twitter
                        </label>
                        <input
                          type="text"
                          name="twitter"
                          className="w-full shadow-sm mt-1 px-3 py-2 sm:text-sm border border-gray-300 rounded-md focus:outline-none bg-gray-50"
                          value={formValues.twitter}
                          readOnly
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label
                          htmlFor="instagram"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Instagram
                        </label>
                        <input
                          type="text"
                          name="instagram"
                          className="w-full shadow-sm mt-1 px-3 py-2 sm:text-sm border border-gray-300 rounded-md focus:outline-none bg-gray-50"
                          value={formValues.instagram}
                          readOnly
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="fwebsite"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Website
                        </label>
                        <input
                          type="text"
                          name="website"
                          className="h-10 border mt-1 rounded text-sm flex-1 px-4 w-full border-gray-300 focus:outline-none bg-gray-50"
                          value={formValues.website}
                          readOnly
                        />
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

export default UserDetail;
