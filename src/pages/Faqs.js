import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFaqs, deleteFaq } from "../actions/faq_actions";

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

const Faqs = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectID, setSelectID] = useState("");

  const openModal = (e) => {
    // console.log("modal open!");
    // console.log(e.currentTarget.id);
    setShowModal((prev) => !prev);
    setSelectID(e.currentTarget.id);
  };

  const dispatch = useDispatch();

  const faqsList = useSelector((state) => state.faqsList);
  const { loading, error, faqs } = faqsList;

  const faqDelete = useSelector((state) => state.faqDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = faqDelete;

  useEffect(() => {
    dispatch(getFaqs());
  }, [dispatch, successDelete]);

  console.log(faqs);

  const deleteHandler = (e) => {
    setShowModal((prev) => !prev);
    dispatch(deleteFaq(e.currentTarget.id));
  };

  const getData = () => {
    const data = faqs;
    return [...data];
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Question",
        accessor: "question",
      },
      {
        Header: "Answer",
        accessor: "answer",
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
          linkView: "admin/faq",
          linkEdit: "admin/edit-faq",
          openModal: openModal
      }
    ],
    []
  );

  const data = React.useMemo(() => getData(), []);

  // console.log(data);
  return (
    <>
      <div>
        <Breadcrumb currentPage="Faq" />
        <SubHeader pageName="Faq" linkTo="add-faq" />

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
  );
};

export default Faqs;
