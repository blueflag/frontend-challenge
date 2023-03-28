import { learning_record_verb, VerbOption } from "../types";

export const verbOptions: VerbOption[] = [
  { label: "ATTEMPT", value: "ATTEMPT" },
  { label: "COMPLETE", value: "COMPLETE" },
  { label: "FAIL", value: "FAIL" },
  { label: "PASS", value: "PASS" },
  { label: "ENROL", value: "ENROL" },
  { label: "ATTEND", value: "ATTEND" },
];

export const baseUrl = "http://localhost:3000/";

export const verbColorMap: { [key in learning_record_verb]: string } = {
  ATTEMPT: "bg-attempt",
  COMPLETE: "bg-complete",
  FAIL: "bg-fail",
  PASS: "bg-pass",
  ENROL: "bg-enrol",
  ATTEND: "bg-attend",
};
