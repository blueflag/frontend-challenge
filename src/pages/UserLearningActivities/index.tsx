import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DataFilters from './components/Filters';
import DataTable from './components/Table';
import { UserLearningActivityContextWrapper } from './context';

export default function UserLearningActivities(): React.ReactElement {
    return (
        <UserLearningActivityContextWrapper>
            <Container className='p-0'>
                <Row className='p-3'>
                    <Col xs={3}>
                        <DataFilters/>
                    </Col>
                    <Col xs={9}>
                        <DataTable/>
                    </Col>
                </Row>
            </Container>
        </UserLearningActivityContextWrapper>
    );
}