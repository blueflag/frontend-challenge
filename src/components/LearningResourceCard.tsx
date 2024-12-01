import React from 'react';
import { Card, Progress, ProgressProps, Tag, Tooltip } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

type Props = {
    resource: LearningResource;
    participants: User[];
    learningRecords: LearningRecord[];
    totalUsers: number;
}

const COMPLETION_GRADIENT: ProgressProps['strokeColor'] = {
    '0%': '#108ee9',
    '100%': '#87d068',
};
const SUCCESS_HEX = '#B7EB8F';

export default function LearningResourceCard(props: Props): React.ReactElement {
    const { resource, participants, totalUsers, learningRecords } = props;
    const successfulRecords = learningRecords.filter((record) => record.verb === 'COMPLETE' || record.verb === 'PASS');

    const formatPercentage = (percent: number | undefined): string => (percent || 0).toFixed(1) + '%';

    return (
        <Card
            size='small'
            title={resource.title}
            extra={<Tag color='blue'>{resource.code}</Tag>}
            hoverable
        >
            <p>Participation</p>
            <Tooltip title={`${participants.length} out of ${totalUsers} Users`}>
                <Progress
                    percent={(participants.length / totalUsers) * 100}
                    format={formatPercentage}
                    strokeColor={COMPLETION_GRADIENT}
                    status='active'
                />
            </Tooltip>
            <p>Completion</p>
            <Tooltip title={`${successfulRecords.length} out of ${participants.length} Participants`}>
                <Progress
                    percent={(successfulRecords.length / participants.length) * 100}
                    format={formatPercentage}
                    strokeColor={SUCCESS_HEX}
                    status='active'
                />
            </Tooltip>
        </Card>
    );
}
