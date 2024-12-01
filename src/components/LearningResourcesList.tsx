import React, { useState } from 'react';
import { Col, Input, List, Row, Select } from 'antd';
import LearningResourceCard from './LearningResourceCard';
import _ from 'lodash';

type Props = {
    isLoading: boolean;
    learningResources: LearningResource[];
    users: User[];
    learningRecords: LearningRecord[];
}
type SortKey = 'default' | 'title' | 'participationCount' | 'completionPercentage';
type NormalizedLearningResource = LearningResource &
        { participationCount: number, completionPercentage: number, completers: User[], participants: User[] };

const GRID_LAYOUT = {
    gutter: 16,
    xs: 1,
    sm: 2,
    md: 2,
    lg: 3,
    xl: 3,
    xxl: 4,
};
const SORTING_OPTIONS = [
    { value: 'default', label: 'Default' },
    { value: 'title', label: 'Title' },
    { value: 'participationCount', label: 'Participation' },
    { value: 'completionPercentage', label: 'Completion' },
];
const ORDERING_OPTIONS = [
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' },
];

export default function LearningResourcesList(props: Props): React.ReactElement {
    const { isLoading, learningResources, users, learningRecords } = props;
    const [ searchTerm, setSearchTerm ] = useState<string>('');
    const [ sortKey, setSortKey ] = useState<SortKey>('default');
    const [ ordering, setOrdering ] = useState<'asc' | 'desc'>('asc');

    const normalizedData: NormalizedLearningResource[] = normalizeLearningResources(learningResources, users, learningRecords);
    const filtered = normalizedData.filter((resource) => resource.title.toLowerCase().includes(searchTerm.toLowerCase()));
    const sorted = sortKey === 'default' ? filtered : _.orderBy(filtered, sortKey, ordering);

    const renderListItem = (resource: NormalizedLearningResource) => {
        return (
            <List.Item>
                <LearningResourceCard
                    key={resource.id}
                    resource={resource}
                    totalUsers={users.length}
                    participants={resource.participants}
                    completers={resource.completers}
                    completionPercentage={resource.completionPercentage}
                />
            </List.Item>
        )
    };

    return (
        <div data-testid='learning-resources-list-component'>
            <Row data-testid='learning-resources-list-sorting-components' justify='space-between'>
                <Col span={24} md={12}>
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
                </Col>
                <Col span={24} md={12} lg={6} xxl={4} className='mt-4 md:mt-0'>
                    <Input.Search
                        placeholder='Search for Resource Title...'
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
                        renderItem={renderListItem}
                    />
                </Col>
            </Row>
        </div>
    );
}

function normalizeLearningResources(resources: LearningResource[], users: User[], learningRecords: LearningRecord[]): NormalizedLearningResource[] {
    return resources.map((resource) => {
        const records = learningRecords.filter((record) => record.learningResourceId === resource.id);
        const passingRecords = records.filter((record) => record.verb === 'COMPLETE' || record.verb === 'PASS');

        const participants = users.filter((user) => records.some((record) => record.userId === user.id));
        const completers = participants.filter((participant) => passingRecords.some((record) => record.userId === participant.id));

        return {
            ...resource,
            participationCount: participants.length,
            completionPercentage: (completers.length / participants.length) * 100,
            completers,
            participants,
        }
    })
}
