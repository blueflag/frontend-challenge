import React from "react";

import { render, fireEvent, screen } from "@testing-library/react";
import UsersTable from "./UsersTable";
import { LearningRecordWithResource, User } from "../../types";

describe("Table sorting", () => {
  const users: User[] = [
    {
      id: "9d486996-370f-4e82-8b4e-00d28b289182",
      givenName: "Pamela",
      familyName: "Kelsey",
      jobPositions: "Marketing Manager",
    },
    {
      id: "36f91f1f-7c84-4689-b607-74a0b78f4af2",
      givenName: "Bernard",
      familyName: "Cruz",
      jobPositions: "Service Advisor",
    },
  ];

  const learningRecordsWithResource: LearningRecordWithResource[] = [
    {
      code: "LR_1",
      learning_record_timestamp: "2021-12-04T05:41:16.605Z",
      learning_record_verb: "ATTEMPT",
      learning_resource_id: "6458782f-6f2f-4070-ab18-1aefc1097d73",
      title: "Introduction",
      user_id: "9d486996-370f-4e82-8b4e-00d28b289182",
    },
    {
      code: "LR_1",
      learning_record_timestamp: "2021-09-15T05:56:26.768Z",
      learning_record_verb: "ATTEMPT",
      learning_resource_id: "6458782f-6f2f-4070-ab18-1aefc1097d73",
      title: "Introduction",
      user_id: "36f91f1f-7c84-4689-b607-74a0b78f4af2",
    },
  ];

  it("should sort the table in ascending order when the header is clicked once", () => {
    render(
      <UsersTable users={users} learningRecords={learningRecordsWithResource} />
    );

    const headerName = screen.getByText("Given Name");
    fireEvent.click(headerName);

    const tableRows = screen.getAllByRole("row").slice(1); // exclude header row
    const sortedRows = [...tableRows].sort((a: any, b: any) =>
      a.cells[0].textContent!.localeCompare(b.cells[0].textContent!)
    );

    expect(tableRows).toEqual(sortedRows);
  });

  it("should sort the table in descending order when the header is clicked twice", () => {
    render(
      <UsersTable users={users} learningRecords={learningRecordsWithResource} />
    );

    const headerName = screen.getByText("Given Name");
    fireEvent.click(headerName);
    fireEvent.click(headerName);

    const tableRows = screen.getAllByRole("row").slice(1);
    const sortedRows = [...tableRows].sort((a: any, b: any) =>
      b.cells[0].textContent.localeCompare(a.cells[0].textContent)
    );

    expect(tableRows).toEqual(sortedRows);
  });
});

describe("Table Component", () => {
  const users: User[] = [
    {
      id: "9d486996-370f-4e82-8b4e-00d28b289182",
      givenName: "Pamela",
      familyName: "Kelsey",
      jobPositions: "Marketing Manager",
    },
  ];

  const learningRecordsWithResource: LearningRecordWithResource[] = [
    {
      code: "LR_1",
      learning_record_timestamp: "2021-12-04T05:41:16.605Z",
      learning_record_verb: "ATTEMPT",
      learning_resource_id: "6458782f-6f2f-4070-ab18-1aefc1097d73",
      title: "Introduction",
      user_id: "9d486996-370f-4e82-8b4e-00d28b289182",
    },
  ];

  it("should toggle the full ID when the 'Show Full ID' button is clicked", () => {
    render(
      <UsersTable users={users} learningRecords={learningRecordsWithResource} />
    );

    const showFullIdButton = screen.getByText("Show Full ID");

    // Initially, only the truncated ID should be displayed
    expect(screen.getByText("9d486996...")).toBeInTheDocument();
    expect(
      screen.queryByText(/9d486996-370f-4e82-8b4e-00d28b289182/)
    ).not.toBeInTheDocument();

    // Click the 'Show Full ID' button
    fireEvent.click(showFullIdButton);

    // Now the full ID should be displayed and the truncated ID should not
    expect(screen.queryByText("9d486996...")).not.toBeInTheDocument();
    expect(
      screen.getByText(/9d486996-370f-4e82-8b4e-00d28b289182/)
    ).toBeInTheDocument();

    // Click the 'Truncate' button
    fireEvent.click(showFullIdButton);

    // Now the truncated ID should be displayed and the full ID should not
    expect(screen.getByText("9d486996...")).toBeInTheDocument();
    expect(
      screen.queryByText(/9d486996-370f-4e82-8b4e-00d28b289182/)
    ).not.toBeInTheDocument();
  });
  it("should toggle hide and show learning resources button is clicked", () => {
    render(
      <UsersTable users={users} learningRecords={learningRecordsWithResource} />
    );

    const buttonElement = screen.getByText(/Show learning resources title/i);
    expect(buttonElement).toBeInTheDocument();

    fireEvent.click(buttonElement);

    expect(
      screen.queryByText(/Show learning resources title/i)
    ).not.toBeInTheDocument();
    expect(
      screen.getByText(/Hide learning resources title/i)
    ).toBeInTheDocument();

    fireEvent.click(buttonElement);

    expect(
      screen.queryByText(/Hide learning resources title/i)
    ).not.toBeInTheDocument();
    expect(
      screen.getByText(/Show learning resources title/i)
    ).toBeInTheDocument();

    // further test can be done by making sure that the correct learning resources is visible
  });
});
