import React from "react";
import { render, screen } from "@testing-library/react";

import { LearningRecord, LearningResource } from "../types";
import Resources from "./Resources";

jest.mock("../context/store", () => ({
  useStore: () => ({
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
      {
        learning_record_verb: "ATTEMPT",
        user_id: "36f91f1f-7c84-4689-b607-74a0b78f4af2",
        learning_resource_id: "ddec78c5-303b-4bf2-a00d-e5930664f4aa",
        learning_record_timestamp: "2021-09-15T05:56:54.634Z",
      },
    ] as LearningRecord[],
  }),
}));

describe("Resources", () => {
  test("renders resources table", () => {
    render(<Resources />);

    expect(
      screen.getByRole("heading", { name: "Resources" })
    ).toBeInTheDocument();
    expect(screen.getByText("LR_1")).toBeInTheDocument();
    expect(screen.getByText("Introduction")).toBeInTheDocument();

    // further test can be done to include learning verbs value
  });
});
