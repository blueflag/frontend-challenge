import { baseUrl } from "../constants";
import { LearningRecord, LearningResource, User } from "../types";

async function fetchUsers(): Promise<User[]> {
  try {
    const response = await fetch(`${baseUrl}users.json`);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch users (${response.status} ${response.statusText})`
      );
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(`Failed to fetch users (${error.message})`);
  }
}

async function fetchLearningRecords(): Promise<LearningRecord[]> {
  try {
    const response = await fetch(`${baseUrl}learning-records.json`);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch learning records (${response.status} ${response.statusText})`
      );
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(`Failed to fetch learning records (${error.message})`);
  }
}

async function fetchLearningResources(): Promise<LearningResource[]> {
  try {
    const response = await fetch(`${baseUrl}learning-resources.json`);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch learning resources (${response.status} ${response.statusText})`
      );
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(`Failed to fetch learning resources (${error.message})`);
  }
}

export { fetchUsers, fetchLearningRecords, fetchLearningResources };
