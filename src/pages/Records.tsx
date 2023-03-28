import React from "react";
import RecordsTable from "../components/RecordsTable/RecordsTable";

import { useStore } from "../context/store";

const LearningRecords = () => {
  const { learningRecords, users, learningResources } = useStore();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h4 className="text-3xl font-bold text-gray-800 mb-8">Records</h4>

      <RecordsTable
        learningRecords={learningRecords}
        users={users}
        learningResources={learningResources}
      />
    </div>
  );
};

export default LearningRecords;
