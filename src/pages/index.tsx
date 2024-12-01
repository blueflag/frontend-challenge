import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import UserLearningActivities from './UserLearningActivities';

export default function NavBar(): React.ReactElement {
    return (
        <Container className='p-0'>
            <Row>
                <Nav variant="underline">
                    <Nav.Item>
                        <Nav.Link active>User Learning Activities</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Row>
            <Row>
                <UserLearningActivities/>
            </Row>
        </Container>
    );
}