import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { getWords, deleteWord } from "../actions/words_actions";

import Table from "../components/Table";
import ActionForm from "../components/ActionForm";
import Breadcrumb from "../components/Breadcrumb";
import SubHeader from "../components/SubHeader";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import Paginate from "../components/Pagination";
import ScrollToTop from "../components/ScrollToTop";
import ScrollToBottom from "../components/ScrollToBottom";

const Quotes = ({ match }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectID, setSelectID] = useState("");

  const openModal = (e) => {
    // console.log("modal open!");
    // console.log(e.currentTarget.id);
    setShowModal((prev) => !prev);
    setSelectID(e.currentTarget.id);
  };

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const wordsList = useSelector((state) => state.wordsList);
  const { loading, error, words, results, count } = wordsList;

  const wordDelete = useSelector((state) => state.wordDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = wordDelete;

  useEffect(() => {
    dispatch(getWords(pageNumber));
  }, [dispatch, successDelete, pageNumber]);

  console.log(words);
  console.log(pageNumber);

  const deleteHandler = (e) => {
    setShowModal((prev) => !prev);
    dispatch(deleteWord(e.currentTarget.id));
  };

  const wordsTableHead = [
    "",
    "words",
    "category",
    "author",
    "tags",
    "creator",
    "info",
    "date",
    "status",
    "action",
  ];
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
      <td className="py-3 px-6 text-left">{`${item.words.substring(
        0,
        60
      )}...`}</td>
      <td className="py-3 px-6 text-left capitalize">
        {item.category["name"]}
      </td>
      <td className="py-3 px-6 text-left capitalize">{item.author["name"]}</td>
      <td className="py-3 px-6 text-left">{item.tags.join(", ")}</td>
      <td className="py-3 px-6 text-left capitalize">
        {item.createdBy["name"]}
      </td>
      <td className="py-3 px-6 text-left">
        <div className="flex space-x-2">
          <div className="flex items-center space-x-1">
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <span>{item.views}</span>
          </div>
          <div className="flex items-center space-x-1">
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            <span>{item.download}</span>
          </div>
        </div>
      </td>
      <td className="py-3 px-6 text-left">
        {format(new Date(item.createdAt), "dd-MM-yyyy")}
      </td>
      <td className="py-3 px-6 text-left">
        <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">
          status
        </span>
      </td>
      <td className="py-3 px-6 text-center">
        <ActionForm
          linkView="admin/quote"
          linkEdit="admin/edit-quote"
          id={item._id}
          openModal={openModal}
        />
      </td>
    </tr>
  );

  return (
    <>
      <div>
        <Breadcrumb currentPage="quote" />
        <SubHeader pageName="quote" linkTo="add-quote" />
        <Paginate page={pageNumber} link="quotes" results={results} />

        <div className="flex flex-wrap mb-20">
          {loading ? (
            <Loading />
          ) : error ? (
            <h2>{error}</h2>
          ) : (
            <Table
              limit="500"
              headData={wordsTableHead}
              renderHead={(item, index) => renderHead(item, index)}
              bodyData={words}
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
};

export default Quotes;
