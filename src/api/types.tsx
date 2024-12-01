export type UserResponse = {
    id: string
    givenName: string
    familyName: string
    jobPositions: string
}

export type LearningResourceResponse = {
    masterId: string
    code: string
    title: string
}

export type LearningRecordResponse = {
    learning_record_verb: string
    user_id: string
    learning_resource_id: string
    learning_record_timestamp: string
}