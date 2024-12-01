import React from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TextInput from '../../../common/TextInput';
import moment from 'moment';
import { UserLearningActivityContext } from '../context';
import { ActionEnum } from '../types';
import { TABLE_HEADERS } from '../constants';
import { getTableData } from '../helpers';
import { debounce } from 'lodash';
import LearningRecordActionBadge from './LearningRecordActionBadge';

export default function DataTable(): React.ReactElement {
    const { state, dispatch } = React.useContext(UserLearningActivityContext);

    const handleDispatchFilter = (value: string) => {
        dispatch({ type: ActionEnum.SET_FILTERS, payload: { search: value } })
    }

    const debounceFn = debounce(handleDispatchFilter, 500)

    const handleSearch = (e: { target: { value: string } }) => {
        debounceFn(e.target.value)
    }

    const tableDataWithFilters = React.useMemo(() => {
        return getTableData(
            state.users, 
            state.learningResources, 
            state.learningRecords, 
            state.filters
        )
    }, [state]);

    const tableDataCount = React.useMemo(() => {
        return `Count : ${ tableDataWithFilters.length }`;
    }, [tableDataWithFilters]);

    return (
        <Card>
            <Card.Header>
                <Container className='p-0'>
                    <Row>
                        <Col xs={3}>
                           <TextInput handleChange={handleSearch}/>
                        </Col>
                        <Col xs={7} className='p-1'></Col>
                        <Col xs={2} className='p-1'>{ tableDataCount }</Col>
                    </Row>
                </Container>
            </Card.Header>
            <Card.Body>
                <Table striped hover>
                    <thead>
                        <tr>
                            { TABLE_HEADERS.map(data=>(<th key={data}>{data}</th>)) }
                        </tr>
                    </thead>
                    <tbody>
                        { tableDataWithFilters && tableDataWithFilters.map(data => (
                            <tr key={data.learning_record_timestamp}>
                                <td>{ data.user?.givenName }</td>
                                <td>{ data.user?.jobPositions }</td>
                                <td>{ data.learningResource?.title }</td>
                                <td><LearningRecordActionBadge verb={data.learning_record_verb} /></td>
                                <td>{ moment.utc(data.learning_record_timestamp).format("LLL") }</td>
                            </tr>
                        ))}
                        { !tableDataWithFilters.length && (
                            <tr>
                                <td colSpan={5} className="justify-content-md-center">
                                    <Container className='p-0'>
                                        <Row className="justify-content-md-center">
                                            No Records Found!
                                        </Row>
                                    </Container>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
}