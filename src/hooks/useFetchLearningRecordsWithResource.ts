import { useEffect, useState } from "react";
import {
  LearningRecordWithResource,
  LearningRecord,
  LearningResource,
} from "../types";
import { useFetchLearningRecords } from "./useFetchLearningRecords";
import { useFetchLearningResources } from "./useFetchLearningResources";

export const useFetchLearningRecordsWithResource = (): [
  LearningRecordWithResource[],
  boolean,
  Error | null
] => {
  const [learningRecords, isLoadingRecords, errorRecords] =
    useFetchLearningRecords();
  const [learningResources, isLoadingResources, errorResources] =
    useFetchLearningResources();
  const [learningRecordsWithResource, setLearningRecordsWithResource] =
    useState<LearningRecordWithResource[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    try {
      const combinedData: LearningRecordWithResource[] = learningRecords.map(
        (item: LearningRecord) => {
          const matchedData: LearningResource | undefined =
            learningResources.find(
              (data2Item: LearningResource) =>
                data2Item.masterId === item.learning_resource_id
            );

          return {
            learning_record_verb: item.learning_record_verb,
            user_id: item.user_id,
            learning_resource_id: item.learning_resource_id,
            learning_record_timestamp: item.learning_record_timestamp,
            code: matchedData?.code || "",
            title: matchedData?.title || "",
          };
        }
      );
      setLearningRecordsWithResource(combinedData);
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [learningRecords, learningResources]);

  return [
    learningRecordsWithResource,
    isLoading || isLoadingRecords || isLoadingResources,
    error || errorRecords || errorResources,
  ];
};
