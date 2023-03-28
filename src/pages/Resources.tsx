import React from "react";
import ResourcesTable from "../components/ResourcesTable/ResourcesTable";

import { useStore } from "../context/store";

const Resources = () => {
  const { learningResources, learningRecords } = useStore();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h4 className="text-3xl font-bold text-gray-800 mb-8">Resources</h4>

      <ResourcesTable
        learningResources={learningResources}
        learningRecords={learningRecords}
      />
    </div>
  );
};

export default Resources;
