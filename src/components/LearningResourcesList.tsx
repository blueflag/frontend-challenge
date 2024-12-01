import React from 'react';
import { Card, List } from 'antd';

type Props = {
    isLoading: boolean;
    data: LearningResource[];
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
    const { isLoading, data } = props;

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
            renderItem={(recource: LearningResource) => (
                <List.Item>
                    <Card size='small' title={recource.title}>
                        Resource Details
                    </Card>
                </List.Item>
            )}
        />
    );
}
