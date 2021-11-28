import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuthorByAlphabet, deleteAuthor } from "../actions/authors_actions";

import Table from "../components/Table";
import AuthorList from "../components/AuthorList";
import ActionForm from "../components/ActionForm";
import Breadcrumb from "../components/Breadcrumb";
import SubHeader from "../components/SubHeader";
import Loading from "../components/Loading"; 
import Modal from "../components/Modal";
import ScrollToTop from "../components/ScrollToTop";
import ScrollToBottom from "../components/ScrollToBottom";

const abjad = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

const Authors = ({ match }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectID, setSelectID] = useState("");
  const [alpha, setAlpha] = useState("a");

  const openModal = (e) => {
    // console.log("modal open!");
    // console.log(e.currentTarget.id);
    setShowModal((prev) => !prev);
    setSelectID(e.currentTarget.id);
  };

  const dispatch = useDispatch();

  const authorByAlphabet = useSelector((state) => state.authorByAlphabet);
  const { loading, error, authors } = authorByAlphabet;

  const authorDelete = useSelector(state => state.authorDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = authorDelete;

  useEffect(() => {
    setAlpha(match.params.id);
    dispatch(getAuthorByAlphabet(match.params.id));
  }, [dispatch, match, successDelete]);

  console.log(authors);

  const deleteHandler = (e) => {
    setShowModal((prev) => !prev);
    dispatch(deleteAuthor(e.currentTarget.id))
  }

  const authorTableHead = ["", "name", "bio", "location", "status", "actions"];

  const renderHead = (item, index) => <th className="py-3 px-6 text-left" key={index}>{item}</th>;

  const renderBody = (item, index) => (
    <tr className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100" key={index}>
      <td className="py-3 px-6 text-left">{item._id}</td>
      <td className="py-3 px-6 text-left capitalize">{item.name}</td>
      <td className="py-3 px-6 text-left">{item.bio}</td>
      <td className="py-3 px-6 text-left">{item.region}</td>
      <td className="py-3 px-6 text-left">
          <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">
              {item.bio}
          </span>
      </td>
      <td className="py-3 px-6 text-center">
          <ActionForm 
            linkView="admin/author" 
            linkEdit="admin/edit-author" 
            id={item._id} 
            openModal={openModal}
          />
      </td>
    </tr>
  );

    return (
      <>
        <div>
          <Breadcrumb currentPage="author" />
          <AuthorList abjad={abjad} param={match.params.id} />
          <SubHeader pageName="author" linkTo="add-author" className="mt-4" />

          <div className="flex flex-wrap mb-20">
          {loading ? (
          <Loading />
        ) : error ? (
          <h2>{error}</h2>
        ) : (
            <Table 
                limit="500"
                headData={authorTableHead}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={authors}
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
    );
}

export default Authors
