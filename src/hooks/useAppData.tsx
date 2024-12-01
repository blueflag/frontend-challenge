import React, { useEffect, useState } from "react";
import axios from 'axios'; // Axios uses XHR under the hood

type LearningResourceAPIResponseData = {
    masterId: string;
    code: string;
    title: string;
}[]

type LearningRecordAPIResponseData = {
    learning_record_verb: LearningRecordVerb;
    user_id: string;
    learning_resource_id: string;
    learning_record_timestamp: string;
}[]

type UserState = {
    isLoading: boolean;
    data: User[];
}
type LearningResourceState = {
    isLoading: boolean;
    data: LearningResource[];
}
type LearningRecordState = {
    isLoading: boolean;
    data: LearningRecord[];
}

type AppData = {
    isLoading: boolean;
    users: User[];
    learningResources: LearningResource[];
    learningRecords: LearningRecord[];
}

export default function useAppData(): AppData {
    const [ userState, setUserState ] = useState<UserState>({ isLoading: true, data: [] })
    const [ learningResourceState, setLearningResourceState ] = useState<LearningResourceState>({ isLoading: true, data: [] })
    const [ learningRecordState, setLearningRecordState ] = useState<LearningRecordState>({ isLoading: true, data: [] })

    useEffect(() => {
        axios.get('/users.json')
            .then((response) =>
                setUserState({
                    isLoading: false,
                    data: response.data
                })
            );

        axios.get('/learning-resources.json')
            .then((response) =>
                setLearningResourceState({
                    isLoading: false,
                    data: normalizeLearningResourceData(response.data)
                })
            );

        axios.get('/learning-records.json')
            .then((response) =>
                setLearningRecordState({
                    isLoading: false,
                    data: normalizeLearningRecordData(response.data)
                })
            );
    }, [])

    const isLoading = userState.isLoading || learningResourceState.isLoading || learningRecordState.isLoading;

    return {
        isLoading,
        users: userState.data,
        learningResources: learningResourceState.data,
        learningRecords: learningRecordState.data,
    }
}

function normalizeLearningResourceData(data: LearningResourceAPIResponseData) {
    return data.map((resource) => ({
        id: resource.masterId,
        code: resource.code,
        title: resource.title,
    }));
}

function normalizeLearningRecordData(data: LearningRecordAPIResponseData) {
    return data.map((record) => ({
        verb: record.learning_record_verb,
        userId: record.user_id,
        learningResourceId: record.learning_resource_id,
        timestamp: record.learning_record_timestamp,
    }));
}
