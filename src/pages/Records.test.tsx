import React from "react";
import { render, screen } from "@testing-library/react";

import { LearningRecord, LearningResource, User } from "../types";

import LearningRecords from "./Records";

jest.mock("../context/store", () => ({
  useStore: () => ({
    users: [
      {
        id: "36f91f1f-7c84-4689-b607-74a0b78f4af2",
        givenName: "Bernard",
        familyName: "Cruz",
        jobPositions: "Service Advisor",
      },
    ] as User[],

    learningResources: [
      {
        masterId: "6458782f-6f2f-4070-ab18-1aefc1097d73",
        code: "LR_1",
        title: "Introduction",
      },
      {
        masterId: "ddec78c5-303b-4bf2-a00d-e5930664f4aa",
        code: "LR_2",
        title: "Chapter 1",
      },
    ] as LearningResource[],
    learningRecords: [
      {
        learning_record_verb: "ATTEMPT",
        user_id: "36f91f1f-7c84-4689-b607-74a0b78f4af2",
        learning_resource_id: "6458782f-6f2f-4070-ab18-1aefc1097d73",
        learning_record_timestamp: "2021-09-15T05:56:26.768Z",
      },
    ] as LearningRecord[],
  }),
}));

describe("Records", () => {
  test("renders records table", () => {
    render(<LearningRecords />);

    expect(
      screen.getByRole("heading", { name: "Records" })
    ).toBeInTheDocument();
    expect(screen.getByText("Bernard Cruz")).toBeInTheDocument();
    expect(screen.getByText("Introduction")).toBeInTheDocument();
    expect(screen.getByText("ATTEMPT")).toBeInTheDocument();

    const timestamp = new Date("2021-09-15T05:56:26.768Z").toLocaleString([], {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });

    const regexString = timestamp
      .replace(/[.:]/g, "\\$&")
      .replace(/\s+/g, "\\s*");
    const regex = new RegExp(regexString);

    const timestampElement = screen.getByText(regex);

    expect(timestampElement).toBeInTheDocument();
  });
});
