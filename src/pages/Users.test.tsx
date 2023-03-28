import React from "react";
import { render, screen } from "@testing-library/react";
import Users from "./Users";
import { LearningRecordWithResource, User } from "../types";

jest.mock("../context/store", () => ({
  useStore: () => ({
    users: [
      {
        id: "9d486996-370f-4e82-8b4e-00d28b289182",
        givenName: "Pamela",
        familyName: "Kelsey",
        jobPositions: "Marketing Manager",
      },
    ] as User[],
    learningRecordsWithResource: [
      {
        code: "LR_1",
        learning_record_timestamp: "2021-12-04T05:41:16.605Z",
        learning_record_verb: "ATTEMPT",
        learning_resource_id: "6458782f-6f2f-4070-ab18-1aefc1097d73",
        title: "Introduction",
        user_id: "9d486996-370f-4e82-8b4e-00d28b289182",
      },
    ] as LearningRecordWithResource[],
  }),
}));

describe("Users", () => {
  test("renders users table", () => {
    render(<Users />);

    expect(screen.getByRole("heading", { name: "Users" })).toBeInTheDocument();
    expect(screen.getByText("Pamela")).toBeInTheDocument();
    expect(screen.getByText("Kelsey")).toBeInTheDocument();
    expect(screen.getByText("Marketing Manager")).toBeInTheDocument();

    // find the element with the value "Pamela"
    const pamelaElement = screen.getByRole("cell", { name: "Pamela" });

    // eslint-disable-next-line testing-library/no-node-access
    const parent = pamelaElement.parentElement;

    // find the last td element (index 6) and get its text content
    const numberOfLearningResources =
      // eslint-disable-next-line testing-library/no-node-access
      parent?.querySelector("td:nth-child(6)")?.textContent;

    expect(numberOfLearningResources).toBe("1");
  });
});
