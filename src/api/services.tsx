import { LearningRecordResponse, LearningResourceResponse, UserResponse } from "./types";

export const fetchUsers = async (): Promise<UserResponse[]> => {
    const userResponse = await fetch("http://localhost:3000/users.json", {});
    return userResponse.json();
}

export const fetchLearningResources = async (): Promise<LearningResourceResponse[]> => {
    const learningResourceResponse = await fetch("http://localhost:3000/learning-resources.json", {});
    return learningResourceResponse.json();
}

export const fetchLearningRecords = async (): Promise<LearningRecordResponse[]> => {
    const learningRecordResponse = await fetch("http://localhost:3000/learning-records.json", {});
    return learningRecordResponse.json();
}