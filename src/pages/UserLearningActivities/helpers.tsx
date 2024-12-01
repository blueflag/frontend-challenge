import { UserResponse, LearningResourceResponse, LearningRecordResponse } from "../../api/types"
import { SelectOptionsType, UserLearningActivityTableDataType, UserLearningActivityTableFilterType } from "./types"

export const getUserOptions = (userResponse: UserResponse[]): SelectOptionsType[] =>  {
    return [...userResponse].map(data => ({ 
        value: data.id, 
        label: data.givenName 
    }))
}

export const getLearningResourcesOptions = (learningResourcesResponse: LearningResourceResponse[]): SelectOptionsType[] =>  {
    return [...learningResourcesResponse].map(data => ({ 
        value: data.masterId, 
        label: data.title
    }))
}

export const getUserPositionOptions = (userResponse: UserResponse[]): SelectOptionsType[] =>  {
    return [...userResponse].reduce(
        (acc: SelectOptionsType[], data: UserResponse) => {
            const isPositionExist = acc.some(pos => pos.value === data.jobPositions);
            if(!isPositionExist){
                acc.push({
                    value: data.jobPositions,
                    label: data.jobPositions
                })
            }
            return acc;
        }, []
    )
}

export const getTableData = (
    users: UserResponse[], 
    learningResources: LearningResourceResponse[],
    learningRecords: LearningRecordResponse[],
    filters: UserLearningActivityTableFilterType
): UserLearningActivityTableDataType[] =>  {
    let tableDataFiltered = transformResponseToTableData(
        users,
        learningResources,
        learningRecords
    );
    if(filters.search){
        const rgx = new RegExp(filters.search?.toLowerCase(), "g")
        tableDataFiltered = tableDataFiltered.filter(
            data => (
                data.user?.givenName?.toLowerCase()?.match(rgx) || 
                data.user?.jobPositions?.toLowerCase()?.match(rgx) || 
                data.learningResource?.code?.toLowerCase().match(rgx) || 
                data.learningResource?.title?.toLowerCase().match(rgx) || 
                data.learning_record_verb?.toLowerCase().match(rgx)
            )
        );
    }
    if(filters.user){
        tableDataFiltered = tableDataFiltered.filter(
            data => data.user_id === filters.user
        );
    }
    if(filters.userPosition){
        tableDataFiltered = tableDataFiltered.filter(
            data => data.user?.jobPositions === filters.userPosition
        );
    }
    if(filters.learningResource){
        tableDataFiltered = tableDataFiltered.filter(
            data => data.learning_resource_id === filters.learningResource
        );
    }
    if(filters.learningRecordVerb){
        tableDataFiltered = tableDataFiltered.filter(
            data => data.learning_record_verb === filters.learningRecordVerb
        );
    }
    return tableDataFiltered;
}

const transformResponseToTableData = (
    users: UserResponse[], 
    learningResources: LearningResourceResponse[],
    learningRecords: LearningRecordResponse[]
): UserLearningActivityTableDataType[] =>  {
    return [...learningRecords].reduce(
        (acc: UserLearningActivityTableDataType[], data: LearningRecordResponse) => {
            const user = [...users].find(
                userData => userData.id ===  data.user_id
            );
            const learningResource = [...learningResources].find(
                lrData => lrData.masterId ===  data.learning_resource_id
            );
            acc.push({
                ...data,
                user,
                learningResource
            })
            return acc;
        }, []
    );
}