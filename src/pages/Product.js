import React from "react";

import Table2 from "../components/Table2";
import Breadcrumb from "../components/Breadcrumb";
import SubHeader from "../components/SubHeader";

const Product = () => {
  return (
    <>
      <div className="">
        <Breadcrumb currentPage="Product" />

        <SubHeader pageName="product" linkTo="add-product" />

        <div className="flex flex-wrap mb-20">
          <Table2 />
        </div>
      </div>
    </>
  );
};

export default Product;
