import React, { useMemo, useState } from "react";
import { useTable, Column, useSortBy, useExpanded } from "react-table";
import { LearningRecord, LearningRecordWithResource, User } from "../../types";

import VerbFilter from "./VerbFilter";

type Props = {
  users: User[];
  learningRecords: LearningRecordWithResource[];
};

const UsersTable: React.FC<Props> = ({ users, learningRecords }) => {
  const [selectedVerbs, setSelectedVerbs] = useState<string[]>([]);

  const columns: readonly Column<User>[] = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        Cell: ({ value }) => {
          const [showFullId, setShowFullId] = useState(false);
          return (
            <div
              style={{
                fontStyle: showFullId ? "normal" : "italic",
                color: showFullId ? "inherit" : "#888",
              }}
            >
              {showFullId ? value : value.slice(0, 8)}...
              <button
                style={{
                  border: "none",
                  background: "none",
                  color: "#007bff",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={() => setShowFullId(!showFullId)}
              >
                {showFullId ? "Truncate" : "Show Full ID"}
              </button>
            </div>
          );
        },
      },
      {
        Header: "Given Name",
        accessor: "givenName",
        sortType: "basic",
      },
      {
        Header: "Family Name",
        accessor: "familyName",
        sortType: "basic",
      },
      {
        Header: "Job Positions",
        accessor: "jobPositions",
        sortType: "basic",
      },
      {
        disableSortBy: true,
        Header: (
          <div>
            <VerbFilter onChange={(values) => setSelectedVerbs(values)} />
          </div>
        ),
        id: "verb",
        accessor: (user: User) =>
          learningRecords.filter((record: LearningRecord) => {
            if (selectedVerbs.length === 0) {
              return record.user_id === user.id;
            } else {
              return (
                record.user_id === user.id &&
                selectedVerbs.includes(record.learning_record_verb)
              );
            }
          }).length,
        Cell: ({ row }: { row: any }) => (
          <>
            <p>
              {
                learningRecords.filter((record: LearningRecord) => {
                  if (selectedVerbs.length === 0) {
                    return record.user_id === row.original.id;
                  } else {
                    return (
                      record.user_id === row.original.id &&
                      selectedVerbs.includes(record.learning_record_verb)
                    );
                  }
                }).length
              }
            </p>

            {/* This will show the accessor value */}
            <button
              onClick={() => row.toggleRowExpanded()}
              className="text-gray-500 text-sm hover:underline italic"
            >
              {row.isExpanded ? "Hide" : "Show"} learning resources title
            </button>

            {row.isExpanded && (
              <div className="p-4 bg-gray-50 rounded-lg shadow-md">
                <div className="grid grid-cols-3 gap-2">
                  {learningRecords
                    .filter((record: LearningRecord) => {
                      if (selectedVerbs.length === 0) {
                        return record.user_id === row.original.id;
                      } else {
                        return (
                          record.user_id === row.original.id &&
                          selectedVerbs.includes(record.learning_record_verb)
                        );
                      }
                    })
                    .map((data) => (
                      <span
                        key={data.learning_resource_id}
                        className={`inline-block text-gray-800 text-sm font-medium py-1 px-2 rounded-lg ${
                          data.learning_record_verb === "ATTEMPT"
                            ? "bg-attempt"
                            : data.learning_record_verb === "COMPLETE"
                            ? "bg-complete"
                            : data.learning_record_verb === "FAIL"
                            ? "bg-fail"
                            : data.learning_record_verb === "PASS"
                            ? "bg-pass"
                            : data.learning_record_verb === "ENROL"
                            ? "bg-enrol"
                            : data.learning_record_verb === "ATTEND"
                            ? "bg-attend"
                            : ""
                        }`}
                      >
                        {data.title}
                      </span>
                    ))}
                </div>
              </div>
            )}
          </>
        ),
      },
      {
        Header: "# of learning records",
        accessor: (user: User) =>
          learningRecords.filter((record) => record.user_id === user.id).length,
        sortType: "basic",
      },
    ],
    [learningRecords, selectedVerbs]
  );

  const data = useMemo(
    () =>
      users.map((user) => ({
        id: user.id,
        givenName: user.givenName,
        familyName: user.familyName,
        jobPositions: user.jobPositions,
      })),
    [users]
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

export default UsersTable;
