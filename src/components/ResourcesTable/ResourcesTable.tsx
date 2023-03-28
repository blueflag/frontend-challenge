import React, { useMemo, useState } from "react";
import { useTable, Column, useSortBy, useExpanded } from "react-table";
import { verbOptions } from "../../constants";
import { LearningRecord, LearningResource, VerbOption } from "../../types";

type Props = {
  learningResources: LearningResource[];
  learningRecords: LearningRecord[];
};

const ResourcesTable: React.FC<Props> = ({
  learningResources,
  learningRecords,
}) => {
  const columns: readonly Column<LearningResource>[] = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "masterId",
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
        Header: "CODE",
        accessor: "code",
      },
      {
        Header: "TITLE",
        accessor: "title",
      },
      ...verbOptions.map((verb: VerbOption) => ({
        Header: verb.value,
        accessor: (resource: LearningResource) =>
          learningRecords.filter(
            (record) =>
              record.learning_resource_id === resource.masterId &&
              record.learning_record_verb === verb.value
          ).length,
      })),
      {
        Header: "total in learning records",
        accessor: (resource: LearningResource) =>
          learningRecords.filter(
            (record) => record.learning_resource_id === resource.masterId
          ).length,
      },
    ],
    [learningRecords]
  );

  const data = useMemo(
    () => learningResources.map((resource) => resource),
    [learningResources]
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

export default ResourcesTable;
