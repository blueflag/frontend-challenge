import React from 'react';
import { Card, List } from 'antd';

type Props = {
    isLoading: boolean;
    data: LearningResource[];
}

export default function LearningResourcesList(props: Props): React.ReactElement {
    const { isLoading, data } = props;

    return (
        <List
            grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 3,
                lg: 4,
                xl: 4,
                xxl: 4,
            }}
            loading={isLoading}
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
