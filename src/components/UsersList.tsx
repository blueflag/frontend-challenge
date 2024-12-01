import React from 'react';
import { Card, List } from 'antd';

type Props = {
    isLoading: boolean;
    data: User[];
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

export default function UsersList(props: Props): React.ReactElement {
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
            renderItem={(user: User) => (
                <List.Item>
                    <Card size='small' title={`${user.givenName} ${user.familyName}`}>
                        User Activity
                    </Card>
                </List.Item>
            )}
        />
    );
}
