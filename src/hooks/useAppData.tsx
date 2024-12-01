import React, { useEffect, useState } from "react";
import axios from 'axios'; // Axios uses XHR under the hood

type User = {
	id: string;
	givenName: string;
	familyName: string;
	jobPositions: string;
};
type LearningResource = {
	id: string;
	code: string;
	title: string;
};
type LearningRecord = {
	verb: 'ATTEMPT' | 'COMPLETE' | 'FAIL' | 'PASS' | 'ENROL' | 'ATTEND';
	userId: string;
	learningResourceId: string;
	timestamp: string;
};

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
    getUserRecords: (userId: string) => LearningRecord[];
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
                    data: response.data
                })
            );

        axios.get('/learning-records.json')
            .then((response) =>
                setLearningRecordState({
                    isLoading: false,
                    data: response.data
                })
            );
    }, [])

    const getUserRecords = (userId: string) => {
        return learningRecordState.data.filter((record) => record.userId === userId);
    }

    const isLoading = userState.isLoading || learningResourceState.isLoading || learningRecordState.isLoading;

    return {
        isLoading,
        users: userState.data,
        learningResources: learningResourceState.data,
        learningRecords: learningRecordState.data,
        getUserRecords,
    }
}
