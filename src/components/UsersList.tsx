import React, { useState } from 'react';
import { Col, Input, List, Row, Select } from 'antd';
import UserCard from './UserCard';
import _ from 'lodash';

type Props = {
    isLoading: boolean;
    users: User[];
    learningResources: LearningResource[];
    learningRecords: LearningRecord[];
}
type NormalizedUser = User & {
        fullName: string,
        participations: LearningResource[],
        completed: LearningResource[],
        learningRecords: LearningRecord[],
        completionCount: number,
        participationCount: number
    };
type SortKey = 'default' | 'title' | 'participationCount' | 'completionCount';

const GRID_LAYOUT = {
    gutter: 16,
    xs: 1,
    sm: 1,
    md: 1,
    lg: 2,
    xl: 3,
    xxl: 4,
};
const SORTING_OPTIONS = [
    { value: 'default', label: 'Default' },
    { value: 'fullName', label: 'Name' },
    { value: 'completionCount', label: 'Completion' },
    { value: 'participationCount', label: 'Participation' },
];
const ORDERING_OPTIONS = [
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' },
];

export default function UsersList(props: Props): React.ReactElement {
    const { isLoading, users, learningRecords, learningResources } = props;
    const [ searchTerm, setSearchTerm ] = useState<string>('');
    const [ sortKey, setSortKey ] = useState<SortKey>('default');
    const [ ordering, setOrdering ] = useState<'asc' | 'desc'>('asc');
    const [ resourceTitlesFilter, setResourceTitlesFilter ] = useState<string[]>([]);

    const normalizedUsers: NormalizedUser[] = normalizeUsers(users, learningResources, learningRecords);
    const filtered = normalizedUsers.filter((user) => user.fullName.toLowerCase().includes(searchTerm.toLowerCase()))
                        .filter((user) => resourceTitlesFilter.every((title) => user.participations.some((resource) => resource.title === title)));
    const sorted = sortKey === 'default' ? filtered : _.orderBy(filtered, sortKey, ordering);

    const learningResourceOptions = learningResources.map((resource) => ({ value: resource.title, label: resource.title }));

    return (
        <>
            <Row justify='space-between'>
                <Col span={24} lg={18}>
                    <span className='mr-2'>Sort by</span>
                    <Select
                        className='mr-2'
                        style={{ width: 130 }}
                        defaultValue='default'
                        onChange={(value) => setSortKey(value as SortKey)}
                        options={SORTING_OPTIONS}
                    />
                    <Select
                        defaultValue='asc'
                        disabled={sortKey === 'default'}
                        onChange={(value) => setOrdering(value as 'asc' | 'desc')}
                        options={ORDERING_OPTIONS}
                    />
                    <Select
                        className='ml-5'
                        style={{ width: 310 }}
                        mode='multiple'
                        placeholder='Filter by Participated Learning Resource'
                        onChange={(value) => setResourceTitlesFilter(value)}
                        options={learningResourceOptions}
                        maxTagCount='responsive'
                        allowClear
                    />
                </Col>
                <Col span={24} lg={6} xxl={4} className='mt-4 lg:mt-0'>
                    <Input.Search
                        placeholder='Search for User...'
                        onSearch={(value) => setSearchTerm(value)}
                        onClear={() => setSearchTerm('')}
                        loading={isLoading}
                        allowClear
                    />
                </Col>
            </Row>
            <Row className='mt-4'>
                <Col span={24}>
                    <List
                        grid={GRID_LAYOUT}
                        loading={isLoading}
                        pagination={{
                            position: 'bottom',
                            align: 'center',
                            pageSize: 12,
                        }}
                        dataSource={sorted}
                        renderItem={(user) => (
                            <List.Item>
                                <UserCard
                                    user={user}
                                    participations={user.participations}
                                    learningRecords={user.learningRecords}
                                    completed={user.completed}
                                />
                            </List.Item>
                        )}
                    />
                </Col>
            </Row>
        </>
    );
}

function normalizeUsers(users: User[], learningResources: LearningResource[], learningRecords: LearningRecord[]): NormalizedUser[] {
    return users.map((user) => {
        const records = learningRecords.filter((record) => record.userId === user.id);
        const participations = learningResources.filter((resource) => records.some((record) => record.learningResourceId === resource.id));
        const completed = participations.filter((resource) =>
            records.some((record) => record.learningResourceId === resource.id && (record.verb === 'COMPLETE' || record.verb === 'PASS'))
        );

        return{
            ...user,
            fullName: `${user.givenName} ${user.familyName}`,
            learningRecords: records,
            participations,
            completed,
            participationCount: participations.length,
            completionCount: completed.length,
        }
    });
}
