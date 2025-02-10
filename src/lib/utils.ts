import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getStatusBadge = (status: string) => {
  const variants: { [key: string]: string } = {
    COMPLETE: "bg-green-500 text-white",
    ATTEMPT: "bg-yellow-500 text-white",
    PASS: "bg-blue-500 text-white",
    FAIL: "bg-red-500 text-white",
    ENROL: "bg-purple-500 text-white",
    ATTEND: "bg-indigo-500 text-white",
    NOT_STARTED: "bg-gray-500 text-white",
  };
  return `px-2 py-1 rounded-full text-xs font-semibold ${
    variants[status] || "bg-gray-500 text-white"
  }`;
};

export const getPastTenseVerb = (verb: string) => {
  const pastTenseVerbs: { [key: string]: string } = {
    COMPLETE: "Completed",
    ATTEMPT: "Attempted",
    NOT_STARTED: "Not Started",
    FAIL: "Failed",
    PASS: "Passed",
    ENROL: "Enrolled",
    ATTEND: "Attended",
  };
  return pastTenseVerbs[verb] || verb;
};
