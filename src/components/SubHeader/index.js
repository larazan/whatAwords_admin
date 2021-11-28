import React from "react";
import { Link } from "react-router-dom"

const SubHeader = ({ pageName, linkTo }) => {
  return (
    <>
      <div className="lg:flex justify-between items-center ">
        <p className="text-2xl font-semibold mb-2 lg:mb-0 capitalize ">{pageName}</p>
        {linkTo === '' ? null : (
          <Link to={`/admin/${linkTo}`}>
          <button className="bg-blue-500 hover:bg-blue-600 focus:outline-none rounded-lg px-6 py-2 text-white font-semibold shadow capitalize ">
            Add {pageName}
          </button>
          </Link>
        )}
        
      </div>
    </>
  );
};

export default SubHeader;
