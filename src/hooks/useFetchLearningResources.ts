import { useState, useEffect } from "react";
import { fetchLearningResources } from "../api";
import { LearningResource } from "../types";

export const useFetchLearningResources = (): [
  LearningResource[],
  boolean,
  Error | null
] => {
  const [learningResources, setLearningResources] = useState<
    LearningResource[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getLearningRecords = async () => {
      setIsLoading(true);
      try {
        const fetchedLearningResources = await fetchLearningResources();
        setLearningResources(fetchedLearningResources);
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    getLearningRecords();
  }, []);

  return [learningResources, isLoading, error];
};
