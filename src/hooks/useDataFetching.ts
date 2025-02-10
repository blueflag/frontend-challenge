import { useState, useEffect } from "react";
import {
  fetchUsers,
  fetchLearningResources,
  fetchLearningRecords,
} from "@/api";
import type { User, LearningResource, LearningRecord } from "@/types";

export const useDataFetching = () => {
  const [usersData, setUsersData] = useState<User[]>([]);
  const [learningResourcesData, setLearningResourcesData] = useState<
    LearningResource[]
  >([]);
  const [learningRecordsData, setLearningRecordsData] = useState<
    LearningRecord[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [users, resources, records] = await Promise.all([
          fetchUsers(),
          fetchLearningResources(),
          fetchLearningRecords(),
        ]);
        setUsersData(users);
        setLearningResourcesData(resources);
        setLearningRecordsData(records);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { usersData, learningResourcesData, learningRecordsData, isLoading };
};
