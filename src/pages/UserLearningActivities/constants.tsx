import { InitialStateType, LearningRecordVerbsEnum, SelectOptionsType } from "./types";

export const INITIAL_STATE: InitialStateType = {
    users: [],
    learningResources: [],
    learningRecords: [],
    filters: {
        search: "",
        user: "",
        userPosition: "",
        learningResource: "",
        learningRecordVerb: "",
    }
};

export const LEARNING_RECORD_VERB_OPTIONS: SelectOptionsType[] = [
    { value: LearningRecordVerbsEnum.ATTEMPT, label: 'Attempt' },
    { value: LearningRecordVerbsEnum.COMPLETE, label: 'Complete' },
    { value: LearningRecordVerbsEnum.FAIL, label: 'Fail' },
    { value: LearningRecordVerbsEnum.PASS, label: 'Pass' },
    { value: LearningRecordVerbsEnum.ENROL, label: 'Enroll' },
    { value: LearningRecordVerbsEnum.ATTEND, label: 'Attend' },
]

export const learningRecordVerbLabelMap:{[key: string]: string} = {
    [LearningRecordVerbsEnum.ATTEMPT]: "Attempt",
    [LearningRecordVerbsEnum.COMPLETE]: "Complete",
    [LearningRecordVerbsEnum.FAIL]: "Fail",
    [LearningRecordVerbsEnum.PASS]: "Pass",
    [LearningRecordVerbsEnum.ENROL]: "Enroll",
    [LearningRecordVerbsEnum.ATTEND]: "Attend", 
}

export const learningRecordVerbBadgeColorMap:{[key: string]: string} = {
    [LearningRecordVerbsEnum.ATTEMPT]: "warning",
    [LearningRecordVerbsEnum.COMPLETE]: "success",
    [LearningRecordVerbsEnum.FAIL]: "danger",
    [LearningRecordVerbsEnum.PASS]: "primary",
    [LearningRecordVerbsEnum.ENROL]: "light",
    [LearningRecordVerbsEnum.ATTEND]: "info", 
}

export const TABLE_HEADERS: string[] = [ 
    "User",  
    "Position",  
    "Learning Resource",  
    "Action",  
    "Timestamp"
]