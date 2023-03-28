import { useState, useEffect } from "react";
import { fetchLearningRecords } from "../api";
import { LearningRecord } from "../types";

export const useFetchLearningRecords = (): [
  LearningRecord[],
  boolean,
  Error | null
] => {
  const [learningRecords, setLearningRecords] = useState<LearningRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getLearningRecords = async () => {
      setIsLoading(true);
      try {
        const fetchedLearningRecords = await fetchLearningRecords();
        setLearningRecords(fetchedLearningRecords);
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    getLearningRecords();
  }, []);

  return [learningRecords, isLoading, error];
};
