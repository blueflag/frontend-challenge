import React from 'react';
import { Card, Progress, ProgressProps, Tag, Tooltip } from 'antd';

type Props = {
    resource: LearningResource;
    participants: User[];
    completers: User[];
    completionPercentage: number;
    totalUsers: number;
}

const COMPLETION_GRADIENT: ProgressProps['strokeColor'] = {
    '0%': '#108ee9',
    '100%': '#87d068',
};
const SUCCESS_HEX = '#B7EB8F';

export default function LearningResourceCard(props: Props): React.ReactElement {
    const { resource, participants, completers, totalUsers, completionPercentage } = props;

    const formatPercentage = (percent: number | undefined): string => (percent || 0).toFixed(1) + '%';

    return (
        <Card
            data-testid='learning-resource-card-component'
            size='small'
            title={resource.title}
            extra={<Tag color='blue'>{resource.code}</Tag>}
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
            <Tooltip title={`${completers.length} out of ${participants.length} Participants`}>
                <Progress
                    percent={completionPercentage}
                    format={formatPercentage}
                    strokeColor={SUCCESS_HEX}
                    status='active'
                />
            </Tooltip>
        </Card>
    );
}
