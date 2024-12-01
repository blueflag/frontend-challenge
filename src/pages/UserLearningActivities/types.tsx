import { Dispatch } from 'react';
import { LearningRecordResponse, LearningResourceResponse, UserResponse } from '../../api/types';

export type UserLearningActivityTableDataType = LearningRecordResponse & {
    user: UserResponse | undefined,
    learningResource: LearningResourceResponse | undefined
}

export type InitialStateType = {
    users: UserResponse[]
    learningResources: LearningResourceResponse[]
    learningRecords: LearningRecordResponse[]
    filters: UserLearningActivityTableFilterType
}

export type UserLearningActivityTableFilterType = {
    search: string
    user: string
    userPosition: string
    learningResource: string
    learningRecordVerb: string
}

export enum ActionEnum {
    SET_USERS = "SET_USERS",
    SET_LEARNING_RESOURCES = "SET_LEARNING_RESOURCES",
    SET_LEARNING_RECORDS = "SET_LEARNING_RECORDS",
    SET_FILTERS = "SET_FILTERS",
}

export type UserLearningActivityContextType = {
    state: InitialStateType,
    dispatch: Dispatch<ReducerActionType>
}

export type ReducerActionType = { 
    type: ActionEnum, 
    payload: any 
}

export type SelectOptionsType = { 
    value: string, 
    label: string
}

export enum FilterInputNamesEnum {
    USER = "user",
    USER_POSITION = "userPosition",
    LEARNING_RESOURCE = "learningResource",
    LEARNING_RECORD_VERB = "learningRecordVerb",
}

export enum LearningRecordVerbsEnum {
    ATTEMPT = 'ATTEMPT',
    COMPLETE = 'COMPLETE',
    FAIL = 'FAIL',
    PASS = 'PASS',
    ENROL = 'ENROL',
    ATTEND = 'ATTEND'
}