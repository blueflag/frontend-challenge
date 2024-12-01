import React from 'react';
import { List } from 'antd';
import LearningResourceCard from './LearningResourceCard';

type Props = {
    isLoading: boolean;
    data: LearningResource[];
    users: User[];
    learningRecords: LearningRecord[];
}

const GRID_LAYOUT = {
    gutter: 16,
    xs: 1,
    sm: 2,
    md: 2,
    lg: 3,
    xl: 3,
    xxl: 4,
};

export default function LearningResourcesList(props: Props): React.ReactElement {
    const { isLoading, data, users, learningRecords } = props;

    const renderListItem = (recource: LearningResource) => {
        const participants = users.filter((user) => learningRecords.some((record) => record.userId === user.id && record.learningResourceId === recource.id));
        const records = learningRecords.filter((record) => record.learningResourceId === recource.id);

        return (
            <List.Item>
                <LearningResourceCard
                    key={recource.id}
                    resource={recource}
                    totalUsers={users.length}
                    participants={participants}
                    learningRecords={records}
                />
            </List.Item>
        )
    };

    return (
        <List
            grid={GRID_LAYOUT}
            loading={isLoading}
            pagination={{
                position: 'bottom',
                align: 'center',
                pageSize: 12,
            }}
            dataSource={data}
            renderItem={renderListItem}
        />
    );
}
