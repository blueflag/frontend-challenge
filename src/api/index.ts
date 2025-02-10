import { API_URL } from "@/constants";

export const fetchUsers = async () => {
  const response = await fetch(`${API_URL}/users.json`);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  const data = await response.json();
  return data;
};

export const fetchLearningResources = async () => {
  const response = await fetch(`${API_URL}/learning-resources.json`);
  if (!response.ok) {
    throw new Error("Failed to fetch learning resources");
  }
  const data = await response.json();
  return data;
};

export const fetchLearningRecords = async () => {
  const response = await fetch(`${API_URL}/learning-records.json`);
  if (!response.ok) {
    throw new Error("Failed to fetch learning records");
  }
  const data = await response.json();
  return data;
};
