import { verbColorMap } from "../constants";
import { learning_record_verb } from "../types";

export const getVerbColorClass = (value: learning_record_verb): string => {
  return verbColorMap[value] || "";
};
