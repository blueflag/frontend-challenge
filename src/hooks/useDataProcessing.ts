import type { User, LearningResource, LearningRecord } from "@/types";

export const useDataProcessing = (
  usersData: User[],
  learningResourcesData: LearningResource[],
  learningRecordsData: LearningRecord[]
) => {
  const getCompletionRate = () => {
    const totalPossibleCompletions =
      usersData.length * learningResourcesData.length;
    const completions = learningRecordsData.filter(
      (record) => record.learning_record_verb === "COMPLETE"
    ).length;
    return Math.round((completions / totalPossibleCompletions) * 100);
  };

  const getMostActiveUsers = () => {
    return usersData
      .map((user) => {
        const completions = learningRecordsData.filter(
          (record) =>
            record.user_id === user.id &&
            record.learning_record_verb === "COMPLETE"
        ).length;
        return {
          ...user,
          completions,
          completionRate: Math.round(
            (completions / learningResourcesData.length) * 100
          ),
        };
      })
      .sort((a, b) => b.completions - a.completions);
  };

  const getResourceStats = () => {
    return learningResourcesData.map((resource) => {
      const records = learningRecordsData.filter(
        (record) => record.learning_resource_id === resource.masterId
      );
      const attempts = records.filter(
        (r) => r.learning_record_verb === "ATTEMPT"
      ).length;
      const completions = records.filter(
        (r) => r.learning_record_verb === "COMPLETE"
      ).length;
      return {
        ...resource,
        attempts,
        completions,
        notStarted: usersData.length - (attempts + completions),
        completionRate: Math.round((completions / usersData.length) * 100),
      };
    });
  };

  return { getCompletionRate, getMostActiveUsers, getResourceStats };
};
