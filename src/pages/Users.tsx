import React from "react";

import UsersTable from "../components/UsersTable/UsersTable";
import { useStore } from "../context/store";

const Users = () => {
  const { users, learningRecordsWithResource } = useStore();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Users</h1>

      <UsersTable users={users} learningRecords={learningRecordsWithResource} />
    </div>
  );
};

export default Users;
