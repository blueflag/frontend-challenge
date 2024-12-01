import { createContext, useReducer, useEffect } from 'react';
import { UserLearningActivityContextType, ActionEnum, InitialStateType, ReducerActionType } from './types';
import { INITIAL_STATE } from './constants';
import useFetchAPIs from './hooks/useFetchAPIs';

export const UserLearningActivityContext = createContext<UserLearningActivityContextType>({
    state: INITIAL_STATE,
    dispatch: () => {}
});

type Props = {
    children: React.ReactNode
}

export function UserLearningActivityContextWrapper(props: Props): React.ReactElement {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    const { users, learningResources, learningRecords } = useFetchAPIs();

    useEffect(() => {
        dispatch({ type: ActionEnum.SET_USERS, payload: users })
        dispatch({ type: ActionEnum.SET_LEARNING_RESOURCES, payload: learningResources })
        dispatch({ type: ActionEnum.SET_LEARNING_RECORDS, payload: learningRecords })
    }, [users, learningResources, learningRecords])

    const contextPayload = {
        state,
        dispatch
    }

    return (
        <UserLearningActivityContext.Provider value={contextPayload}>
            { children }
        </UserLearningActivityContext.Provider>
    );
}

function reducer(state: InitialStateType, action: ReducerActionType) {
    switch (action.type) {
      case ActionEnum.SET_USERS: {
        return {
            ...state,
            users: action.payload
        }
      }
      case ActionEnum.SET_LEARNING_RESOURCES: {
        return {
            ...state,
            learningResources: action.payload
        }
      }
      case ActionEnum.SET_LEARNING_RECORDS: {
        return {
            ...state,
            learningRecords: action.payload
        }
      }
      case ActionEnum.SET_FILTERS: {
        return {
            ...state,
            filters: {
                ...state.filters,
                ...action.payload
            }
        }
      }
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
}