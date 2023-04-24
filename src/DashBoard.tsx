import * as React from 'react';
import Widget from './Widget'
import Table from './Table'
import { FaUserAlt, FaListUl, FaPenAlt } from 'react-icons/fa';

let columns: Array<string> = [];
let usersData: Array<{[key: string]: any;}> = [];
let learningResourcesData: Array<{[key: string]: any;}> = [];
let learningRecordsData: Array<{[key: string]: any;}> = [];
let rows: Array<{[key: string]: any;}> = [];

export default function DashBoard(): React.ReactElement {
    const [title, setTitle] = React.useState('');

    const getUsers = () => {
        columns = [
            'firstName',
            'lastName',
            'position',
            'completed'
        ];
        rows = usersData;
        setTitle('Users');
    }

    const getLearningResources = () => {
        columns = [
            'code',
            'title',
            'interactions',
            'completed',
        ];

        rows = learningResourcesData;

        setTitle('Learning Resources');
    }

    const getLearningRecords = (): void => {
        columns = [
            'userName',
            'learningResource',
            'learningRecordVerb',
            'learningRecordTimestamp',
        ];

        rows = learningRecordsData;

        setTitle('Learning Records');
    }

    const findObjectByKey = (array: any, key: string, value: string): number => {
        for (let i = 0; i < array.length; i++) {
            if (array[i][key] === value) {
                return i;
            }
        }

        return -1;
    }

    async function fetch(url: string) {
        const xhr = new XMLHttpRequest();

        return new Promise<string>((resolve, reject) => {
            xhr.open('GET', url); 
            xhr.onreadystatechange = function () { 
                if (xhr.readyState === 4) { 
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    } else { 
                        reject('Error: ' + xhr.status); 
                    } 
                } 
            }; 
            xhr.send(null);
        })
    }

    const initializeData = async () => {
        const users: any = await fetch('/users.json');
        const learningResources: any = await fetch('/learning-resources.json');
        const learningRecords: any = await fetch('/learning-records.json');

        usersData = users.map((user: any) => {
            const completed: any = learningRecords.filter((learningRecord: any) => {
                return learningRecord.learning_record_verb === 'COMPLETE' && learningRecord.user_id === user.id;
            });

            return {
                id: user.id,
                firstName: user.givenName,
                lastName: user.familyName,
                position: user.jobPositions,
                completed: completed.length
            };
        });

        learningResourcesData = learningResources.map((learningResource: any) => {
            const interactions: any = learningRecords.filter((learningRecord: any) => {
                return learningResource.masterId === learningRecord.learning_resource_id;
            });

            const completed: any = interactions.filter((learningRecord: any) => {
                return learningRecord.learning_record_verb === 'COMPLETE';
            });

            return {
                id: learningResource.masterId,
                code: learningResource.code,
                title: learningResource.title,
                interactions: interactions.length,
                completed: completed.length,
            };
        });

        learningRecordsData = learningRecords.map((learningRecord: any) => {
            const userIndex: number = findObjectByKey(users, 'id', learningRecord.user_id);
            const learningResourceIndex: number = findObjectByKey(learningResourcesData, 'id', learningRecord.learning_resource_id);

            return {
                userName: users[userIndex].givenName + ' ' + users[userIndex].familyName,
                learningResource: learningResourcesData[learningResourceIndex].title,
                learningRecordVerb: learningRecord.learning_record_verb,
                learningRecordTimestamp: learningRecord.learning_record_verb,
            };
        });

        getUsers();
    }

    React.useEffect(() => {
        initializeData();
    }, ['']);

    return <div>
        <div className="row">
            <div className="col-4 container">
                <Widget
                    event={getUsers}
                    label={'USERS'}
                    icon={<FaUserAlt />}
                />
            </div>
            <div className="col-4 container">
                <Widget
                    event={getLearningResources}
                    label={'LEARNING RESOURCES'}
                    icon={<FaListUl />}
                />
            </div>
            <div className="col-4 container">
                <Widget
                    event={getLearningRecords}
                    label={'LEARNING RECORD'}
                    icon={<FaPenAlt />}
                />
            </div>
        </div>
        <Table 
            columns={columns}
            rows={rows}
            title={title}
        />
    </div>;
}