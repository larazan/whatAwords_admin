import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArticles, deleteArticle } from "../actions/articles_actions";

import Breadcrumb from "../components/Breadcrumb";
import SubHeader from "../components/SubHeader";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import ScrollToTop from "../components/ScrollToTop";
import ScrollToBottom from "../components/ScrollToBottom";
import TableTailwind, {
  AvatarCell,
  SelectColumnFilter,
  StatusPill,
  ActionPill,
  LongPill,
} from "../components/TableTailwind";

const Articles = () => {
    const [showModal, setShowModal] = useState(false);
  const [selectID, setSelectID] = useState("");

  const openModal = (e) => {
    // console.log("modal open!");
    // console.log(e.currentTarget.id);
    setShowModal((prev) => !prev);
    setSelectID(e.currentTarget.id);
  };

  const dispatch = useDispatch();

  const articlesList = useSelector((state) => state.articlesList);
  const { loading, error, articles } = articlesList;

  const articleDelete = useSelector((state) => state.articleDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = articleDelete;

  useEffect(() => {
    dispatch(getArticles());
  }, [dispatch, successDelete]);

  console.log(articles);

  const deleteHandler = (e) => {
    setShowModal((prev) => !prev);
    dispatch(deleteArticle(e.currentTarget.id));
  };

  const getData = () => {
    const data = articles;
    return [...data];
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Body",
        accessor: "markdown",
        Cell: LongPill
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: StatusPill,
      },
      {
          Header: "Action",
          accessor: "_id",
          Cell: ActionPill,
          linkView: "admin/article",
            linkEdit: "admin/edit-article",
            openModal: {openModal}
      }
    ],
    []
  );

  const data = React.useMemo(() => getData(), []);

    return (
        <>
            <div>
        <Breadcrumb currentPage="Article" />
        <SubHeader pageName="Article" linkTo="add-article" />

        <div className="flex flex-wrap mb-20">
          {loading ? (
            <Loading />
          ) : error ? (
            <h2>{error}</h2>
          ) : (
            <div className="overflow-x-auto overflow-auto w-full">
              <div className="min-w-screen bg-gray-100 flex items-center justify-center bg-gray-100 font-sans ">
                <div className="w-full lg:w-5/62">
                  <div className="mt-6">
                    <TableTailwind columns={columns} data={data} />
                  </div>
                </div>
              </div>
            </div>
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

export default Articles
