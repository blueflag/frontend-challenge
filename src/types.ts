export interface User {
    id: string,
    givenName: string,
    familyName: string,
    jobPositions: string,
}

export interface Record {
    learning_record_verb: string,
    user_id: string,
    learning_resource_id: string,
    learning_record_timestamp: string
}

export interface Resource {
    masterId: string,
    code: string,
    title: string
}