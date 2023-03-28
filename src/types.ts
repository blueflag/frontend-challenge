export interface User {
  id: string;
  givenName: string;
  familyName: string;
  jobPositions: string;
}

export type learning_record_verb =
  | "ATTEMPT"
  | "COMPLETE"
  | "FAIL"
  | "PASS"
  | "ENROL"
  | "ATTEND";

export interface LearningRecord {
  learning_record_verb: learning_record_verb;
  user_id: string;
  learning_resource_id: string;
  learning_record_timestamp: string;
}
export interface LearningResource {
  masterId: string;
  code: string;
  title: string;
}

export interface LearningRecordWithResource {
  learning_record_verb: learning_record_verb;
  user_id: string;
  learning_resource_id: string;
  learning_record_timestamp: string;
  code: string;
  title: string;
}

export type VerbOption = {
  label: string;
  value: string;
};
