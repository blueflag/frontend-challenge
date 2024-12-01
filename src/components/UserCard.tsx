import React from 'react';
import { Card, Col, ProgressProps, Row, Statistic, Tag } from 'antd';
import { CheckCircleOutlined, LikeOutlined } from '@ant-design/icons';

type Props = {
    user: User;
    participations: LearningResource[];
    learningRecords: LearningRecord[];
    completed: LearningResource[];
}

export default function UserCard(props: Props): React.ReactElement {
    const { user, participations, learningRecords, completed } = props;

    return (
        <Card
            data-testid='user-card-component'
            size='small'
            title={`${user.givenName} ${user.familyName}`}
            extra={<Tag color='purple'>{user.jobPositions}</Tag>}
            hoverable
        >
            <Row gutter={16}>
                <Col span={12}>
                    <Statistic
                        title="Completed"
                        value={completed.length}
                        prefix={<CheckCircleOutlined style={{ color: 'green' }} />}
                    />
                </Col>
                <Col span={12}>
                    <Statistic
                        title="Participated"
                        value={participations.length}
                        prefix={<LikeOutlined style={{ color: 'green' }} />}
                    />
                </Col>
            </Row>
        </Card>
    );
}
