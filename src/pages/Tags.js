import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTags, deleteTag } from "../actions/tags_actions";

import Table from "../components/Table";
import ActionForm from "../components/ActionForm";
import Breadcrumb from "../components/Breadcrumb";
import SubHeader from "../components/SubHeader";
import Loading from "../components/Loading"; 
import Modal from "../components/Modal";
import ScrollToTop from "../components/ScrollToTop";
import ScrollToBottom from "../components/ScrollToBottom";


const Tags = ({ match }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectID, setSelectID] = useState("");

  const openModal = (e) => {
    // console.log("modal open!");
    // console.log(e.currentTarget.id);
    setShowModal((prev) => !prev);
    setSelectID(e.currentTarget.id);
  };

  const dispatch = useDispatch();

  const tagsList = useSelector((state) => state.tagsList);
  const { loading, error, tags } = tagsList;

  const tagDelete = useSelector(state => state.tagDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = tagDelete;

  useEffect(() => {
    dispatch(getAllTags());
  }, [dispatch, successDelete]);

  console.log(tags);

  const deleteHandler = (e) => {
    setShowModal((prev) => !prev);
    dispatch(deleteTag(e.currentTarget.id))
  }

  const tagsTableHead = ["", "name", "slug", "hits", "action"];
const renderHead = (item, index) => <th className="py-3 px-6 text-left" key={index}>{item}</th>;
const renderBody = (item, index) => (
    <tr className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100" key={index}>
      <td className="py-3 px-6 text-left">{item._id}</td>
      <td className="py-3 px-6 text-left">{item.name}</td>
      <td className="py-3 px-6 text-left">{item.slug}</td>
      <td className="py-3 px-6 text-left">{item.hits}</td>
      <td className="py-3 px-6 text-center">
          <ActionForm 
            linkView="admin/tag" 
            linkEdit="admin/edit-tag" 
            id={item._id} 
            openModal={openModal}
          />
      </td>
    </tr>
  );

    return (
        <>
            <div>
          <Breadcrumb currentPage="tag" />
          <SubHeader pageName="tag" linkTo="add-tag" />

          <div className="flex flex-wrap mb-20">
          {loading ? (
          <Loading />
        ) : error ? (
          <h2>{error}</h2>
        ) : (
            <Table 
                limit="500"
                headData={tagsTableHead}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={tags}
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
        <ScrollToBottom />
        <ScrollToTop />
        </>
    )
}

export default Tags
