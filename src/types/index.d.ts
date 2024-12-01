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

type LearningRecordVerb = 'ATTEMPT' | 'COMPLETE' | 'FAIL' | 'PASS' | 'ENROL' | 'ATTEND';

type LearningRecord = {
    verb: LearningRecordVerb;
    userId: string;
    learningResourceId: string;
    timestamp: string;
};
