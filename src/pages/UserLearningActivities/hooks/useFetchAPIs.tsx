import React from "react";
import { LearningRecordResponse, LearningResourceResponse, UserResponse } from "../../../api/types";
import { fetchUsers, fetchLearningResources, fetchLearningRecords} from "../../../api/services";

type ResponseData = {
    users: UserResponse[]
    learningResources: LearningResourceResponse[]
    learningRecords: LearningRecordResponse[]
}

export default function useFetchAPIs(): ResponseData {
    const [users, setUsers] = React.useState<UserResponse[]>([])
    const [learningResources, setLearningResources] = React.useState<LearningResourceResponse[]>([])
    const [learningRecords, setLearningRecords] = React.useState<LearningRecordResponse[]>([])

    React.useEffect(() => {
        fetchUsers().then(res => setUsers(res));
        fetchLearningResources().then(res => setLearningResources(res));
        fetchLearningRecords().then(res => setLearningRecords(res));
    }, [])
    
    return {
        users,
        learningResources,
        learningRecords
    }
}