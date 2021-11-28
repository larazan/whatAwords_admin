import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listUsers, deleteUser } from "../actions/user_actions";

import Table from "../components/Table";
import ActionForm from "../components/ActionForm";
import Breadcrumb from "../components/Breadcrumb";
import SubHeader from "../components/SubHeader";
import Loading from "../components/Loading"; 
import Modal from "../components/Modal";



const Users = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectID, setSelectID] = useState("");

  const openModal = (e) => {
    // console.log("modal open!");
    // console.log(e.currentTarget.id);
    setShowModal((prev) => !prev);
    setSelectID(e.currentTarget.id);
  };

  const dispatch = useDispatch();

    const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector(state => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch, successDelete]);

  console.log(users);

  const deleteHandler = (e) => {
    setShowModal((prev) => !prev);
    dispatch(deleteUser(e.currentTarget.id))
  }

  const userTableHead = [
    "", 
    "name",
    "email",
    "bio",
    "region",
    "phone",
    "photo",
    "role",
    "action",
];
const renderHead = (item, index) => <th className="py-3 px-6 text-left" key={index}>{item}</th>;
const renderBody = (item, index) => (
    <tr className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100" key={index}>
      <td className="py-3 px-6 text-left">{item._id}</td>
      <td className="py-3 px-6 text-left">{item.name}</td>
      <td className="py-3 px-6 text-left">{item.email}</td>
      <td className="py-3 px-6 text-left">{item.bio}</td>
      <td className="py-3 px-6 text-left">{item.region}</td>
      <td className="py-3 px-6 text-left">{item.contactNumber}</td>
      <td className="py-3 px-6 text-left">{item.photo} <img className="w-6 h-6 rounded-full"src="https://randomuser.me/api/portraits/men/8.jpg"/></td>
      <td className="py-3 px-6 text-left">{item.role}</td>
      <td className="py-3 px-6 text-left">
          <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">
              {item.name}
          </span>
      </td>
      <td className="py-3 px-6 text-center">
          <ActionForm 
            linkView="admin/user" 
            linkEdit="admin/edit-user" 
            id={item._id} 
            openModal={openModal}
          />
      </td>
    </tr>
  );

    return (
        <>
              <div>
          <Breadcrumb currentPage="user" />
          <SubHeader pageName="user" linkTo="add-user" />

          <div className="flex flex-wrap mb-20">
          {loading ? (
          <Loading />
        ) : error ? (
          <h2>{error}</h2>
        ) : (
            <Table 
                limit="500"
                headData={userTableHead}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={users}
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
    )
}

export default Users
