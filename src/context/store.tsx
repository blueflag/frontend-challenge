import React, { createContext, useContext } from "react";
import { useFetchLearningRecords } from "../hooks/useFetchLearningRecords";
import { useFetchLearningRecordsWithResource } from "../hooks/useFetchLearningRecordsWithResource";
import { useFetchLearningResources } from "../hooks/useFetchLearningResources";
import { useFetchUsers } from "../hooks/useFetchUsers";
import {
  LearningRecord,
  LearningRecordWithResource,
  LearningResource,
  User,
} from "../types";

interface Store {
  users: User[];
  learningRecordsWithResource: LearningRecordWithResource[];
  learningResources: LearningResource[];
  learningRecords: LearningRecord[];
}

const StoreContext = createContext<Store>({
  users: [],
  learningRecordsWithResource: [],
  learningResources: [],
  learningRecords: [],
});

export const useStore = () => useContext(StoreContext);

export const StoreProvider: React.FC = ({ children }) => {
  const [users] = useFetchUsers();

  const [learningResources] = useFetchLearningResources();

  const [learningRecords] = useFetchLearningRecords();

  const [learningRecordsWithResource] = useFetchLearningRecordsWithResource();

  return (
    <StoreContext.Provider
      value={{
        users,
        learningRecordsWithResource,
        learningResources,
        learningRecords,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
