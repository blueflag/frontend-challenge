import React, { useState } from 'react';
import { Col, Row, Segmented } from 'antd';
import { BookOutlined, UserOutlined } from '@ant-design/icons';
import { SegmentedOptions } from 'antd/es/segmented';
import useAppData from '../hooks/useAppData';
import UsersList from './UsersList';
import LearningResourcesList from './LearningResourcesList';

type Category = 'user' | 'resource';

const CATEGORY_OPTIONS: SegmentedOptions = [
    { label: 'Learning Resources', value: 'resource', icon: <BookOutlined /> },
    { label: 'Users', value: 'user', icon: <UserOutlined /> },
];

export default function Dashboard(): React.ReactElement {
    const [ category, setCategory ] = useState<Category>('resource');
    const { isLoading, users, learningResources, learningRecords } = useAppData();

    return (
        <div data-testid='dashboard-component'>
            <Row>
                <Col>
                    <Segmented
                        data-testid='category-options-component'
                        options={CATEGORY_OPTIONS}
                        defaultValue='resource'
                        onChange={(value) => setCategory(value as Category)}
                    />
                </Col>
            </Row>
            <Row className='mt-4'>
                <Col span={24}>
                    {category === 'user'
                        ? <UsersList
                            isLoading={isLoading}
                            users={users}
                            learningResources={learningResources}
                            learningRecords={learningRecords}
                          />
                        : <LearningResourcesList
                            isLoading={isLoading}
                            learningResources={learningResources}
                            users={users}
                            learningRecords={learningRecords}
                          />
                    }
                </Col>
            </Row>
        </div>
    );
}
