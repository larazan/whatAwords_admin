import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { getCategories, deleteCategory } from "../actions/category_actions";

import Table from "../components/Table";
import ActionForm from "../components/ActionForm";
import Breadcrumb from "../components/Breadcrumb";
import SubHeader from "../components/SubHeader";
import Loading from "../components/Loading";
import Modal from "../components/Modal";

const Categories = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectID, setSelectID] = useState("");

  const openModal = (e) => {
    // console.log("modal open!");
    // console.log(e.currentTarget.id);
    setShowModal((prev) => !prev);
    setSelectID(e.currentTarget.id);
  };

  const dispatch = useDispatch();

  const categoriesList = useSelector((state) => state.categoriesList);
  const { loading, error, categories } = categoriesList;

  const categoryDelete = useSelector(state => state.categoryDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = categoryDelete;

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  console.log(userInfo);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch, successDelete]);

  console.log(categories);

  const deleteHandler = (e) => {
    console.log(`deleted data ${e.currentTarget.id}`);
    // console.log(typeof(e.currentTarget.id));
    setShowModal((prev) => !prev);
    dispatch(deleteCategory(e.currentTarget.id))
  }

  const categoryTableHead = ["", "name", "slug", "date", "status", "action"];
  const renderHead = (item, index) => (
    <th className="py-3 px-6 text-left" key={index}>
      {item}
    </th>
  );
  const renderBody = (item, index) => (
    <tr
      className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100"
      key={index}
    >
      <td className="py-3 px-6 text-left">{item._id}</td>
      <td className="py-3 px-6 text-left capitalize">{item.name}</td>
      <td className="py-3 px-6 text-left">{item.slug}</td>
      <td className="py-3 px-6 text-left">
        {format(new Date(item.createdAt), "dd-MM-yyyy")}
      </td>
      <td className="py-3 px-6 text-left">
        {item.slug ? (
          <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">
          {item.status}
        </span>
        ) : null}
        
      </td>
      <td className="py-3 px-6 text-center">
        <ActionForm
          linkView="admin/category"
          linkEdit="admin/edit-category"
          id={item._id}
          openModal={openModal}
        />
      </td>
    </tr>
  );

  return (
    <>
      <div>
        <Breadcrumb currentPage="category" />
        <SubHeader pageName="category" linkTo="add-category" />

        <div className="flex flex-wrap mb-20">
          {loading ? (
            <Loading />
          ) : error ? (
            <h2>{error}</h2>
          ) : (
            <Table
              limit="500"
              headData={categoryTableHead}
              renderHead={(item, index) => renderHead(item, index)}
              bodyData={categories}
              renderBody={(item, index) => renderBody(item, index)}
            />
          )}
        </div>
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          deleteHandler={deleteHandler}
          selectID={selectID}
        />
      </div>
    </>
  );
};

export default Categories;
