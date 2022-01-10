import React from "react";
import TableTailwind, { AvatarCell, SelectColumnFilter, StatusPill } from "../components/TableTailwind";

import { employes } from "../assets/data/employes";

const Table = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: AvatarCell,
        imgAccessor: "imgUrl",
        emailAccessor: "email",
      },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: StatusPill,
      },
      {
        Header: "Age",
        accessor: "age",
      },
      {
        Header: "Role",
        accessor: "role",
        Filter: SelectColumnFilter, // new
        filter: "includes",
      },
    ],
    []
  );

  const data = React.useMemo(() => employes(), []);

  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="">
            <h1 className="text-xl font-semibold">
              React Table + Tailwind CSS = ❤
            </h1>
          </div>
          <div className="mt-6">
            <TableTailwind columns={columns} data={data} />
          </div>
        </main>
      </div>
    </>
  );
};

export default Table;
