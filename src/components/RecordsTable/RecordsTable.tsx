import React, { useMemo } from "react";
import { useTable, Column, useSortBy, useExpanded } from "react-table";

import { LearningRecord, LearningResource, User } from "../../types";
import { getVerbColorClass } from "../../util/helper";

type Props = {
  users: User[];
  learningRecords: LearningRecord[];
  learningResources: LearningResource[];
};

const RecordsTable: React.FC<Props> = ({
  learningRecords,
  users,
  learningResources,
}) => {
  const userMap = useMemo(() => {
    const map = new Map<string, User>();
    users.forEach((user: User) => {
      map.set(user.id, user);
    });
    return map;
  }, [users]);

  const resourceMap = useMemo(() => {
    const map = new Map<string, LearningResource>();
    learningResources.forEach((resource) => {
      map.set(resource.masterId, resource);
    });
    return map;
  }, [learningResources]);

  const columns: readonly Column<LearningRecord>[] = useMemo(
    () => [
      {
        Header: "User Full Name",
        accessor: (row) =>
          `${userMap.get(row.user_id)?.givenName} ${
            userMap.get(row.user_id)?.familyName
          }` ?? "",
      },
      {
        Header: "Resource Title",
        accessor: (row) =>
          `${resourceMap.get(row.learning_resource_id)?.title}` ?? "",
      },
      {
        Header: "Verb",
        accessor: "learning_record_verb",
        Cell: ({ value }) => (
          <div className={`p-2 rounded-md ${getVerbColorClass(value)}`}>
            {value}
          </div>
        ),
      },
      {
        Header: "Timestamp",
        accessor: "learning_record_timestamp",
        Cell: ({ value }) => (
          <div>
            {new Date(value).toLocaleString([], {
              timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            })}
          </div>
        ),
      },
    ],
    [learningRecords]
  );

  const data = useMemo(
    () => learningRecords.map((record) => record),
    [learningRecords]
  );

  const tableInstance = useTable({ columns, data }, useSortBy, useExpanded);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <table {...getTableProps()} className="w-full border-collapse text-left">
      <thead className="bg-gray-50">
        {headerGroups.map((headerGroup) => (
          <tr
            {...headerGroup.getHeaderGroupProps()}
            className="border-b-2 border-gray-300"
          >
            {headerGroup.headers.map((column: any) => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                className="py-2 font-bold uppercase text-xs tracking-wide text-gray-600"
              >
                {column.render("Header")}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()} className="divide-y divide-gray-300">
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              {row.cells.map((cell) => (
                <td
                  {...cell.getCellProps()}
                  className="py-3 px-4 text-sm font-medium text-gray-900 align-top"
                >
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default RecordsTable;
