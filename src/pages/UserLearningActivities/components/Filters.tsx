import React from 'react';
import Card from 'react-bootstrap/Card';
import SelectInput from '../../../common/SelectInput';
import { UserLearningActivityContext } from '../context';
import { LEARNING_RECORD_VERB_OPTIONS } from '../constants';
import { ActionEnum, SelectOptionsType, FilterInputNamesEnum } from '../types';
import { getLearningResourcesOptions, getUserOptions, getUserPositionOptions } from '../helpers';

export default function DataFilters(): React.ReactElement {
    const { state, dispatch } = React.useContext(UserLearningActivityContext);

    const handleSetFilter = (filterName: string, value: string) => {
        dispatch({  type: ActionEnum.SET_FILTERS,  payload: { [filterName]: value } })
    }

    const userOptions: SelectOptionsType[] = React.useMemo(() => {
        return getUserOptions(state.users);
    }, [state.users])

    const learningResourcesOptions: SelectOptionsType[] = React.useMemo(() => {
        return getLearningResourcesOptions(state.learningResources);
    }, [state.learningResources])

    const userPositionOptions: SelectOptionsType[] = React.useMemo(() => {
        return getUserPositionOptions(state.users);
    }, [state.users])

    return (
        <Card>
            <Card.Header as="h5">Filters</Card.Header>
            <Card.Body>
                <SelectInput 
                    label="Users" 
                    handleChange={handleSetFilter} 
                    name={FilterInputNamesEnum.USER}
                    options={userOptions}
                    customClass='mb-3'
                />
                <SelectInput 
                    label="User Position" 
                    handleChange={handleSetFilter} 
                    name={FilterInputNamesEnum.USER_POSITION}
                    options={userPositionOptions}
                    customClass='mb-3'
                />
                <SelectInput 
                    label="Learning Resources" 
                    handleChange={handleSetFilter} 
                    name={FilterInputNamesEnum.LEARNING_RESOURCE}
                    options={learningResourcesOptions}
                    customClass='mb-3'
                />
                <SelectInput 
                    label="Learning Record Action" 
                    handleChange={handleSetFilter} 
                    name={FilterInputNamesEnum.LEARNING_RECORD_VERB}
                    options={LEARNING_RECORD_VERB_OPTIONS}
                    customClass='mb-3'
                />
            </Card.Body>
        </Card>
    );
}